import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const vite = await createServer({
  appType: "custom",
  ssr: {
    noExternal: ["react-router", "react-router-dom"],
    resolve: { conditions: ["import", "module"] },
  },
  server: { middlewareMode: true },
});

try {
  const [{ default: App }, { StaticRouter }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/scripts/prerender-router.tsx"),
  ]);
  const markup = renderToString(
    React.createElement(
      StaticRouter,
      { location: "/" },
      React.createElement(App),
    ),
  );
  const outputPath = new URL("../dist/index.html", import.meta.url);
  const html = await readFile(outputPath, "utf8");
  const prerendered = html.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`,
  );

  if (prerendered === html || !markup.includes("package-card"))
    throw new Error("Prerender did not produce the package catalog markup.");

  await writeFile(outputPath, prerendered);
  console.log("Prerendered homepage and package catalog for crawlers.");
} finally {
  await vite.close();
}

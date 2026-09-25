import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { TourPackage } from "../src/types";

type UploadedImage = { name: string; type: string; base64: string };
type Changes = {
  path: string;
  content?: string;
  base64?: string;
  delete?: boolean;
}[];
export type ApiRequest = IncomingMessage & {
  body?: { password?: unknown; package?: unknown; image?: UploadedImage };
};
export type ApiResponse = ServerResponse & {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => ApiResponse;
};
class RequestError extends Error {
  status = 400;
}
const repoConfig = () => {
  const {
    GITHUB_OWNER: owner,
    GITHUB_REPO: repo,
    GITHUB_BRANCH: branch,
    GITHUB_TOKEN: token,
  } = process.env;
  if (!owner || !repo || !branch || !token)
    throw new Error("GitHub API configuration is incomplete.");
  return { owner, repo, branch, token };
};
const secret = () => {
  if (!process.env.SESSION_SECRET || !process.env.ADMIN_PASSWORD)
    throw new Error("Authentication is not configured.");
  return process.env.SESSION_SECRET;
};
const json = (res: ApiResponse, status: number, body: unknown) =>
  res.status(status).json(body);
const safeError = (error: unknown) =>
  error instanceof Error ? error.message : "Unexpected API error.";
const apiRequest = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<T> => {
  const config = repoConfig();
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}${path}`,
    {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      `GitHub API (${response.status}): ${(data as { message?: string }).message || "request failed"}`,
    );
  return data as T;
};

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("base64url");
const issueSession = () => {
  const payload = `${Date.now() + 1000 * 60 * 60 * 12}`;
  return `${payload}.${sign(payload)}`;
};
const isAuthenticated = (req: ApiRequest) => {
  try {
    const token = req.headers.cookie
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("trippygo_admin="))
      ?.split("=")[1];
    if (!token) return false;
    const [expires, signature] = token.split(".");
    const expected = Buffer.from(sign(expires));
    const received = Buffer.from(signature || "");
    return (
      Number(expires) > Date.now() &&
      received.length === expected.length &&
      timingSafeEqual(received, expected)
    );
  } catch {
    return false;
  }
};
const setCookie = (res: ApiResponse, value: string, maxAge: number) => {
  res.setHeader(
    "Set-Cookie",
    `trippygo_admin=${value}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${maxAge}`,
  );
};
const validatePackage = (value: unknown): TourPackage => {
  if (!value || typeof value !== "object")
    throw new RequestError("Package data is invalid.");
  const item = value as Partial<TourPackage>;
  const fields = [
    item.id,
    item.title,
    item.destination,
    item.category,
    item.badge,
    item.route,
    item.image,
    item.alt,
    item.description,
  ];
  if (
    fields.some(
      (field) => typeof field !== "string" || field.trim().length === 0,
    )
  )
    throw new RequestError("Complete all required package fields.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id!))
    throw new RequestError(
      "Package ID must use lowercase letters, numbers and hyphens.",
    );
  if (
    item.title!.length > 100 ||
    item.destination!.length > 100 ||
    item.description!.length > 240
  )
    throw new RequestError(
      "One or more text fields exceed the allowed length.",
    );
  if (
    ![item.price, item.days, item.nights].every(Number.isInteger) ||
    item.price! < 0 ||
    item.days! < 1 ||
    item.days! > 60 ||
    item.nights! < 0 ||
    item.nights! > 59
  )
    throw new RequestError("Price and duration values are invalid.");
  if (
    item.displayOrder !== undefined &&
    (!Number.isInteger(item.displayOrder) ||
      item.displayOrder < 1 ||
      item.displayOrder > 9999)
  )
    throw new RequestError("Package listing priority is invalid.");
  if (
    !Array.isArray(item.features) ||
    item.features.some((entry) => typeof entry !== "string")
  )
    throw new RequestError("Package highlights are invalid.");
  if (
    !Array.isArray(item.itinerary) ||
    item.itinerary.some(
      (day) =>
        !day || typeof day.title !== "string" || typeof day.text !== "string",
    )
  )
    throw new RequestError("Package itinerary is invalid.");
  return item as TourPackage;
};
const packagePath = (id: string) => `data/packages/${id}.json`;

const readPackages = async (): Promise<TourPackage[]> => {
  const { branch } = repoConfig();
  const files = await apiRequest<{ name: string; download_url: string }[]>(
    `/contents/data/packages?ref=${encodeURIComponent(branch)}`,
  );
  return Promise.all(
    files
      .filter((file) => file.name.endsWith(".json"))
      .map(async (file) => {
        const response = await fetch(file.download_url);
        if (!response.ok)
          throw new Error("Could not read package data from GitHub.");
        return (await response.json()) as TourPackage;
      }),
  );
};

const commitChanges = async (changes: Changes, message: string) => {
  const { branch } = repoConfig();
  const ref = await apiRequest<{ object: { sha: string } }>(
    `/git/ref/heads/${encodeURIComponent(branch)}`,
  );
  const base = await apiRequest<{ tree: { sha: string } }>(
    `/git/commits/${ref.object.sha}`,
  );
  const tree = await apiRequest<{ sha: string }>("/git/trees", {
    method: "POST",
    body: JSON.stringify({
      base_tree: base.tree.sha,
      tree: await Promise.all(
        changes.map(async (change) => {
          if (change.delete)
            return {
              path: change.path,
              mode: "100644",
              type: "blob",
              sha: null,
            };
          if (change.base64) {
            const blob = await apiRequest<{ sha: string }>("/git/blobs", {
              method: "POST",
              body: JSON.stringify({
                content: change.base64,
                encoding: "base64",
              }),
            });
            return {
              path: change.path,
              mode: "100644",
              type: "blob",
              sha: blob.sha,
            };
          }
          return {
            path: change.path,
            mode: "100644",
            type: "blob",
            content: change.content,
          };
        }),
      ),
    }),
  });
  const commit = await apiRequest<{ sha: string }>("/git/commits", {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [ref.object.sha],
    }),
  });
  await apiRequest(`/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });
  return commit.sha;
};

const getDeploymentStatus = async (sha: string) => {
  if (!/^[a-f0-9]{40}$/i.test(sha))
    throw new RequestError("Deployment commit is invalid.");
  const { branch } = repoConfig();
  const result = await apiRequest<{
    workflow_runs: {
      head_sha: string;
      status: string;
      conclusion: string | null;
      html_url: string;
      created_at: string;
    }[];
  }>(
    `/actions/workflows/deploy.yml/runs?branch=${encodeURIComponent(branch)}&per_page=20`,
  );
  const run = result.workflow_runs.find(
    (candidate) => candidate.head_sha === sha,
  );
  if (!run) return { state: "pending" as const };
  if (run.status !== "completed")
    return {
      state: "running" as const,
      url: run.html_url,
      createdAt: run.created_at,
    };
  return {
    state:
      run.conclusion === "success"
        ? ("success" as const)
        : ("failure" as const),
    url: run.html_url,
    conclusion: run.conclusion,
    createdAt: run.created_at,
  };
};

const validateImage = (image: UploadedImage | undefined) => {
  if (!image) return undefined;
  const supported: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  if (
    !supported[image.type] ||
    !image.base64 ||
    image.base64.length > 4_200_000
  )
    throw new RequestError("Use a JPEG, PNG or WebP image up to 3 MB.");
  const bytes = Buffer.from(image.base64, "base64");
  const valid =
    image.type === "image/jpeg"
      ? bytes[0] === 0xff && bytes[1] === 0xd8
      : image.type === "image/png"
        ? bytes
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : bytes.subarray(0, 4).toString() === "RIFF" &&
          bytes.subarray(8, 12).toString() === "WEBP";
  if (!valid)
    throw new RequestError("The uploaded file does not match its image type.");
  const extension = supported[image.type];
  return {
    path: `public/images/package-${Date.now()}.${extension}`,
    base64: image.base64,
  };
};

const handlePackages = async (
  req: ApiRequest,
  res: ApiResponse,
  id?: string,
) => {
  if (req.method === "GET") {
    if (id) {
      const items = await readPackages();
      const found = items.find((item) => item.id === id);
      return found
        ? json(res, 200, { data: found })
        : json(res, 404, { error: "Package not found." });
    }
    return json(res, 200, { data: await readPackages() });
  }
  if (!isAuthenticated(req))
    return json(res, 401, {
      error: "Your session has expired. Sign in again.",
    });
  const items = await readPackages();
  if (req.method === "POST" && !id) {
    const body = req.body as { package?: unknown; image?: UploadedImage };
    if (!body.image)
      throw new RequestError("A cover image is required for new packages.");
    const item = validatePackage(body.package);
    if (items.some((entry) => entry.id === item.id))
      return json(res, 409, {
        error: "A package with this ID already exists.",
      });
    const changes: Changes = [];
    const uploaded = validateImage(body.image);
    if (uploaded) {
      item.image = `./images/${uploaded.path.split("/").pop()}`;
      changes.push({ path: uploaded.path, base64: uploaded.base64 });
    }
    changes.push({
      path: packagePath(item.id),
      content: JSON.stringify(item, null, 2),
    });
    const commitSha = await commitChanges(
      changes,
      `Add travel package: ${item.title}`,
    );
    return json(res, 201, { data: item, commitSha });
  }
  if (id && req.method === "PUT") {
    const current = items.find((entry) => entry.id === id);
    if (!current) return json(res, 404, { error: "Package not found." });
    const body = req.body as { package?: unknown; image?: UploadedImage };
    const item = validatePackage(body.package);
    if (item.id !== id)
      return json(res, 400, {
        error: "Package IDs cannot be changed while editing.",
      });
    const changes: Changes = [];
    const uploaded = validateImage(body.image);
    if (uploaded) {
      item.image = `./images/${uploaded.path.split("/").pop()}`;
      changes.push({ path: uploaded.path, base64: uploaded.base64 });
      const oldPath = current.image.match(/(?:\.\/)?images\/([^/?#]+)$/)?.[1];
      if (
        oldPath?.startsWith("package-") &&
        !items.some(
          (entry) =>
            entry.id !== id && entry.image.endsWith(`/images/${oldPath}`),
        )
      )
        changes.push({ path: `public/images/${oldPath}`, delete: true });
    }
    changes.push({
      path: packagePath(id),
      content: JSON.stringify(item, null, 2),
    });
    const commitSha = await commitChanges(
      changes,
      `Update travel package: ${item.title}`,
    );
    return json(res, 200, { data: item, commitSha });
  }
  if (id && req.method === "DELETE") {
    const current = items.find((entry) => entry.id === id);
    if (!current) return json(res, 404, { error: "Package not found." });
    const changes: Changes = [{ path: packagePath(id), delete: true }];
    const imageName = current.image.match(/(?:\.\/)?images\/([^/?#]+)$/)?.[1];
    if (
      imageName?.startsWith("package-") &&
      !items.some(
        (entry) =>
          entry.id !== id && entry.image.endsWith(`/images/${imageName}`),
      )
    )
      changes.push({ path: `public/images/${imageName}`, delete: true });
    const commitSha = await commitChanges(
      changes,
      `Delete travel package: ${current.title}`,
    );
    return json(res, 200, { data: null, commitSha });
  }
  res.setHeader("Allow", "GET, POST, PUT, DELETE");
  return json(res, 405, { error: "Method not allowed." });
};

const handler = async (req: ApiRequest, res: ApiResponse) => {
  const origin = req.headers.origin;
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
  if (origin && origin !== allowedOrigin)
    return json(res, 403, { error: "This origin is not allowed." });
  if (
    req.method !== "GET" &&
    req.method !== "OPTIONS" &&
    origin !== allowedOrigin
  )
    return json(res, 403, { error: "A verified browser origin is required." });
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  const pathname = new URL(req.url || "/", "http://localhost").pathname.replace(
    /^\/api/,
    "",
  );
  try {
    if (pathname === "/auth/session" && req.method === "GET")
      return json(res, 200, { data: isAuthenticated(req) });
    if (pathname === "/auth/login" && req.method === "POST") {
      secret();
      if (
        typeof req.body?.password !== "string" ||
        req.body.password !== process.env.ADMIN_PASSWORD
      )
        return json(res, 401, { error: "Incorrect password." });
      setCookie(res, issueSession(), 60 * 60 * 12);
      return json(res, 200, { data: true });
    }
    if (pathname === "/auth/logout" && req.method === "POST") {
      setCookie(res, "", 0);
      return json(res, 200, { data: true });
    }
    if (pathname === "/deploy/status" && req.method === "GET") {
      if (!isAuthenticated(req))
        return json(res, 401, {
          error: "Your session has expired. Sign in again.",
        });
      const sha = new URL(req.url || "/", "http://localhost").searchParams.get(
        "sha",
      );
      if (!sha) throw new RequestError("A commit SHA is required.");
      return json(res, 200, { data: await getDeploymentStatus(sha) });
    }
    if (pathname === "/packages" || pathname.startsWith("/packages/"))
      return await handlePackages(
        req,
        res,
        pathname.startsWith("/packages/")
          ? decodeURIComponent(pathname.slice("/packages/".length))
          : undefined,
      );
    return json(res, 404, { error: "Not found." });
  } catch (error) {
    console.error("Content API request failed:", error);
    return json(res, error instanceof RequestError ? error.status : 500, {
      error: safeError(error),
    });
  }
};

export default handler;

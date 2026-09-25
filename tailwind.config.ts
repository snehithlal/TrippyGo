import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#faf8f1",
        forest: "#243f32",
        gold: "#e6bc72",
        muted: "#6c7566",
        line: "#e0e4d8",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
        handwritten: ["Caveat", "cursive"],
      },
      keyframes: {
        "hero-arrive": {
          from: { opacity: "0", translate: "0 20px" },
          to: { opacity: "1", translate: "0 0" },
        },
        "detail-open": {
          from: { opacity: "0", translate: "0 7px" },
          to: { opacity: "1", translate: "0 0" },
        },
        "package-enter": {
          from: { opacity: ".3", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dialog-enter": {
          from: { opacity: "0", transform: "translateY(15px) scale(.98)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "hero-arrive": "hero-arrive .85s ease-out both",
        "detail-open": "detail-open .3s ease-out",
        "package-enter": "package-enter .5s both",
        "dialog-enter": "dialog-enter .25s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

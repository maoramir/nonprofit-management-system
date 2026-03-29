import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        mist: "#eef3f6",
        sand: "#f7f4ec",
        brand: {
          50: "#eef7f5",
          100: "#d5ebe6",
          500: "#277365",
          600: "#1f5f54",
          700: "#194a42"
        },
        accent: "#b87a39",
        danger: "#a03030"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(16, 32, 51, 0.08)"
      },
      fontFamily: {
        sans: ["Assistant", "Noto Sans Hebrew", "Arial", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(39,115,101,0.10), transparent 35%), linear-gradient(135deg, rgba(255,255,255,0.9), rgba(238,243,246,0.8))"
      }
    }
  },
  plugins: []
};

export default config;

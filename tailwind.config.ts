import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFF6E8",
        ink: "#0A0A0A",
        signal: "#CC0000",
        blaze: "#FF6B00",
        cream: "#FFFDF8",
        mint: "#A5FF8B",
        sky: "#98D8FF"
      },
      boxShadow: {
        brutal: "8px 8px 0px #000000",
        brutalSm: "4px 4px 0px #000000"
      },
      borderRadius: {
        brutal: "1.5rem"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;

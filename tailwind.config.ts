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
        /* Brand tokens — exact match from Stitch HTML design */
        "primary-container": "#cc0000",
        "secondary-container": "#fe6b00",
        "true-black": "#000000",
        "deep-black": "#0A0A0A",
        "paper-white": "#FFFFFF",
        surface: "#f9f9f9",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#dadada",
        "surface-variant": "#e2e2e2",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#5e3f3a",
        "inverse-surface": "#2f3131",
        primary: "#9e0000",
        "primary-fixed-dim": "#ffb4a8",
        secondary: "#a04100",
        "secondary-fixed-dim": "#ffb693",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["120px", { lineHeight: "110px", letterSpacing: "0.02em", fontWeight: "400" }],
        "headline-lg": ["64px", { lineHeight: "64px", letterSpacing: "0.03em", fontWeight: "400" }],
        "headline-lg-mobile": ["48px", { lineHeight: "48px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "32px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-mono": ["14px", { lineHeight: "16px", fontWeight: "700" }],
      },
      spacing: {
        gutter: "24px",
        "section-padding": "80px",
        "container-max": "1440px",
      },
      boxShadow: {
        hard: "6px 6px 0px 0px #000000",
        "hard-sm": "4px 4px 0px 0px #000000",
        "hard-white": "4px 4px 0px 0px #FFFFFF",
        "hard-red": "6px 6px 0px 0px #cc0000",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      maxWidth: {
        "container-max": "1440px",
      }
    }
  },
  plugins: []
};

export default config;

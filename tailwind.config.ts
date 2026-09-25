import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#FFFFFF",
        bgSecondary: "#F5F5F5",
        bgInverted: "#0F1115",
        textPrimary: "#111111",
        textMuted: "#828282",
        accent: "#FF5A1F",
        borderPrimary: "#E5E5E5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
      },
      boxShadow: {
        none: "none",
      },
      padding: {
        bento: "32px",
        "bento-lg": "48px",
        "bento-xl": "64px",
      },
    },
  },
  plugins: [],
};

export default config;
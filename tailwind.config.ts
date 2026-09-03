import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2E9",
        ink: "#171310",
        rust: "#9A4A34",
        rustDark: "#7A3A28",
        brass: "#B99457",
        stone: "#E7DFCF",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-libre-franklin)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;

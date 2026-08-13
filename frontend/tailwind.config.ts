import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // AfriSoro brand palette — warm African earth tones
        brand: {
          orange:  "#E8681A",
          gold:    "#F5A623",
          green:   "#2D7D46",
          brown:   "#6B3A2A",
          cream:   "#FDF5E6",
          dark:    "#1A1A2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

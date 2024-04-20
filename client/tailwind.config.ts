import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      textColor: {
        "brand-black": "#000000",
        "brand-white": "#ededed",
      },
      colors: {
        "brand-black": "#000000",
        "brand-white": "#ffffff",
        "brand-gray": {
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#828282",
        },
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        8: "2rem",
        16: "4rem",
        24: "6rem",
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;

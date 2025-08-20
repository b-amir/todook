import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brpink: {
          50: "#fee5e7",
          200: "#f05069",
          300: "#f14e69",
          500: "#cc122d",
        },
        brgreen: {
          50: "#f3faf7",
          200: "#7ccbb6",
          300: "#52af99",
        },
        brgray: {
          100: "#878789",
          300: "#414142",
          500: "#323232",
        },
      },
    },
  },
  plugins: [],
};

export default config;

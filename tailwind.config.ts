import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    {
      pattern: /rotate-\d+/,
    },
    {
      pattern: /translate-y-\d+/,
    },
    ...[...new Array(360).keys()].map((i) => `rotate-[${i}deg]`),
    ...[...new Array(360).keys()].map((i) => `-rotate-[${i}deg]`),
    ...[...new Array(30).keys()].map((i) => `translate-y-[${i}rem]`),
  ],
  plugins: [],
};
export default config;

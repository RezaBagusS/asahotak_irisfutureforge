import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        nunitoSans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        "custPrimary": "#5A03A0",
        "custSecondary": "#FAD50B",
        "custThird": "#FF0000",
        "custFourth": "#93CC50",
        "custBackground": "#BEBEBE",
      }
    },
  },
  plugins: [],
};
export default config;

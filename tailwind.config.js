/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        primary: {
          200: "#e8e6ff",
          300: "#8a80ff",
          400: "#5b4dff",
          500: "#1400ff",
          600: "#1000cc",
          700: "#0c0099",
          800: "#080066",
          900: "#040033",
          950: "#000000",
        },
        gray: {
          100: "#f1f1f1",
          200: "#f0f0f0",
          300: "#e6e6e6",
          400: "#dcdcdc",
          500: "#cdcdcd",
          600: "#a4a4a4",
          700: "#7b7b7b",
          800: "#525252",
          900: "#292929",
          950: "#141414",
        },
      },
    },
  },
  plugins: [],
};

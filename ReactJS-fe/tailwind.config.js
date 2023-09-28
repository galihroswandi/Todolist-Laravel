/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f3f5d0",
        secondary: "#b5d665",
        accent: "#D3E398",
      },
    },
  },
  plugins: [],
};

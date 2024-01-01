/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#d8d8de",
        forgroundColor: "#e7e8ec",
        accentColor: "#496aff",
        buttonColor: "#49108b",
        textColor: "#fffbf5",
        header_background: "#496aff",
      },
      height: {
        18: "60px",
        fit: "calc(100vh - 60px)",
      },
    },
  },
  plugins: [],
};

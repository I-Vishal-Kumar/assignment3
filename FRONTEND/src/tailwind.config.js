/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        18: "60px",
        fit: "calc(100vh - 60px)",
      },
      width: {
        fits: "calc(100vw - 70px)",
      },
      colors: {
        header_background: "#001489",
      },
    },
  },
  plugins: [],
};

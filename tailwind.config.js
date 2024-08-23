/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "header-gradient":
          "linear-gradient(to bottom, #FFFFFF 0%, #f3eeed80 67%, #f9eae000 100%)",
        "button1-gradient":
          "linear-gradient(to bottom, #0092EE 0%, #70ADD8 57%, #0092EE 100%)",
        "button2-gradient":
          "linear-gradient(to right, #0092EE 0%, #F8F8F8 43%, #E9E9E9 100%)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        IBM: ["IBM Plex mono"]
      },
      colors: {
        celeste: "#2E99E8",
        celesteHover: "#147ac6",
      },
      boxShadow: {
        "custom-shadow":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "deep-shadow":
          "0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

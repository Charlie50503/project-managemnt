/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,scss}"],
  important: true,
  media: false,
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFFBEC",
          200: "#FFF6D9",
          300: "#FFEFC7",
          400: "#FFE9B9",
          500: "#FFDFA2",
          600: "#DBB576",
          700: "#B78D51",
          800: "#936833",
          900: "#7A4E1F",
        },
      }
    },
  },
  plugins: [],
};

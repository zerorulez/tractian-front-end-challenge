/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "blue-50": "#F2F8FF",
      "blue-400": "#55A6FF",
      "blue-500": "#2188FF",
      "blue-900": "#023B78",
      "dark-blue": "#17192D",
      "light-gray": "#E3EAEF",
      "gray-200": "#D8DFE6",
      "gray-500": "#88929C",
      "gray-600": "#77818C",
      "gray-950": "#24292F",
      "green-500": "#52C41A",
      "red-500": "#ED3833",
    },
  },
  plugins: [],
};

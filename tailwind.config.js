/** @type {import('tailwindcss').Config} */
import tailwindcssForms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#546CCC",
        "green-primary": "#0AB63B",
        "yellow-primary": "#BEA20E",
        "red-primary": "#E21B17",
        "red-secondary": "rgba(224, 113, 107, 0.11)",
        secondary: "#ACA9F1",
        "primary-blue": "#0038AE",
        "primary-yellow": "#FFA332",
        "grey-primary": "#545454",
        "chat-yellow": "#FFBF0017",
        "disabled-btn": "#7889cc",
        care2u: "#1E7FC2",
      },
    },
  },
  plugins: [tailwindcssForms],
}
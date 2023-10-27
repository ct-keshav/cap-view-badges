/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forestgreen: {
          100: "#42b040",
          200: "#1f9a1d",
        },
        gray: "rgba(235, 236, 240, 0.4)",
        whitesmoke: {
          100: "#ebecf0",
          200: "#ecece7",
          300: "#ebebeb",
        },
        slategray: "#5d6c85",
        aliceblue: "#e9f0fe",
        secondary_3: "#2466ea",
        character_active: "#091e42",
        character_inactive: "#5e6c84",
        darkcyan: "#228f8e",
        mediumvioletred: "#cc2692",
        neutral_4: "#dfe2e7",
        neutral_1: "#FAFBFC",
        "additional-6": "#8517e5",
        "icon-light": "#b3bac5",
        chocolate: "#dd712d",
        "icon-white": "#fff",
        darkgray: {
          100: "#9e9d87",
          200: "#979797",
        },
        crimson: {
          100: "#f5222d",
          200: "#ea213a",
          300: "#ed1c34",
        },
        darkorange: {
          100: "#f87d23",
          200: "#fa7d02",
          300: "rgba(248, 125, 35, 0.2)",
        },
        mediumseagreen: "#33b679",
        neutral_2: "#f4f5f7",
        lightslategray: "#7a869a",
        "colors-primary-green-6": "#47af46",
        dimgray: {
          100: "#5b6973",
          200: "#5a6872",
        },
        dodgerblue: "#006cc7",
      },
      fontFamily: {
        "inductive-regular": "Roboto",
      },
      borderRadius: {
        "17xl": "36px",
        "21xl": "40px",
        "3xs": "10px",
      },
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      "3xs": "10px",
      base: "16px",
    },
  },
  plugins: [],
};

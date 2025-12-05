module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#CC333C", //red
          "primary-dark": "#401618",
          secondary: "#5595D5", //blue
          "secondary-dark": "#1d3a5d",
          grey: "#808080", //grey
          "grey-dark": "#4c4c4c",
          green: "#6EBE46", //green
          "green-dark": "#30542f",
          purple: "#755BA7", //purple
          "purple-dark": "#3d2f84",
        },
        // [
        //     { "label": "blue", "color": "#5595D5", "colorDark": "#1d3a5d" },
        //     { "label": "red", "color": "#CC333C", "colorDark": "#401618" },
        //     { "label": "grey", "color": "#808080", "colorDark": "#4c4c4c" },
        //     { "label": "green", "color": "#6EBE46", "colorDark": "#30542f" },
        //     { "label": "purple", "color": "#755BA7", "colorDark": "#3d2f84" }
        // ]
      },
      // {
      //   dark: {

      //     "primary": "#0019fd",

      //     "primary-content": "#ffffff",

      //     "secondary": "#fc021b",

      //     "secondary-content": "#ffffff",

      //     "accent": "#6e6d6d",

      //     "accent-content": "#ffffff",

      //     "neutral": "#ffffff",

      //     "neutral-content": "#000000",

      //     "base-100": "#000000",

      //     "base-content": "#ffffff",

      //     "info": "#72c4ff",

      //     "success": "#36D399",

      //     "warning": "#FBBD23",

      //     "error": "#F87272",
      //   },
      // },
    ],
  },
};

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#CC333C",
      dark: "#401618",
    },
    secondary: {
      main: "#5595D5",
      dark: "#1d3a5d",
    },
    background: {
      default: "#000000",
      paper: "#25282a",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ['Space Grotesk', 'sans-serif'].join(','),
  },
});

export default theme;



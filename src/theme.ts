import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // brand red
      main: "#CC333C",
      dark: "#401618",
      light: "#e0666c",
    },
    secondary: {
      // brand blue
      main: "#5595D5",
      dark: "#1d3a5d",
      light: "#8ab8e8",
    },
    success: {
      // brand green
      main: "#6EBE46",
      dark: "#30542f",
      light: "#9ed982",
    },
    warning: {
      // brand purple（作為點綴）
      main: "#755BA7",
      dark: "#3d2f84",
      light: "#a392c8",
    },
    grey: {
      500: "#808080",
      700: "#4c4c4c",
    },
    background: {
      default: "#0f1216",
      paper: alpha("#FFFFFF", 0.06),
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.72)",
    },
    divider: "rgba(255,255,255,0.14)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ['Space Grotesk', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // 玻璃感友善漸層背景（品牌色淡彩光暈 + 深色基底）
          backgroundImage: [
            `radial-gradient(1000px 600px at 12% 6%, ${alpha("#5595D5", 0.20)} 0%, transparent 60%)`,
            `radial-gradient(900px 520px at 88% 12%, ${alpha("#CC333C", 0.18)} 0%, transparent 60%)`,
            `radial-gradient(700px 600px at 50% 100%, ${alpha("#755BA7", 0.10)} 0%, transparent 60%)`,
            `linear-gradient(135deg, ${alpha("#151a21", 0.92)} 0%, ${alpha("#0f1216", 0.92)} 100%)`,
          ].join(","),
          backgroundColor: "#0f1216",
          colorScheme: "dark",
        },
      },
    },
    // Filled 欄位統一外觀
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: alpha("#FFFFFF", 0.06),
          transition: "background-color 120ms ease, box-shadow 120ms ease",
          "&:hover": {
            backgroundColor: alpha("#FFFFFF", 0.10),
          },
          "&.Mui-focused": {
            backgroundColor: alpha("#FFFFFF", 0.10),
            boxShadow: `0 0 0 1px ${alpha("#FFFFFF", 0.18)} inset`,
          },
        },
        input: {
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 14,
          paddingRight: 14,
        },
        underline: {
          "&:before": { display: "none" },
          "&:after": { display: "none" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.72)",
        },
        filled: {
          "&.Mui-focused": {
            color: "#FFFFFF",
          },
        },
      },
    },
    // 覆蓋 Dialog 與 Menu/Popover 的紙張背景為實色，避免與後景文字重疊
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#141920",
          backgroundImage: "none",
          backdropFilter: "none",
          border: `1px solid ${alpha("#ffffff", 0.12)}`,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "#141920",
          backgroundImage: "none",
          backdropFilter: "none",
          border: `1px solid ${alpha("#ffffff", 0.12)}`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#141920",
          backgroundImage: "none",
          backdropFilter: "none",
          border: `1px solid ${alpha("#ffffff", 0.12)}`,
        },
      },
    },
  },
});

export default theme;




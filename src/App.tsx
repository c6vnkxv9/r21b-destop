
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import HomeView from './views/HomeView';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeView />
    </ThemeProvider>
  );
}



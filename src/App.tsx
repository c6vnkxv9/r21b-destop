import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import HomeView from "./views/HomeView";
import CreateView from "./views/CreateView";

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/create" element={<CreateView />} />
      </Routes>
    </ThemeProvider>
  );
}

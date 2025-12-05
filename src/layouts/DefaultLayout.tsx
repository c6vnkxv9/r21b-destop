import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

function DefaultLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default DefaultLayout;

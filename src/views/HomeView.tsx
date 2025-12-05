import Box from "@mui/material/Box";
import Banner from "../components/index/banner";
import GameModeForm from "../components/index/form";
import DefaultLayout from "../layouts/DefaultLayout";

function HomeView(): JSX.Element {
  return (
    <DefaultLayout>
      <Banner />
      <Box
        sx={{
          px: { xs: 2, sm: 4, lg: 10 },
          my: { xs: 4, sm: 6, lg: 8 },
          py: 1,
          flex: 1,
          display: "flex",
          minHeight: 0,
        }}
      >
        <GameModeForm sx={{ flex: 1, display: "flex", minHeight: 0 }} />
      </Box>
    </DefaultLayout>
  );
}

export default HomeView;

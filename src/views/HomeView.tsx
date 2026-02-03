import Box from "@mui/material/Box";
import Banner from "../components/index/banner";
import GameModeForm from "../components/index/form";
import DefaultLayout from "../layouts/DefaultLayout";

function HomeView(): JSX.Element {
  return (
    <DefaultLayout>
      <Box sx={{ position: "relative" }}>
        {/* Background mesh and subtle grid overlay inspired by code.html */}
        <Box
          aria-hidden
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: { xs: 0.8, md: 1 },
              backgroundColor: "transparent",
              backgroundImage: [
                "radial-gradient(at 0% 0%, hsla(358, 76%, 65%, 0.20) 0px, transparent 50%)",
                "radial-gradient(at 100% 0%, hsla(217, 91%, 60%, 0.20) 0px, transparent 50%)",
                "radial-gradient(at 100% 100%, hsla(358, 76%, 65%, 0.10) 0px, transparent 50%)",
                "radial-gradient(at 0% 100%, hsla(217, 91%, 60%, 0.10) 0px, transparent 50%)",
              ].join(","),
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: { xs: 0.03, md: 0.05 },
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%239C92AC%27 fill-opacity=%271%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          />
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
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
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default HomeView;

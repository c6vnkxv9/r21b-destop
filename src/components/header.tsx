import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";

export default function Header(): JSX.Element {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      className="backdrop-blur-sm"
      sx={{
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(37,40,42,0.8)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4, lg: 10 }, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: 700, letterSpacing: "-0.015em", color: "#fff" }}
            component="a"
            href="/"
          >
            TWO ROOMS AND ONE BOOM
          </Typography>
        </Box>

        <Link
          href="#"
          underline="none"
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontWeight: 600,
            fontSize: 14,
            "&:hover": { color: "#fff" },
          }}
        >
          遊戲規則
        </Link>
      </Toolbar>
    </AppBar>
  );
}

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
            component="a"
            href="/"
            noWrap
            sx={{
              textDecoration: "none",
              fontFamily: '"Black Ops One","Inter",sans-serif',
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#fff",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 700,
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
              display: "inline-block",
            }}
          >
            <Box component="span" sx={{ color: (t) => t.palette.secondary.main }}>
              Two
            </Box>{" "}
            Rooms{" "}
            <Box component="span" sx={{ color: (t) => t.palette.primary.main }}>
              &amp;
            </Box>{" "}
            One Boom
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

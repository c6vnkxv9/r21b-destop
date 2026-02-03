import { characters } from "@/data/characters.js";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
type CharacterLike = { src?: string };
export default function Banner(): JSX.Element {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ width: "100%" }}>
      <Container disableGutters maxWidth={false}>
        <Box
          data-alt="Abstract fiery explosion background for the game"
          sx={{
            minHeight: { xs: 250, sm: 300 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 6,
            p: 2,
            backgroundImage: [
              `radial-gradient(800px 400px at 15% 10%, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 60%)`,
              `radial-gradient(700px 360px at 85% 15%, ${alpha(theme.palette.primary.main, 0.18)} 0%, transparent 60%)`,
              `linear-gradient(180deg, ${alpha("#0f1318", 0.6)} 0%, ${alpha("#0f1318", 0.9)} 100%)`,
            ].join(","),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "@media (min-width:480px)": {
              gap: 8,
              p: 4,
            },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardWall />
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {/* Soft gradient glow behind the glass panel */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: -16,
                borderRadius: 9999,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                filter: "blur(24px)",
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                px: { xs: 2.5, sm: 5 },
                py: { xs: 2.5, sm: 3.5 },
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
                background: `linear-gradient(180deg, ${alpha("#FFFFFF", 0.10)} 0%, ${alpha(
                  "#FFFFFF",
                  0.03
                )} 100%)`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.25)}, 0 12px 28px ${alpha(
                  theme.palette.secondary.main,
                  0.18
                )}`,
                maxWidth: 960,
                position: "relative",
              }}
            >
              <Typography
              component="h1"
              sx={{
                color: "transparent",
                fontWeight: 900,
                letterSpacing: "-0.033em",
                lineHeight: 1.2,
                fontSize: { xs: "2.25rem", sm: "3.5rem", md: "4rem" },
                backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: `0 2px 12px ${alpha("#000", 0.25)}`,
              }}
              >
                Explosive Fun Awaits!
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontSize: { xs: "0.875rem", sm: "1.125rem" },
                  maxWidth: "42rem",
                  mx: "auto",
                }}
              >
                Join the ultimate game of strategy and wits. Create a room or join your friends now.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function CardWall(): JSX.Element {
  const allSrc = Array.from(
    new Set(
      (characters as CharacterLike[])
        .map((c) => (typeof c?.src === "string" ? `${import.meta.env.BASE_URL}${c.src}` : null))
        .filter(Boolean) as string[]
    )
  );
  const wallImages = Array(120)
    .fill(0)
    .map((_, i) => allSrc[i % allSrc.length]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.22,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "200vw",
          left: "50%",
          top: { xs: "-90%", sm: "-45%" },
          transform: "translateX(-50%) rotate(-22deg)",
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 2 },
          justifyContent: "center",
          "@media (min-width:1920px)": {
            width: "240vw",
            top: "-110%",
          },
        }}
      >
        {wallImages.map((src, idx) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={`${src}-${idx}`}
            component="img"
            src={src}
            alt=""
            loading="lazy"
            sx={{
              width: { xs: 70, sm: 92, md: 104 },
              height: "auto",
              borderRadius: 1.5,
              boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
              filter: "saturate(1.05)",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";
import TimerIcon from "@mui/icons-material/Timer";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export type CreateRoomFormCardProps = {
  rounds: number;
  gameMinutes: number | "";
  discussionMinutes: number | "";
  onRoundsChange: (rounds: number) => void;
  onGameMinutesChange: (value: number | "") => void;
  onDiscussionMinutesChange: (value: number | "") => void;
  onNext?: () => void;
};

export default function CreateRoomFormCard(props: CreateRoomFormCardProps): JSX.Element {
  const {
    rounds,
    gameMinutes,
    discussionMinutes,
    onRoundsChange,
    onGameMinutesChange,
    onDiscussionMinutesChange,
    onNext,
  } = props;
  const theme = useTheme();
  const accent = theme.palette.secondary.main; // 維持原本配色系統，使用次要色作為 accent
  const primary = theme.palette.primary.main;

  return (
    <Box component="section" sx={{ flexGrow: 1, position: "relative" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
          background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(
            theme.palette.common.white,
            0.02
          )} 100%)`,
          backdropFilter: "blur(12px)",
          boxShadow: `0 10px 24px ${alpha(primary, 0.25)}, 0 12px 28px ${alpha(accent, 0.18)}`,
          // flowing gradient border on hover
          "&:hover .flow-border": {
            animation: "flowBorder 3s linear infinite",
            opacity: 0.6,
          },
          "@keyframes flowBorder": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "200% 50%" },
          },
        }}
      >
        {/* Noise overlay for banding reduction */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Flowing gradient border */}
        <Box
          aria-hidden
          className="flow-border"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: 2,
            padding: "1px",
            background: `linear-gradient(90deg, ${alpha(primary, 0)} 0%, ${alpha(
              primary,
              0.5
            )} 25%, ${alpha(accent, 0.5)} 50%, ${alpha(primary, 0.5)} 75%, ${alpha(primary, 0)} 100%)`,
            backgroundSize: "200% 100%",
            mask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", // show only border
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: 0.25,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Top thin gradient bar */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${alpha(accent, 0.6)}, transparent)`,
            opacity: 0.5,
            zIndex: 2,
          }}
        />

        <CardContent sx={{ p: { xs: 3, sm: 6 }, position: "relative", zIndex: 3 }}>
          {/* Heading */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 28,
                borderRadius: 1,
                backgroundColor: accent,
                boxShadow: `0 0 12px ${alpha(accent, 0.8)}`,
              }}
            />
            <Typography
              component="h2"
              sx={{
                color: theme.palette.common.white,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.5rem", sm: "1.875rem" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LoopIcon sx={{ fontSize: 18, opacity: 0.9 }} />
              創建房間基本資訊
            </Typography>
          </Box>
          <Typography
            sx={{
              color: alpha(theme.palette.common.white, 0.6),
              fontSize: 12,
              mb: 5,
              pl: 3.5,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              opacity: 0.8,
            }}
          >
            &gt; CONFIGURE_GAME_PARAMETERS
          </Typography>

          {/* Form */}
          <Stack spacing={3}>
            {/* Rounds stepper */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                backgroundColor: alpha("#0b0f17", 0.7),
                transition: "border-color 300ms",
                "&:hover": { borderColor: alpha(accent, 0.5) },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: accent,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <LoopIcon sx={{ fontSize: 16 }} />
                請輸入有幾局 (Rounds)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2.5,
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${alpha("#fff", 0.08)}`,
                  backgroundColor: alpha("#000", 0.4),
                }}
              >
                <Button
                  type="button"
                  onClick={() => onRoundsChange(Math.max(1, (rounds || 1) - 1))}
                  sx={{
                    minWidth: 48,
                    width: 48,
                    height: 48,
                    borderRadius: 1.2,
                    color: "#fff",
                    backgroundColor: alpha("#fff", 0.08),
                    borderBottom: `4px solid ${alpha("#000", 0.9)}`,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: alpha("#fff", 0.14), color: accent },
                    "&:active": { borderBottomWidth: 0, transform: "translateY(2px)" },
                  }}
                >
                  <RemoveIcon />
                </Button>
                <Box
                  sx={{
                    position: "relative",
                    border: `2px solid ${alpha("#fff", 0.18)}`,
                    borderRadius: 1.2,
                    px: 3,
                    py: 1,
                    minWidth: 120,
                    textAlign: "center",
                    backgroundColor: "#000",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: alpha(accent, 0.05),
                      pointerEvents: "none",
                    }}
                  />
                  <AnimatedNumber
                    value={rounds}
                    pad={2}
                    sx={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 36,
                      color: accent,
                      fontWeight: 800,
                      textShadow: `0 0 8px ${alpha(accent, 0.6)}`,
                    }}
                  />
                </Box>
                <Button
                  type="button"
                  onClick={() => onRoundsChange(Math.min(99, (rounds || 1) + 1))}
                  sx={{
                    minWidth: 48,
                    width: 48,
                    height: 48,
                    borderRadius: 1.2,
                    color: "#fff",
                    backgroundColor: alpha("#fff", 0.08),
                    borderBottom: `4px solid ${alpha("#000", 0.9)}`,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: alpha("#fff", 0.14), color: accent },
                    "&:active": { borderBottomWidth: 0, transform: "translateY(2px)" },
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Typography
                sx={{
                  mt: 1.5,
                  textAlign: "center",
                  fontSize: 12,
                  color: alpha("#fff", 0.6),
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                Recommended: 3-5 Rounds
              </Typography>
            </Box>

            {/* Game time */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                backgroundColor: alpha("#0b0f17", 0.7),
                transition: "border-color 300ms",
                "&:hover": { borderColor: alpha(accent, 0.5) },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: 1.5 }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: accent,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  <TimerIcon sx={{ fontSize: 16 }} />
                  每局遊戲時長 (Game Time)
                </Typography>
                <Box sx={{ display: "inline-flex", alignItems: "baseline", gap: 0.5 }}>
                  <AnimatedNumber
                    value={typeof gameMinutes === "number" ? gameMinutes : 1}
                  sx={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 24,
                      color: "#fff",
                      fontWeight: 800,
                  }}
                  />
                  <Typography component="span" sx={{ color: "#fff", fontWeight: 800 }}>
                    MIN
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position: "relative", pt: 1, pb: 2 }}>
                {/* overlay ticks */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: 2,
                    right: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    pointerEvents: "none",
                    px: 0.5,
                  }}
                >
                  {Array.from({ length: 11 }).map((_, i) => (
                    <Box
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      sx={{
                        width: 1,
                        height: i % 5 === 0 ? 12 : 8,
                        backgroundColor: alpha("#fff", i % 5 === 0 ? 0.4 : 0.3),
                      }}
                    />
                  ))}
                </Box>
                <Slider
                  value={typeof gameMinutes === "number" ? gameMinutes : 1}
                  onChange={(_, v) => onGameMinutesChange(Array.isArray(v) ? v[0] : v)}
                  min={1}
                  max={10}
                  step={1}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    "& .MuiSlider-thumb": {
                      boxShadow: `0 0 0 6px ${alpha(accent, 0.15)}`,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        boxShadow: `0 0 0 0 ${alpha(accent, 0.3)}`,
                        transition: "box-shadow 200ms ease",
                      },
                    },
                    "& .MuiSlider-thumb.Mui-active::after": {
                      boxShadow: `0 0 0 12px ${alpha(accent, 0.12)}`,
                    },
                    "& .MuiSlider-track": {
                      background: `linear-gradient(90deg, ${secondaryOr(accent)}, ${primary})`,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Discussion time */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                backgroundColor: alpha("#0b0f17", 0.7),
                transition: "border-color 300ms",
                "&:hover": { borderColor: alpha(accent, 0.5) },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: 1.5 }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: accent,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  <RecordVoiceOverIcon sx={{ fontSize: 16 }} />
                  每局討論時長 (Discussion)
                </Typography>
                <Box sx={{ display: "inline-flex", alignItems: "baseline", gap: 0.5 }}>
                  <AnimatedNumber
                    value={typeof discussionMinutes === "number" ? discussionMinutes : 1}
                  sx={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 24,
                      color: "#fff",
                      fontWeight: 800,
                  }}
                  />
                  <Typography component="span" sx={{ color: "#fff", fontWeight: 800 }}>
                    MIN
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position: "relative", pt: 1, pb: 2 }}>
                {/* overlay ticks */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: 2,
                    right: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    pointerEvents: "none",
                    px: 0.5,
                  }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Box
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      sx={{
                        width: 1,
                        height: i % 5 === 0 ? 12 : 8,
                        backgroundColor: alpha("#fff", i % 5 === 0 ? 0.4 : 0.3),
                      }}
                    />
                  ))}
                </Box>
                <Slider
                  value={typeof discussionMinutes === "number" ? discussionMinutes : 1}
                  onChange={(_, v) => onDiscussionMinutesChange(Array.isArray(v) ? v[0] : v)}
                  min={1}
                  max={5}
                  step={1}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    "& .MuiSlider-thumb": {
                      boxShadow: `0 0 0 6px ${alpha(primary, 0.15)}`,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        boxShadow: `0 0 0 0 ${alpha(primary, 0.3)}`,
                        transition: "box-shadow 200ms ease",
                      },
                    },
                    "& .MuiSlider-thumb.Mui-active::after": {
                      boxShadow: `0 0 0 12px ${alpha(primary, 0.12)}`,
                    },
                    "& .MuiSlider-track": {
                      background: `linear-gradient(90deg, ${secondaryOr(accent)}, ${primary})`,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                mt: 2,
                pt: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                borderTop: `1px solid ${alpha("#fff", 0.12)}`,
                gap: 2,
                position: "relative",
              }}
            >
              <Box sx={{ mr: 2, textAlign: "right", display: { xs: "none", sm: "block" } }}>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: alpha("#fff", 0.6),
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  ESTIMATED DURATION
                </Typography>
                <Typography
                  sx={{
                    fontSize: 18,
                    color: "#fff",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  ~
                  {(() => {
                    const r = typeof rounds === "number" ? rounds : 0;
                    const g = typeof gameMinutes === "number" ? gameMinutes : 0;
                    const d = typeof discussionMinutes === "number" ? discussionMinutes : 0;
                    const total = r * (g + d);
                    return total > 0 ? ` ${total} MIN` : " -- MIN";
                  })()}
                </Typography>
              </Box>
              <Button
                type="button"
                onClick={onNext}
                variant="contained"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  px: 4,
                  py: 1.25,
                  fontWeight: 800,
                  background: `linear-gradient(90deg, ${secondaryOr(accent)} 0%, ${primary} 100%)`,
                  boxShadow: `0 0 20px ${alpha(primary, 0.3)}`,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 0 28px ${alpha(primary, 0.45)}`,
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1, display: "inline-flex", gap: 1, alignItems: "center" }}>
                  下一步 <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </Box>
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "-120%",
                    width: "120%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    transform: "skewX(12deg)",
                    transition: "transform 400ms",
                    "@keyframes shimmer": {
                      "0%": { left: "-120%" },
                      "100%": { left: "120%" },
                    },
                    ".MuiButton-root:hover &": {
                      animation: "shimmer 1000ms infinite",
                    },
                  }}
                />
              </Button>
            </Box>
          </Stack>
        </CardContent>

        {/* Corner accents */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            borderTop: `2px solid ${alpha(accent, 0.5)}`,
            borderLeft: `2px solid ${alpha(accent, 0.5)}`,
            borderTopLeftRadius: 8,
            pointerEvents: "none",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 32,
            height: 32,
            borderBottom: `2px solid ${alpha(accent, 0.5)}`,
            borderRight: `2px solid ${alpha(accent, 0.5)}`,
            borderBottomRightRadius: 8,
            pointerEvents: "none",
          }}
        />
      </Card>
    </Box>
  );
}

function secondaryOr(color: string): string {
  return color;
}

// Animated number ticker-like effect
function AnimatedNumber({
  value,
  pad = 0,
  sx,
}: {
  value: number;
  pad?: number;
  sx?: Record<string, unknown>;
}): JSX.Element {
  const str = String(value).padStart(pad, "0");
  return (
    <Box
      key={str}
      sx={{
        display: "inline-block",
        transform: "translateY(0.6em)",
        animation: "tickerIn 260ms ease-out",
        "@keyframes tickerIn": {
          "0%": { opacity: 0, transform: "translateY(1.2em)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        ...sx,
      }}
    >
      {str}
    </Box>
  );
}

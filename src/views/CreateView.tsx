import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateRoomFormCard from "../components/create/CreateRoomFormCard";
import SelectCharacterCombination from "../components/create/SelectCharacterCombination";
import ShareRoomInfoCard from "../components/create/ShareRoomInfoCard";
import StepSidebar from "../components/create/StepSidebar";
import DefaultLayout from "../layouts/DefaultLayout";

function CreateView(): JSX.Element {
  const [rounds, setRounds] = useState<number>(3);
  const [gameMinutes, setGameMinutes] = useState<number | "">("");
  const [discussionMinutes, setDiscussionMinutes] = useState<number | "">("");
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const steps = ["創建房間基本資訊", "挑選角色組合", "分享房間資訊"];
  const stepFromUrl = Number(searchParams.get("step") ?? "1");
  const currentStep =
    Number.isFinite(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= steps.length
      ? stepFromUrl
      : 1;
  const activeStepIndex = currentStep - 1;
  const [pairProgress, setPairProgress] = useState<{ index: number; total: number }>({
    index: 0,
    total: 0,
  });
  // Expose a circle mask transition for dark/light toggle consumers
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__triggerThemeMask = (clientX?: number, clientY?: number, color?: string) => {
      const x = clientX ?? window.innerWidth / 2;
      const y = clientY ?? 40;
      const bg = color ?? theme.palette.background.default;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.inset = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "9999";
      el.style.background = `radial-gradient(circle at ${x}px ${y}px, ${bg} 0%, ${bg} 0%, transparent 0%)`;
      document.body.appendChild(el);
      el.animate(
        [
          {
            background: `radial-gradient(circle at ${x}px ${y}px, ${bg} 0%, ${bg} 0%, transparent 0%)`,
          },
          {
            background: `radial-gradient(circle at ${x}px ${y}px, ${bg} 0%, ${bg} ${r}px, transparent ${r + 1}px)`,
          },
        ],
        { duration: 500, easing: "ease-out" }
      ).onfinish = () => el.remove();
    };
  }, [theme.palette.background.default]);

  return (
    <DefaultLayout>
      <Box
        sx={{
          px: { xs: 2, sm: 4, lg: 10 },
          py: 3,
          flex: 1,
          display: "flex",
          minHeight: 0,
          width: "100%",
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} sx={{ width: "100%" }}>
          <Grid item xs={12} md={4} lg={3}>
            <StepSidebar
              steps={steps}
              activeStep={activeStepIndex}
              onStepClick={(index) => setSearchParams({ step: String(index + 1) })}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            {activeStepIndex === 0 ? (
              <CreateRoomFormCard
                rounds={rounds}
                gameMinutes={gameMinutes}
                discussionMinutes={discussionMinutes}
                onRoundsChange={(n) => setRounds(n)}
                onGameMinutesChange={(v) => setGameMinutes(v)}
                onDiscussionMinutesChange={(v) => setDiscussionMinutes(v)}
                onNext={() =>
                  setSearchParams({ step: String(Math.min(currentStep + 1, steps.length)) })
                }
              />
            ) : activeStepIndex === 1 ? (
              <Box sx={{ position: "relative" }}>
                {/* Top-right mission progress indicator */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    zIndex: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(10, 10px)",
                      gridAutoRows: "10px",
                      gap: "3px",
                      p: 1,
                      borderRadius: 1,
                      border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                      background: alpha("#0b0f17", 0.6),
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {Array.from({ length: 10 }).map((_, i) => {
                      const filled =
                        pairProgress.total > 0
                          ? i < Math.ceil(((pairProgress.index + 1) / pairProgress.total) * 10)
                          : i < 1;
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box
                          key={i}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: 0.5,
                            backgroundColor: filled
                              ? theme.palette.primary.main
                              : alpha("#ef4444", 0.15),
                            boxShadow: filled
                              ? `0 0 8px ${alpha(theme.palette.primary.main, 0.7)}`
                              : "none",
                            animation: filled ? "magFill 600ms ease-in both" : "none",
                            "@keyframes magFill": {
                              "0%": { transform: "scale(0.6)", opacity: 0.4 },
                              "100%": { transform: "scale(1)", opacity: 1 },
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                  <Box
                    sx={{
                      fontSize: 11,
                      color: alpha("#fff", 0.8),
                      letterSpacing: 1.5,
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    }}
                  >
                    PAIR SELECTION
                  </Box>
                </Box>

                <SelectCharacterCombination
                  onChangeSelected={(pair) =>
                    setPairProgress((prev) => {
                      const total = Math.max(prev.total, Number(pair.id)); // fallback heuristic
                      const index = Number(pair.id) - 1 || 0;
                      return { index, total: total || 10 };
                    })
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ minWidth: 120 }}
                    onClick={() => setSearchParams({ step: "1" })}
                  >
                    上一步
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 120 }}
                    onClick={() => setSearchParams({ step: "3" })}
                  >
                    下一步
                  </Button>
                </Box>
              </Box>
            ) : activeStepIndex === 2 ? (
              <Box>
                <ShareRoomInfoCard
                  roomCode={"AB12-CD34"}
                  roomName={"我的第一間遊戲室"}
                  playerCount={8}
                  rounds={rounds}
                  gameMinutes={typeof gameMinutes === "number" ? gameMinutes : 0}
                />

                <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setSearchParams({ step: "2" })}
                      sx={{ minWidth: 120 }}
                    >
                      上一步
                    </Button>
                    <Button variant="contained" color="primary" sx={{ minWidth: 120 }}>
                      進入房間
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ p: 2 }} />
            )}
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  );
}

export default CreateView;

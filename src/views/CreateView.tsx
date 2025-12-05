import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
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

  const steps = ["創建房間基本資訊", "挑選角色組合", "分享房間資訊"];
  const stepFromUrl = Number(searchParams.get("step") ?? "1");
  const currentStep =
    Number.isFinite(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= steps.length
      ? stepFromUrl
      : 1;
  const activeStepIndex = currentStep - 1;

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
              <Box>
                <SelectCharacterCombination />
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

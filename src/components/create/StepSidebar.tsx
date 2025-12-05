import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export type StepSidebarProps = {
  steps: string[];
  activeStep: number;
  onStepClick?: (index: number) => void;
  title?: string;
  subtitle?: string;
};

export default function StepSidebar(props: StepSidebarProps): JSX.Element {
  const {
    steps,
    activeStep,
    onStepClick,
    title = "Game Room Setup",
    subtitle = "Complete the steps",
  } = props;
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isHorizontal = useMediaQuery("(max-width:780px)");

  if (isHorizontal) {
    // 橫向步驟列（<= 780px）使用 MUI Stepper
    const completed = steps.map((_, i) => i < activeStep);
    const handleStep = (index: number) => () => {
      if (onStepClick) onStepClick(index);
    };

    return (
      <Box sx={{ px: 1, py: 1 }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          sx={{
            px: 1,
            "& .MuiStepIcon-root": {
              color: alpha(theme.palette.common.white, 0.28),
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: theme.palette.primary.main,
              filter: `drop-shadow(0 6px 12px ${alpha(theme.palette.primary.main, 0.35)})`,
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: theme.palette.secondary.main,
              filter: `drop-shadow(0 6px 12px ${alpha(theme.palette.secondary.main, 0.28)})`,
            },
            "& .MuiStepConnector-line": {
              borderColor: alpha(theme.palette.common.white, 0.18),
            },
            backdropFilter: "blur(6px)",
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }

  return (
    <Box sx={{ position: isLgUp ? "sticky" : "static", top: isLgUp ? 96 : "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.9,
            flex: "0 0 auto",
          }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {(() => {
        const completed = steps.map((_, i) => i < activeStep);
        const handleStep = (index: number) => () => {
          if (onStepClick) onStepClick(index);
        };
        return (
          <Stepper
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              mt: 1,
              "& .MuiStep-root": { pb: 1.5 },
              "& .MuiStepConnector-line": {
                borderColor: alpha(theme.palette.common.white, 0.18),
              },
              "& .MuiStepIcon-root": {
                color: alpha(theme.palette.common.white, 0.28),
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: theme.palette.primary.main,
                filter: `drop-shadow(0 6px 12px ${alpha(theme.palette.primary.main, 0.35)})`,
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: theme.palette.secondary.main,
                filter: `drop-shadow(0 6px 12px ${alpha(theme.palette.secondary.main, 0.28)})`,
              },
              "& .MuiStepButton-root": {
                borderRadius: 1.25,
                px: 1,
                py: 1,
                border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(
                  theme.palette.common.white,
                  0.02
                )} 100%)`,
                backdropFilter: "blur(6px)",
                "&:hover": {
                  borderColor: alpha(theme.palette.common.white, 0.22),
                },
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  <Typography variant="body2" sx={{ fontWeight: index === activeStep ? 700 : 500 }}>
                    {label}
                  </Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        );
      })()}
    </Box>
  );
}

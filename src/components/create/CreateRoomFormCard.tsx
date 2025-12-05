import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

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

  return (
    <Card
      sx={{
        border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
        background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.02)} 100%)`,
        backdropFilter: "blur(6px)",
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Box sx={{ pb: 2, borderBottom: "1px solid", borderColor: "divider", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
            創建房間基本資訊
          </Typography>
        </Box>

        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          <FormControl fullWidth>
            <InputLabel id="rounds-label">請輸入有幾局</InputLabel>
            <Select
              labelId="rounds-label"
              label="請輸入有幾局"
              value={rounds}
              onChange={(e) => onRoundsChange(Number(e.target.value))}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="請輸入每局遊戲時長（分鐘）"
            value={gameMinutes}
            onChange={(e) =>
              onGameMinutesChange(e.target.value === "" ? "" : Number(e.target.value))
            }
            inputProps={{ min: 0 }}
            fullWidth
          />

          <TextField
            type="number"
            label="請輸入每局討論時長（分鐘）"
            value={discussionMinutes}
            onChange={(e) =>
              onDiscussionMinutesChange(e.target.value === "" ? "" : Number(e.target.value))
            }
            inputProps={{ min: 0 }}
            fullWidth
          />
        </Stack>

        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" size="large" onClick={onNext}>
            下一步
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

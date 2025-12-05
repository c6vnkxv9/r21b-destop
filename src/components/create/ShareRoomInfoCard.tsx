import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

export type ShareRoomInfoCardProps = {
  roomCode: string;
  roomName: string;
  playerCount: number;
  rounds: number;
  gameMinutes: number;
  onCopySuccess?: () => void;
};

export default function ShareRoomInfoCard(props: ShareRoomInfoCardProps): JSX.Element {
  const { roomCode, roomName, playerCount, rounds, gameMinutes, onCopySuccess } = props;
  const theme = useTheme();

  const detailsText = `房間代碼：${roomCode}
                      房間名稱：${roomName}
                      遊戲人數：${playerCount} 人
                      遊戲局數：${rounds} 局
                      遊戲時長：${gameMinutes} 分鐘`;

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(detailsText);
      onCopySuccess?.();
    } catch {
      // ignore
    }
  };

  return (
    <Card
      sx={{
        border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
        background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.02)} 100%)`,
        backdropFilter: "blur(6px)",
        boxShadow: 2,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
            你的房間已準備就緒！
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            分享房間代碼，邀請朋友加入
          </Typography>

          <Box sx={{ mt: 6, width: "100%", maxWidth: 560 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              你的房間代碼
            </Typography>
            <TextField
              fullWidth
              value={roomCode}
              InputProps={{
                readOnly: true,
                sx: {
                  textAlign: "center",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    fontSize: 28,
                    py: 2,
                  },
                },
              }}
            />

            <Box sx={{ mt: 4, mb: 4, borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Room Details
              </Typography>

              <Box sx={{ display: "grid", gap: 1.25 }}>
                <RowItem label="房間名稱" value={roomName} />
                <RowItem label="遊戲人數" value={`${playerCount} 人`} />
                <RowItem label="遊戲局數" value={`${rounds} 局`} />
                <RowItem label="遊戲時長" value={`${gameMinutes} 分鐘`} />
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleCopy}
            >
              複製房間資訊
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function RowItem(props: { label: string; value: string }): JSX.Element {
  const { label, value } = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

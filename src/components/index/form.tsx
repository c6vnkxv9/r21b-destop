import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type Mode = "join" | "create" | "return";

export default function GameModeForm(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Mode>("join");

  const [roomNumber, setRoomNumber] = useState<string>("");
  const [createRoomNumber, setCreateRoomNumber] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [returnRoomNumber, setReturnRoomNumber] = useState<string>("");
  const [returnPassword, setReturnPassword] = useState<string>("");

  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const tabs = useMemo(
    () => [
      { key: "join" as const, label: "加入遊戲房間", },
      { key: "create" as const, label: "創建遊戲房間", },
      { key: "return" as const, label: "回到我的遊戲房間", },
    ],
    []
  );

  function openError(message: string) {
    setModalMessage(message);
    setShowModal(true);
  }

  function onJoin() {
    if (!roomNumber.trim()) {
      openError("您尚未輸入房號，請輸入房號後再試一次。");
      return;
    }
    // TODO: navigate or call API
  }

  function onCreate() {
    if (!createRoomNumber.trim() || !createPassword.trim()) {
      openError("請輸入房號與密碼。");
      return;
    }
    // TODO: call API to create
  }

  function onReturn() {
    if (!returnRoomNumber.trim() || !returnPassword.trim()) {
      openError("請輸入房號與密碼。");
      return;
    }
    // TODO: resume game
  }

  return (
    <section className="py-16 px-20">
      <div className="max-w-4xl mx-auto">
        <Paper
          elevation={6}
          className="rounded-lg"
          sx={{ overflow: "hidden", backgroundColor: "rgba(38,40,42,0.85)" }}
        >
          <Box sx={{ px: { xs: 1, sm: 2 }, pt: 2 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{ sx: { bgcolor: "#CC333C" } }}
            >
              {tabs.map((t) => (
                <Tab
                  key={t.key}
                  value={t.key}
                  label={t.label}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-selected": { color: "#fff", fontWeight: 700 },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Divider sx={{ opacity: 0.2 }} />

          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            {activeTab === "join" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <TextField
                  label="房號"
                  placeholder="請輸入房號"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={onJoin}
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(90deg, #CC333C 0%, #5595D5 100%)",
                  }}
                >
                  加入
                </Button>
              </Box>
            )}

            {activeTab === "create" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <TextField
                  label="房號"
                  placeholder="請設定房號"
                  value={createRoomNumber}
                  onChange={(e) => setCreateRoomNumber(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="password"
                  label="密碼"
                  placeholder="請設定密碼"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCreate}
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(90deg, #CC333C 0%, #5595D5 100%)",
                  }}
                >
                  創建
                </Button>
              </Box>
            )}

            {activeTab === "return" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <TextField
                  label="房號"
                  placeholder="請輸入房號"
                  value={returnRoomNumber}
                  onChange={(e) => setReturnRoomNumber(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="password"
                  label="密碼"
                  placeholder="請輸入密碼"
                  value={returnPassword}
                  onChange={(e) => setReturnPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={onReturn}
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(90deg, #CC333C 0%, #5595D5 100%)",
                  }}
                >
                  回到我的遊戲
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="xs">
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setShowModal(false)}
            sx={{
              background: "linear-gradient(90deg, #CC333C 0%, #5595D5 100%)",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}



import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha, useTheme } from "@mui/material/styles";
import { useMemo, useState, type FC } from "react";
import NicknameField from "../common/NicknameField";
import RoomNameField from "../common/RoomNameField";

type Mode = "join" | "create" | "return";

const GameModeForm: FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
  const [activeTab, setActiveTab] = useState<Mode>("join");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [createRoomNumber, setCreateRoomNumber] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [returnRoomNumber, setReturnRoomNumber] = useState<string>("");
  const [returnPassword, setReturnPassword] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const theme = useTheme();

  const tabs = useMemo(
    () => [
      { key: "join" as const, label: "加入遊戲房間" },
      { key: "create" as const, label: "創建遊戲房間" },
      { key: "return" as const, label: "回到我的遊戲房間" },
    ],
    []
  );

  function openError(message: string) {
    setModalMessage(message);
    setShowModal(true);
  }

  function onJoin() {
    if (!roomNumber.trim()) {
      openError("您尚未輸入房間名稱，請輸入房間名稱後再試一次。");
      return;
    }
    // TODO: navigate or call API
  }

  function onCreate() {
    if (!createRoomNumber.trim() || !createPassword.trim()) {
      openError("請輸入房間名稱與密碼。");
      return;
    }
    // TODO: call API to create
  }

  function onReturn() {
    if (!returnRoomNumber.trim() || !returnPassword.trim()) {
      openError("請輸入房間名稱與密碼。");
      return;
    }
    // TODO: resume game
  }

  return (
    <Box
      component="section"
      className="px-20 py-16"
      sx={
        Array.isArray(sx)
          ? [{ display: "flex", flex: 1, minHeight: 0, flexDirection: "column" }, ...sx]
          : [{ display: "flex", flex: 1, minHeight: 0, flexDirection: "column" }, sx || {}]
      }
    >
      <Box
        className="mx-auto max-w-4xl"
        sx={{ height: "100%", display: "flex", flexDirection: "column", width: "100%" }}
      >
        <Paper
          elevation={6}
          className="rounded-lg"
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
            background: `linear-gradient(180deg, ${alpha("#FFFFFF", 0.1)} 0%, ${alpha(
              "#FFFFFF",
              0.03
            )} 100%)`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.25)}, 0 12px 28px ${alpha(
              theme.palette.secondary.main,
              0.18
            )}`,
          }}
        >
          <Box sx={{ px: { xs: 1, sm: 2 }, pt: 2 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{
                sx: {
                  height: 3,
                  borderRadius: 3,
                  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            >
              {tabs.map((t) => (
                <Tab
                  key={t.key}
                  value={t.key}
                  label={t.label}
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    "&.Mui-selected": { color: "#fff", fontWeight: 700 },
                    "&:hover": { color: "#fff" },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Divider sx={{ opacity: 0.2 }} />

          <Box sx={{ p: { xs: 2, sm: 4 }, flex: 1, minHeight: 0, overflow: "auto" }}>
            {activeTab === "join" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <NicknameField value={nickname} onChange={setNickname} />
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="join-room-name">房間名稱</InputLabel>
                  <FilledInput
                    id="join-room-name"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="請輸入房間名稱"
                    sx={{
                      borderRadius: 2,
                      backdropFilter: "blur(4px)",
                      backgroundColor: alpha("#0b0f17", 0.2),
                      "&.Mui-focused": {
                        boxShadow: `0 0 15px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      },
                    }}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onJoin}
                  fullWidth
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: "0 0 20px rgba(220,38,38,0.30)",
                    "&:hover": {
                      boxShadow: "0 0 30px rgba(220,38,38,0.45)",
                    },
                  }}
                >
                  加入房間
                </Button>
              </Box>
            )}

            {activeTab === "create" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <NicknameField value={nickname} onChange={setNickname} />
                <RoomNameField
                  value={createRoomNumber}
                  onChange={setCreateRoomNumber}
                  nickname={nickname}
                  placeholder="請設定房間名稱"
                />
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="create-room-password">密碼</InputLabel>
                  <FilledInput
                    id="create-room-password"
                    type="password"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="請設定密碼"
                    sx={{
                      borderRadius: 2,
                      backdropFilter: "blur(4px)",
                      backgroundColor: alpha("#0b0f17", 0.2),
                      "&.Mui-focused": {
                        boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCreate}
                  fullWidth
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: "0 0 20px rgba(59,130,246,0.30)",
                    "&:hover": {
                      boxShadow: "0 0 30px rgba(59,130,246,0.45)",
                    },
                  }}
                >
                  創建房間
                </Button>
              </Box>
            )}

            {activeTab === "return" && (
              <Box sx={{ maxWidth: 480, mx: "auto", display: "grid", gap: 3 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="return-room-name">房間名稱</InputLabel>
                  <FilledInput
                    id="return-room-name"
                    value={returnRoomNumber}
                    onChange={(e) => setReturnRoomNumber(e.target.value)}
                    placeholder="請輸入房間名稱"
                    sx={{
                      borderRadius: 2,
                      backdropFilter: "blur(4px)",
                      backgroundColor: alpha("#0b0f17", 0.2),
                      "&.Mui-focused": {
                        boxShadow: `0 0 15px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      },
                    }}
                  />
                </FormControl>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="return-room-password">密碼</InputLabel>
                  <FilledInput
                    id="return-room-password"
                    type="password"
                    value={returnPassword}
                    onChange={(e) => setReturnPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    sx={{
                      borderRadius: 2,
                      backdropFilter: "blur(4px)",
                      backgroundColor: alpha("#0b0f17", 0.2),
                      "&.Mui-focused": {
                        boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onReturn}
                  fullWidth
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: "0 0 20px rgba(220,38,38,0.30)",
                    "&:hover": {
                      boxShadow: "0 0 30px rgba(220,38,38,0.45)",
                    },
                  }}
                >
                  回到我的房間
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

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
              background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GameModeForm;

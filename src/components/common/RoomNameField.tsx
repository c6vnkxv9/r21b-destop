import { FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CasinoIcon from "@mui/icons-material/Casino";
import { useCallback } from "react";

export interface RoomNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  nickname?: string;
  label?: string;
  id?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  placeholder?: string;
}

function randomSuffix(length = 4): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

const RoomNameField = ({
  value,
  onChange,
  nickname,
  label = "房間名稱",
  id = "room-name",
  sx,
  fullWidth = true,
  placeholder = "請輸入房間名稱",
}: RoomNameFieldProps) => {
  const handleRandomize = useCallback(() => {
    const base = (nickname && nickname.trim()) ? nickname.trim() : "我的房間";
    onChange(`${base}${randomSuffix(4)}`);
  }, [nickname, onChange]);

  return (
    <FormControl variant="filled" sx={sx} fullWidth={fullWidth}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="隨機產生房間名稱" onClick={handleRandomize} edge="end">
              <CasinoIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default RoomNameField;



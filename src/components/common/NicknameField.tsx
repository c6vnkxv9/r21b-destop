import AddReactionSharpIcon from "@mui/icons-material/AddReactionSharp";
import CasinoIcon from "@mui/icons-material/Casino";
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo, useCallback, useMemo } from "react";
import Avatar, { genConfig } from "react-nice-avatar-vite-prod-fork";

export interface NicknameFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}

function generateRandomNickname(): string {
  const adjectives = [
    "靈巧",
    "神秘",
    "溫柔",
    "狂野",
    "沉著",
    "俏皮",
    "瀟灑",
    "電光",
    "疾風",
    "暖心",
  ];
  const animals = ["狐狸", "熊貓", "獅子", "章魚", "企鵝", "海豚", "鷹", "狼", "鯊魚", "老虎"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${adj}${animal}${num}`;
}

const NicknameField = ({
  value,
  onChange,
  label = "暱稱",
  id = "nickname",
  sx,
  fullWidth = true,
}: NicknameFieldProps) => {
  const handleRandomize = useCallback(() => {
    onChange(generateRandomNickname());
  }, [onChange]);

  const trimmedName = (value ?? "").trim();
  const avatarConfig = useMemo(() => {
    if (!trimmedName) return undefined;
    return genConfig(trimmedName);
  }, [trimmedName]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        alignItems: "center",
        columnGap: 1.5,
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 28,
          height: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {trimmedName ? (
          <Avatar style={{ width: 28, height: 28 }} config={avatarConfig} />
        ) : (
          <AddReactionSharpIcon sx={{ width: 28, height: 28, color: "rgba(255,255,255,0.72)" }} />
        )}
      </Box>
      <FormControl variant="filled" sx={sx} fullWidth={fullWidth}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <FilledInput
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="隨機產生暱稱" onClick={handleRandomize} edge="end">
                <CasinoIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default memo(NicknameField);

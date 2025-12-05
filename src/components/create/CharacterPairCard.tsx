import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { characters } from "../../data/characters.js";
import colorList from "../../data/colorList.json";

type Role = {
  name: string;
  description: string;
  side: "red" | "blue" | "grey" | "green" | "purple";
};

export type CharacterPair = {
  id: string;
  roles: Role[];
};

export type CharacterPairCardProps = {
  pair: CharacterPair;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showTitle?: boolean;
  showDesc?: boolean;
  showPic?: boolean;
};

export default function CharacterPairCard(props: CharacterPairCardProps): JSX.Element {
  const {
    pair,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
    showTitle = true,
    showDesc = true,
    showPic = true,
  } = props;
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuEl);
  const theme = useTheme();

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    setMenuEl(e.currentTarget);
  };
  const handleCloseMenu = (): void => setMenuEl(null);

  const getSideColors = (label: Role["side"]): { bg: string; fg: string } => {
    const entry = (colorList as Array<{ label: string; color: string; colorDark: string }>).find(
      (c) => c.label === label
    );
    if (entry) {
      return { bg: entry.colorDark, fg: entry.color };
    }
    // fallback to theme palette
    if (label === "red") return { bg: theme.palette.primary.dark, fg: theme.palette.primary.light };
    if (label === "blue")
      return { bg: theme.palette.secondary.dark, fg: theme.palette.secondary.light };
    return { bg: alpha("#ffffff", 0.16), fg: alpha("#ffffff", 0.9) };
  };

  const getRoleImageSrc = (name: string, side: Role["side"]): string | undefined => {
    const match = (characters as CharacterRecord[]).find(
      (c) =>
        (c.label === name || c.role === name) &&
        (c.color === side || (side === "grey" && c.color === "grey"))
    );
    if (match?.src) {
      return `/${match.src}`; // served from /public
    }
    return undefined;
  };

  return (
    <Box
      onClick={onSelect}
      sx={{
        borderRadius: 2,
        p: isSelected ? 0.75 : 0,
        transition: "all .25s ease",
        background: isSelected
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
          : "transparent",
        border: isSelected ? "none" : `2px solid ${alpha(theme.palette.common.white, 0.12)}`,
        "&:hover": !isSelected
          ? {
              borderColor: alpha(theme.palette.common.white, 0.22),
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
            }
          : undefined,
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: 1.5,
          p: 1.5,
          cursor: "pointer",
          transition: "all 0.2s ease",
          background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.02)} 100%)`,
          backdropFilter: "blur(6px)",
          boxShadow: isSelected
            ? `0 10px 24px ${alpha(theme.palette.primary.main, 0.25)}, 0 12px 28px ${alpha(theme.palette.secondary.main, 0.18)}`
            : 2,
        }}
      >
        <Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 2, display: "flex", gap: 0.5 }}>
          <IconButton size="small" sx={{ opacity: 0.85 }} onClick={handleOpenMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { minWidth: 140 } } }}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleCloseMenu();
                onEdit();
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              編輯
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleCloseMenu();
                onDelete();
              }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              刪除
            </MenuItem>
          </Menu>
        </Box>

        {showPic && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <AvatarGroup
              sx={{ "& .MuiAvatar-root": { borderColor: alpha(theme.palette.common.white, 0.18) } }}
            >
              {pair.roles.map((role, idx) => {
                const side = getSideColors(role.side);
                const imgSrc = getRoleImageSrc(role.name, role.side);
                return (
                  <Avatar
                    key={idx}
                    src={imgSrc}
                    sx={{
                      width: 36,
                      height: 36,
                      fontWeight: 800,
                      bgcolor: side.bg,
                      color: side.fg,
                    }}
                  >
                    {role.name.slice(0, 1)}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {pair.roles.map((role, idx) => (
            <Box key={idx} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {showTitle && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: getSideColors(role.side).fg,
                  }}
                >
                  {role.name}
                </Typography>
              )}
              {showDesc && (
                <Tooltip title={role.description} arrow>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ display: "block" }}
                  >
                    {role.description}
                  </Typography>
                </Tooltip>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

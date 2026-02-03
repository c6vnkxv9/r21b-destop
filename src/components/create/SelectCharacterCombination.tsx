import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { characters } from "../../data/characters.js";
import CharacterPairCard from "./CharacterPairCard";

type Role = {
  name: string;
  description: string;
  side: "red" | "blue" | "grey";
};

export type CharacterPair = {
  id: string;
  roles: Role[];
};

export type SelectCharacterCombinationProps = {
  pairs?: CharacterPair[];
  defaultSelectedId?: string;
  onChangeSelected?: (pair: CharacterPair) => void;
  onDeletePair?: (pairId: string) => void;
};

type CharacterItem = {
  key: string;
  role: string;
  color: "red" | "blue" | "grey" | "green" | "purple" | string;
  label: string;
  desc: string;
  pair: string;
  src?: string;
};

export default function SelectCharacterCombination(
  props: SelectCharacterCombinationProps
): JSX.Element {
  const { pairs: pairsProp, defaultSelectedId, onChangeSelected, onDeletePair } = props;
  const theme = useTheme();
  const derivedPairs = useMemo<CharacterPair[]>(() => {
    if (pairsProp) return pairsProp;
    const list = characters as CharacterItem[] as CharacterItem[];

    // 按照 pair 分組，並確保同一 pair 的角色集中在一起
    const byPair = new Map<string, Map<string, Role>>();
    for (const c of list) {
      const pairId = String(c.pair);
      const roleBucket = byPair.get(pairId) ?? new Map<string, Role>();
      const side: Role["side"] =
        c.color === "red" || c.color === "blue" || c.color === "grey"
          ? (c.color as Role["side"])
          : "grey";
      const key = `${c.label ?? c.role}-${side}`;
      if (!roleBucket.has(key)) {
        roleBucket.set(key, { name: c.label ?? c.role, description: c.desc ?? "", side });
      }
      byPair.set(pairId, roleBucket);
    }

    // 依顏色順序（紅、藍、灰）排列，同一 pair 最後輸出一筆
    const colorOrder: Record<Role["side"], number> = { red: 0, blue: 1, grey: 2 };

    const result: CharacterPair[] = Array.from(byPair.entries()).map(([pairId, roleMap]) => {
      const roles = Array.from(roleMap.values()).sort(
        (a, b) => colorOrder[a.side] - colorOrder[b.side]
      );
      return { id: pairId, roles };
    });

    // 依 pair 數值排序，確保顯示有序
    result.sort((a, b) => Number(a.id) - Number(b.id));

    return result;
  }, [pairsProp]);

  const [pairs, setPairs] = useState<CharacterPair[]>(derivedPairs);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelectedId ?? derivedPairs[0]?.id
  );
  const [search, setSearch] = useState<string>("");

  // Edit dialog state
  const [editing, setEditing] = useState<{
    id: string;
    roles: { name: string; desc: string }[];
  } | null>(null);

  // view options for toggling card content
  const [viewOptions, setViewOptions] = useState<{ title: boolean; desc: boolean; pic: boolean }>({
    title: true,
    desc: true,
    pic: true,
  });
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuEl);
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>): void => setMenuEl(e.currentTarget);
  const handleCloseMenu = (): void => setMenuEl(null);

  const handleSelect = (id: string): void => {
    setSelectedId(id);
    const found = pairs.find((p) => p.id === id);
    if (found) onChangeSelected?.(found);
  };

  const openEdit = (pair: CharacterPair): void => {
    setEditing({
      id: pair.id,
      roles: pair.roles.map((r) => ({ name: r.name, desc: r.description })),
    });
  };

  const applyEdit = (): void => {
    if (!editing) return;
    setPairs((prev) =>
      prev.map((p) =>
        p.id === editing.id
          ? {
              ...p,
              roles: p.roles.map((r, idx) => ({
                ...r,
                name: editing.roles[idx]?.name ?? r.name,
                description: editing.roles[idx]?.desc ?? r.description,
              })),
            }
          : p
      )
    );
    setEditing(null);
  };

  const handleDelete = (pairId: string): void => {
    setPairs((prev) => prev.filter((p) => p.id !== pairId));
    if (selectedId === pairId) {
      const next = pairs.find((p) => p.id !== pairId)?.id;
      setSelectedId(next);
      const found = pairs.find((p) => p.id === next);
      if (found) onChangeSelected?.(found);
    }
    onDeletePair?.(pairId);
  };

  const filteredPairs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pairs;
    return pairs.filter((p) => p.roles.some((r) => r.name.toLowerCase().includes(q)));
  }, [pairs, search]);

  const selectedIndex = useMemo(() => {
    const idx = filteredPairs.findIndex((p) => p.id === selectedId);
    return idx >= 0 ? idx + 1 : 0;
  }, [filteredPairs, selectedId]);

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
        background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.06)} 0%, ${alpha(
          theme.palette.common.white,
          0.02
        )} 100%)`,
        backdropFilter: "blur(12px)",
        boxShadow: 2,
      }}
    >
      {/* Noise overlay */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <CardContent sx={{ position: "relative", zIndex: 2, p: { xs: 2.5, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
            mb: 3,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                Setup Phase
              </Box>
            </Box>
            <Typography
              component="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                color: "#fff",
                letterSpacing: "-0.02em",
                mb: 1,
                textShadow: "0 2px 6px rgba(0,0,0,0.35)",
              }}
            >
              Pair Selection
            </Typography>
            <Typography sx={{ fontSize: 13, color: alpha("#fff", 0.7), maxWidth: 520 }}>
              Initialize game deck protocols. Select{" "}
              <Box component="span" sx={{ color: "#fff", fontWeight: 800 }}>
                5 character pairs
              </Box>{" "}
              to balance the match algorithm.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: alpha("#fff", 0.5),
                  fontWeight: 800,
                }}
              >
                System Load
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: theme.palette.primary.main,
                  letterSpacing: 2,
                }}
              >
                {Math.min(5, Math.max(1, selectedIndex))} / 5
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                p: 1,
                borderRadius: 1,
                border: `1px solid ${alpha("#fff", 0.06)}`,
                backgroundColor: alpha("#121318", 0.95),
                position: "relative",
                boxShadow: `0 10px 24px ${alpha("#000", 0.5)}`,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.05), transparent)",
                  borderRadius: 1,
                  pointerEvents: "none",
                }}
              />
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.min(5, Math.max(1, selectedIndex));
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box
                    key={i}
                    sx={{
                      width: 48,
                      height: 12,
                      borderRadius: 0.5,
                      border: `1px solid ${filled ? alpha(theme.palette.primary.dark, 0.9) : alpha("#fff", 0.06)}`,
                      background: filled
                        ? `linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                        : "#08090C",
                      boxShadow: filled
                        ? `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 1px 0 rgba(255,255,255,0.3)`
                        : "inset 0 1px 2px rgba(255,255,255,0.06)",
                      transition: "all 300ms",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Search + menu */}
        <Box
          sx={{
            mt: 1,
            pt: 2,
            borderTop: `1px solid ${alpha("#fff", 0.06)}`,
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              flex: 1,
              maxWidth: 420,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: alpha("#0B0C15", 0.5),
              border: `1px solid ${alpha("#fff", 0.1)}`,
              px: 1.5,
              py: 0.5,
              "&:focus-within": {
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.15)}`,
              },
            }}
          >
            <SearchRoundedIcon sx={{ color: alpha("#fff", 0.5), mr: 1 }} fontSize="small" />
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search operational roles..."
              sx={{
                flex: 1,
                color: alpha("#fff", 0.85),
                fontSize: 14,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            />
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterAltRoundedIcon fontSize="small" />}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              borderColor: alpha("#fff", 0.12),
              color: alpha("#fff", 0.7),
              textTransform: "uppercase",
              letterSpacing: 1.2,
              "&:hover": { borderColor: alpha("#fff", 0.2), color: "#fff", backgroundColor: alpha("#fff", 0.06) },
            }}
          >
            Filter
          </Button>
          <IconButton size="small" onClick={handleOpenMenu} sx={{ ml: "auto" }}>
            <ListOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={menuEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { minWidth: 220, p: 1 } } }}
          >
            <MenuItem
              disableRipple
              sx={{ ":hover": { backgroundColor: "transparent" }, cursor: "default" }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                顯示內容
              </Typography>
            </MenuItem>
            <FormGroup sx={{ px: 2, py: 0.5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={viewOptions.title}
                    onChange={(e) => setViewOptions((v) => ({ ...v, title: e.target.checked }))}
                  />
                }
                label="標題"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={viewOptions.desc}
                    onChange={(e) => setViewOptions((v) => ({ ...v, desc: e.target.checked }))}
                  />
                }
                label="描述"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={viewOptions.pic}
                    onChange={(e) => setViewOptions((v) => ({ ...v, pic: e.target.checked }))}
                  />
                }
                label="圖片"
              />
            </FormGroup>
          </Menu>
        </Box>

        {/* Grid */}
        <Box sx={{ maxHeight: 500, overflowY: "auto", pr: 1 }}>
          <Grid container spacing={3}>
            {filteredPairs.map((pair) => {
              const isSelected = pair.id === selectedId;
              return (
                <Grid item xs={12} md={6} lg={4} xl={3} key={pair.id}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 3,
                      transition: "transform 300ms, box-shadow 300ms, opacity 300ms",
                      transform: "translateY(0) scale(1)",
                      "&:hover": { transform: "translateY(-6px) scale(1.02)" },
                    }}
                  >
                    <Box
                      aria-hidden
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 3,
                        backgroundColor: alpha("#000", 0.6),
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${alpha("#fff", 0.06)}`,
                      }}
                    />
                    <Box sx={{ position: "relative", zIndex: 1, p: 1.5 }}>
                      <CharacterPairCard
                        pair={pair}
                        isSelected={isSelected}
                        onSelect={() => handleSelect(pair.id)}
                        onEdit={() => openEdit(pair)}
                        onDelete={() => handleDelete(pair.id)}
                        showTitle={viewOptions.title}
                        showDesc={viewOptions.desc}
                        showPic={viewOptions.pic}
                      />
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Edit dialog */}
        <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
          <DialogTitle>編輯角色組合</DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: 2 }}>
            {editing?.roles.map((r, idx) => (
              <Box key={idx} sx={{ display: "grid", gap: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  角色 {idx + 1}
                </Typography>
                <TextField
                  label="角色名稱"
                  value={r.name}
                  onChange={(e) =>
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.roles];
                      next[idx] = { ...next[idx], name: e.target.value };
                      return { ...prev, roles: next };
                    })
                  }
                />
                <TextField
                  label="描述"
                  value={r.desc}
                  onChange={(e) =>
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.roles];
                      next[idx] = { ...next[idx], desc: e.target.value };
                      return { ...prev, roles: next };
                    })
                  }
                  multiline
                  minRows={2}
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(null)}>取消</Button>
            <Button variant="contained" onClick={applyEdit}>
              儲存
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

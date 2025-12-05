import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
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

export default function SelectCharacterCombination(props: SelectCharacterCombinationProps): JSX.Element {
  const { pairs: pairsProp, defaultSelectedId, onChangeSelected, onDeletePair } = props;
  const theme = useTheme();
  const derivedPairs = useMemo<CharacterPair[]>(() => {
    if (pairsProp) return pairsProp;
    const list = (characters as CharacterItem[]) as CharacterItem[];

    // 按照 pair 分組，並確保同一 pair 的角色集中在一起
    const byPair = new Map<string, Map<string, Role>>();
    for (const c of list) {
      const pairId = String(c.pair);
      const roleBucket = byPair.get(pairId) ?? new Map<string, Role>();
      const side: Role["side"] =
        c.color === "red" || c.color === "blue" || c.color === "grey" ? (c.color as Role["side"]) : "grey";
      const key = `${c.label ?? c.role}-${side}`;
      if (!roleBucket.has(key)) {
        roleBucket.set(key, { name: c.label ?? c.role, description: c.desc ?? "", side });
      }
      byPair.set(pairId, roleBucket);
    }

    // 依顏色順序（紅、藍、灰）排列，同一 pair 最後輸出一筆
    const colorOrder: Record<Role["side"], number> = { red: 0, blue: 1, grey: 2 };

    const result: CharacterPair[] = Array.from(byPair.entries()).map(([pairId, roleMap]) => {
      const roles = Array.from(roleMap.values()).sort((a, b) => colorOrder[a.side] - colorOrder[b.side]);
      return { id: pairId, roles };
    });

    // 依 pair 數值排序，確保顯示有序
    result.sort((a, b) => Number(a.id) - Number(b.id));

    return result;
  }, [pairsProp]);

  const [pairs, setPairs] = useState<CharacterPair[]>(derivedPairs);
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultSelectedId ?? derivedPairs[0]?.id);

  // Edit dialog state
  const [editing, setEditing] = useState<
    | {
        id: string;
        roles: { name: string; desc: string }[];
      }
    | null
  >(null);

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
    const found = pairs.find(p => p.id === id);
    if (found) onChangeSelected?.(found);
  };

  const openEdit = (pair: CharacterPair): void => {
    setEditing({
      id: pair.id,
      roles: pair.roles.map(r => ({ name: r.name, desc: r.description })),
    });
  };

  const applyEdit = (): void => {
    if (!editing) return;
    setPairs(prev =>
      prev.map(p =>
        p.id === editing.id
          ? { ...p, roles: p.roles.map((r, idx) => ({ ...r, name: editing.roles[idx]?.name ?? r.name, description: editing.roles[idx]?.desc ?? r.description })) }
          : p
      )
    );
    setEditing(null);
  };

  const handleDelete = (pairId: string): void => {
    setPairs(prev => prev.filter(p => p.id !== pairId));
    if (selectedId === pairId) {
      const next = pairs.find(p => p.id !== pairId)?.id;
      setSelectedId(next);
      const found = pairs.find(p => p.id === next);
      if (found) onChangeSelected?.(found);
    }
    onDeletePair?.(pairId);
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
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                挑選角色組合
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                挑選至多 maxPairs 組角色組合。
              </Typography>
            </Box>
            <IconButton size="small" sx={{ opacity: 0.9 }} onClick={handleOpenMenu} aria-label="顯示選項">
              <ListOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Menu
            anchorEl={menuEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { minWidth: 220, p: 1 } } }}
          >
            <MenuItem disableRipple sx={{ ":hover": { backgroundColor: "transparent" }, cursor: "default" }}>
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
        <Box sx={{ maxHeight: 500, overflowY: "auto", pr: 1 }}>
          <Grid container spacing={2}>
            {pairs.map((pair) => {
              const isSelected = pair.id === selectedId;
              return (
                <Grid item xs={6} md={4} lg={3} xl={2} key={pair.id}>
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
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
          <DialogTitle>編輯角色組合</DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: 2 }}>
            {editing?.roles.map((r, idx) => (
              <Box key={idx} sx={{ display: "grid", gap: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary">角色 {idx + 1}</Typography>
                <TextField
                  label="角色名稱"
                  value={r.name}
                  onChange={(e) => setEditing(prev => {
                    if (!prev) return prev;
                    const next = [...prev.roles];
                    next[idx] = { ...next[idx], name: e.target.value };
                    return { ...prev, roles: next };
                  })}
                />
                <TextField
                  label="描述"
                  value={r.desc}
                  onChange={(e) => setEditing(prev => {
                    if (!prev) return prev;
                    const next = [...prev.roles];
                    next[idx] = { ...next[idx], desc: e.target.value };
                    return { ...prev, roles: next };
                  })}
                  multiline
                  minRows={2}
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(null)}>取消</Button>
            <Button variant="contained" onClick={applyEdit}>儲存</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}



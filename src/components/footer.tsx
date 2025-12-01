import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Divider, IconButton, Link as MuiLink, Stack, Typography } from "@mui/material";

export default function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            useFlexGap
            flexWrap="wrap"
          >
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ "&:hover": { color: "text.primary" } }}
            >
              About Us
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ "&:hover": { color: "text.primary" } }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ "&:hover": { color: "text.primary" } }}
            >
              Contact
            </MuiLink>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.1)" }}
            />

            <Stack direction="row" spacing={1.5}>
              <IconButton
                aria-label="Facebook"
                color="inherit"
                size="small"
                sx={{ color: "text.secondary", "&:hover": { color: "common.white" } }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="inherit"
                size="small"
                sx={{ color: "text.secondary", "&:hover": { color: "common.white" } }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: { xs: 1, md: 0 }, textAlign: { xs: "center", md: "right" } }}
          >
            © 2024 Bomb Squad Inc. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
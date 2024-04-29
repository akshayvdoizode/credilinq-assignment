import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import logo from "../assets/images/logo.svg";
import { useTheme } from "@mui/material/styles";

function ResponsiveAppBar() {
  const theme = useTheme();
  const paddingHorizontal = theme.spacing(12);
  const paddingVertical = theme.spacing(2);
  return (
    <AppBar
      position="static"
      sx={{
        height: "12vh",
        paddingRight: paddingHorizontal,
        paddingLeft: paddingHorizontal,
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(18,18,105,1) 75%, rgba(255,0,219,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Typography
            textAlign="center"
            variant="body1"
            sx={{
              m: 0,
              lineHeight: 1.5,
              color: "white",
              fontWeight: 300,
              minWidth: 600,
              fontSize: 28,
            }}
          >
            SME HealthCheck - Get Started
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

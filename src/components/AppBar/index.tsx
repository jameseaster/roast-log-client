// Imports
import React from "react";
import { style } from "./style";
import { IAppBarProps } from "./types";
import constants from "utils/constants";
import HamburgerButton from "components/HamburgerButton";
// MUI
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar as AppBarMUI } from "@mui/material";
// MUI Icons
import CoffeeIcon from "@mui/icons-material/LocalCafeTwoTone";

/**
 * Top Bar is the menu and navigation bar
 */
const AppBar: React.FC<IAppBarProps> = ({ user }) => {
  return (
    <AppBarMUI position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <CoffeeIcon sx={style.logoIcon} />
          <Typography noWrap variant="h5" sx={style.logoTitle}>
            {constants.appbar.title}
          </Typography>
          {/* Authenticated: Right Avatar Menu */}
          {user && <HamburgerButton />}
        </Toolbar>
      </Container>
    </AppBarMUI>
  );
};

export default AppBar;

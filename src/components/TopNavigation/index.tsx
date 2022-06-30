// Imports
import React from "react";
import AvatarMenu from "../AvatarMenu";
import HamburgerMenu from "../HamburgerMenu";
// MUI
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CoffeeIcon from "@mui/icons-material/LocalCafeTwoTone";

// Constants
const menuOptions = ["Profile", "Logout"];
const pages = ["Dashboard", "Add Roast", "History"];

// styles
const style = {
  leftCoffeeIcon: { mr: 1, display: { xs: "none", md: "flex" } },
  leftLogo: {
    mr: 2,
    fontWeight: 700,
    color: "inherit",
    fontFamily: "monospace",
    letterSpacing: ".3rem",
    textDecoration: "none",
    display: { xs: "none", md: "flex" },
  },
  midCoffeeIcon: { display: { xs: "flex", md: "none" }, mr: 1 },
  midLogo: {
    mr: 2,
    flexGrow: 1,
    fontWeight: 700,
    color: "inherit",
    fontFamily: "monospace",
    letterSpacing: ".3rem",
    textDecoration: "none",
    display: { xs: "flex", md: "none" },
  },
  midPageLinks: { flexGrow: 1, display: { xs: "none", md: "flex" } },
  midPageBtns: { my: 2, color: "white", display: "block" },
};
/**
 * Top Bar is the menu and navigation bar
 */
const TopNavigation = () => {
  // Local State
  const [ancElNav, setAncElNav] = React.useState<null | HTMLElement>(null);
  const [ancElUser, setAncElUser] = React.useState<null | HTMLElement>(null);

  // Opens left menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAncElNav(event.currentTarget);
  };

  // Closes left menu
  const handleCloseNavMenu = () => {
    setAncElNav(null);
  };

  // Opens right menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAncElUser(event.currentTarget);
  };

  // Closes right menu
  const handleCloseUserMenu = () => {
    setAncElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Logo */}
          <CoffeeIcon sx={style.leftCoffeeIcon} />
          <Typography noWrap variant="h6" sx={style.leftLogo}>
            ROAST LOG
          </Typography>

          {/* Left Hamburger Menu */}
          <HamburgerMenu
            pages={pages}
            ancElNav={ancElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />

          {/* Middle Logo for xs screens */}
          <CoffeeIcon sx={style.midCoffeeIcon} />
          <Typography noWrap variant="h5" sx={style.midLogo}>
            ROAST LOG
          </Typography>

          {/* Middle pages links */}
          <Box sx={style.midPageLinks}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={style.midPageBtns}
                onClick={handleCloseNavMenu}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right Avatar Menu */}
          <AvatarMenu
            ancElUser={ancElUser}
            menuOptions={menuOptions}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavigation;

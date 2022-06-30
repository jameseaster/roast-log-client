// Imports
import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// Types
export interface IHamburgerMenuProps {
  pages: string[];
  ancElNav: null | HTMLElement;
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const style = {
  leftBurger: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
  },
};

/**
 * HamburgerMenu
 */
const HamburgerMenu: React.FC<IHamburgerMenuProps> = ({
  pages,
  ancElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) => {
  return (
    <Box sx={style.leftBurger}>
      <IconButton
        size="large"
        color="inherit"
        aria-haspopup="true"
        aria-controls="menu-appbar"
        onClick={handleOpenNavMenu}
        aria-label="left hamburger menu"
      >
        <MenuIcon />
      </IconButton>
      {/* Pages Dropdown */}
      <Menu
        keepMounted
        id="menu-appbar"
        anchorEl={ancElNav}
        open={Boolean(ancElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;

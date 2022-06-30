// Imports
import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// Types
interface IAvatarProps {
  menuOptions: string[];
  ancElUser: null | HTMLElement;
  handleCloseUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Avatar Menu - used in the top right of the TopNavigation
 */
const AvatarMenu: React.FC<IAvatarProps> = ({
  ancElUser,
  menuOptions,
  handleCloseUserMenu,
  handleOpenUserMenu,
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src="/broken-image.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        keepMounted
        id="menu-appbar"
        sx={{ mt: "45px" }}
        anchorEl={ancElUser}
        open={Boolean(ancElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuOptions.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarMenu;

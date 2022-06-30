// Imports
import React, { KeyboardEvent, MouseEvent } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useAuthContext } from "../../context/AuthProvider";
// MUI
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Drawer as DrawerMUI, Typography } from "@mui/material";
// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";

// Types
interface IDrawer {
  open: boolean;
  toggleDrawer: (state: boolean) => (event: KeyboardEvent | MouseEvent) => void;
}

// Style
const style = {
  username: {
    display: "flex",
    height: "70px",
    alignItems: "center",
    justifyContent: "center",
  },
};

/**
 * Drawer offers user menu options
 */
const Drawer: React.FC<IDrawer> = ({ open, toggleDrawer }) => {
  // Global state
  const { user } = useAuthContext();

  // Hooks
  const { signout } = useAuthenticate();

  // Drawer Menu Options and event handlers
  const menuOptions = [
    {
      id: 1,
      text: "Profile",
      renderIcon: () => <InboxIcon />,
      handleClick: () => alert("Edit profile modal?"),
    },
    {
      id: 2,
      text: "Sign Out",
      renderIcon: () => <MailIcon />,
      handleClick: () => signout({}),
    },
  ];

  return (
    <DrawerMUI open={open} anchor={"right"} onClose={toggleDrawer(false)}>
      <Box
        role="presentation"
        sx={{ minWidth: 250 }}
        onClick={toggleDrawer(!open)}
        onKeyDown={toggleDrawer(!open)}
      >
        <Box sx={style.username}>
          <Typography variant="h6">{user}</Typography>
        </Box>
        <Divider />
        <List>
          {menuOptions.map(({ id, text, renderIcon, handleClick }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>{renderIcon()}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerMUI>
  );
};

export default Drawer;

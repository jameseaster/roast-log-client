// Imports
import { style } from "./style";
import Drawer from "components/Drawer";
import { IHamBtnProps } from "./types";
import React, { KeyboardEvent, MouseEvent } from "react";
// MUI
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// MUI Icons
import Menu from "@mui/icons-material/Menu";

/**
 * Hamburger Menu - used in the top right of the AppBar
 */
const HamburgerButton: React.FC<IHamBtnProps> = () => {
  // Local State
  const [open, setOpen] = React.useState<boolean>(false);

  // Toggles drawer visibility
  const toggleDrawer =
    (state: boolean) => (event: KeyboardEvent | MouseEvent) => {
      const condition1 = (event as KeyboardEvent).key === "Tab";
      const condition2 = (event as KeyboardEvent).key === "Shift";
      if (event.type === "keydown" && (condition1 || condition2)) return;
      setOpen(state);
    };

  return (
    <>
      <Tooltip title="User Menu Options">
        <Button sx={style.hamButton} onClick={toggleDrawer(!open)}>
          <Menu />
        </Button>
      </Tooltip>
      <Drawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default HamburgerButton;

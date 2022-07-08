// Imports
import React from "react";
// MUI
import { Backdrop as BackdropMUI } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Backdrop - prevents user action while promise is settling
 */
const Backdrop: React.FC<{ open: boolean }> = ({ open }) => (
  <BackdropMUI
    open={open}
    // TODO: CHANGE TO THEME'S WHITE
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" />
  </BackdropMUI>
);

export default Backdrop;

// Imports
import React from "react";
import { IDialogProps } from "./types";
// MUI
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog as DialogMUI } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

/**
 * Reusable dialog window
 */
const Dialog: React.FC<IDialogProps> = ({
  open,
  title,
  children,
  cancelText,
  confirmText,
  cancelColor,
  confirmColor,
  handleCancel,
  cancelVariant,
  handleConfirm,
  confirmVariant,
}) => {
  return (
    <DialogMUI open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        <Button
          onClick={handleCancel}
          color={cancelColor || "primary"}
          variant={cancelVariant || "outlined"}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          color={confirmColor || "primary"}
          variant={confirmVariant || "contained"}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </DialogMUI>
  );
};

export default Dialog;

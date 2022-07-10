// Imports
import React from "react";
import { style } from "./style";
import Dialog from "components/Dialog";
import useLogForm from "hooks/useLogForm";
import Backdrop from "components/Backdrop";
import { ITableDeleteDialogProps } from "./types";
//MUI
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

/**
 * TableDeleteDialog - Dialog to warn the user when deleting a roast log
 */
const TableDeleteDialog: React.FC<ITableDeleteDialogProps> = ({
  row,
  open,
  handleClose,
}) => {
  // Hooks
  const { loadingDeleteReq, sendDeleteRoastRequest } = useLogForm(handleClose);

  // Called when delete action is confirmed
  const handleDeleteRoast = () => {
    sendDeleteRoastRequest(Number(row?.id));
  };

  return (
    <>
      <Backdrop open={loadingDeleteReq} />
      <Dialog
        open={open}
        cancelText={"cancel"}
        confirmColor={"error"}
        cancelColor={"primary"}
        handleCancel={handleClose}
        title={"Delete Roast Log"}
        cancelVariant={"outlined"}
        confirmVariant={"contained"}
        confirmText={"Confirm DELETE"}
        handleConfirm={handleDeleteRoast}
      >
        <Box sx={style.dialogBox}>
          <Typography>
            Are you sure you want to permanently delete this roast log?
          </Typography>
          <Divider sx={style.divider} />
          <Typography>
            <i>This can not be undone.</i>
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default TableDeleteDialog;

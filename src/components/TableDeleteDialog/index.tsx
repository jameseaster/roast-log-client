// Imports
import React from "react";
import { style } from "./style";
import Dialog from "components/Dialog";
import useLogForm from "hooks/useLogForm";
import { useSelector } from "react-redux";
import Backdrop from "components/Backdrop";
import { ITableDeleteDialogProps } from "./types";
import { getRoastsState } from "providers/redux/slices/roasts";
import useDeleteRoastStatus from "hooks/useDeleteRoastStatus";
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
  // Global State
  const { deleteRoastStatus } = useSelector(getRoastsState);

  // Log form function
  const { sendDeleteRoastRequest } = useLogForm();

  // Creates snack when deleteRoastStatus changes
  useDeleteRoastStatus(handleClose);

  // Called when delete action is confirmed
  const handleDeleteRoast = () => {
    sendDeleteRoastRequest(Number(row?.id));
  };

  return (
    <>
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
        <>
          <Backdrop open={deleteRoastStatus !== null} />
          <Box sx={style.dialogBox}>
            <Typography>
              Are you sure you want to permanently delete this roast log?
            </Typography>
            <Divider sx={style.divider} />
            <Typography>
              <i>This can not be undone.</i>
            </Typography>
          </Box>
        </>
      </Dialog>
    </>
  );
};

export default TableDeleteDialog;

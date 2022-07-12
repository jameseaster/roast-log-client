// Imports
import { style } from "./style";
import Dialog from "components/Dialog";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LogForm from "components/LogForm";
import useLogForm from "hooks/useLogForm";
import { ITableEditDialogProps } from "./types";
import { getAppState } from "state/redux/slices/app";
import usePatchRoastStatus from "hooks/usePatchRoastStatus";
// MUI
import Box from "@mui/system/Box";

/**
 * TableEditDialog - provides a dialog for the user to edit a roast log
 */
const TableEditDialog: React.FC<ITableEditDialogProps> = ({
  open,
  selectedRow,
  handleClose,
}) => {
  // Global State
  const { updateRoastStatus } = useSelector(getAppState);

  // Patch request status updates
  usePatchRoastStatus(handleClose);

  // Form Values & Functions
  const {
    form,
    errors,
    updateForm,
    updateEditForm,
    handleSubmitEdit,
    formIsIncomplete,
  } = useLogForm();

  // Submit edits
  const confirmEdits = () => selectedRow && handleSubmitEdit(selectedRow.id);

  // Updates the edit form with the selectedRow's data
  useEffect(() => {
    if (selectedRow) updateEditForm(selectedRow);
  }, [selectedRow, updateEditForm]);

  return (
    <Dialog
      open={open}
      cancelText={"Cancel"}
      confirmText={"Update"}
      cancelVariant={"text"}
      title={"Edit Roast Log"}
      handleCancel={handleClose}
      handleConfirm={confirmEdits}
    >
      <Box sx={style.editWindow}>
        <LogForm
          form={form}
          errors={errors}
          hideSubmitButton
          updateForm={updateForm}
          formIsIncomplete={formIsIncomplete}
          loading={updateRoastStatus !== null}
        />
      </Box>
    </Dialog>
  );
};

export default TableEditDialog;

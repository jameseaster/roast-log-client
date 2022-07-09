// Imports
import React, { useEffect } from "react";
import { style } from "./style";
import Dialog from "components/Dialog";
import LogForm from "components/LogForm";
import useLogForm from "hooks/useLogForm";
import { ITableEditDialogProps } from "./types";
//MUI
import Box from "@mui/system/Box";

/**
 * TableEditDialog
 */
const TableEditDialog: React.FC<ITableEditDialogProps> = ({
  open,
  selectedRow,
  handleClose,
}) => {
  // Hooks
  const {
    form,
    errors,
    updateForm,
    updateEditForm,
    loadingPatchReq,
    handleSubmitEdit,
    formIsIncomplete,
  } = useLogForm(handleClose);

  // Submit edits and close dialog
  const confirmEdits = () => {
    if (selectedRow) handleSubmitEdit(selectedRow.id);
  };

  // Updates the edit form with the selectedRow's data
  useEffect(() => {
    if (selectedRow) updateEditForm(selectedRow);
  }, [selectedRow, updateEditForm]);

  return (
    <Dialog
      open={open}
      cancelText={"Close"}
      confirmText={"Update"}
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
          loading={loadingPatchReq}
          formIsIncomplete={formIsIncomplete}
        />
      </Box>
    </Dialog>
  );
};

export default TableEditDialog;

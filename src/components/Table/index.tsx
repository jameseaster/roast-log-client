// Imports
import { style } from "./style";
import { columns } from "./config";
import React, { useState } from "react";
import { ITableProps, IRoast } from "./types";
import TableEditDialog from "components/TableEditDialog";
import TableDeleteDialog from "components/TableDeleteDialog";
//MUI
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";

/**
 * Table - Basic MUI data grid to display user's roasts
 */
const Table: React.FC<ITableProps> = ({ rows }) => {
  // Local State
  const [pageSize, setPageSize] = useState<number>(20);
  const [selectedRow, setSelectedRow] = useState<IRoast | undefined>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  // Opens edit dialog with row selected
  const handleEditClick = () => {
    selectRow();
    setOpenEditDialog(true);
  };

  // Opens delete dialog with row selected
  const handleDeleteClick = () => {
    selectRow();
    setOpenDeleteDialog(true);
  };

  // Uses the selectionModel to find the row and assign it to selectedRow
  const selectRow = () => {
    const newSelection = rows.find((r) => r.id === Number(selectionModel));
    setSelectedRow(newSelection);
  };

  // Clears row selection closes dialogs
  const handleClose = () => {
    clearSelection();
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  // Clears row selection
  const clearSelection = () => {
    setSelectedRow(undefined);
    setSelectionModel([]);
  };

  // Adds an index value for each roast
  const addIndexValues = (row: IRoast, i: number, c: IRoast[]) => ({
    ...row,
    index: c.length - i,
  });

  return (
    <>
      <Box sx={style.buttonBox}>
        <Button
          color="error"
          variant="outlined"
          sx={style.deleteButton}
          onClick={handleDeleteClick}
          disabled={!selectionModel.length}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={style.editButton}
          onClick={handleEditClick}
          disabled={!selectionModel.length}
        >
          Edit
        </Button>
      </Box>
      <DataGrid
        columns={columns}
        pageSize={pageSize}
        rows={rows.map(addIndexValues)}
        selectionModel={selectionModel}
        rowsPerPageOptions={[10, 20, 50]}
        onSelectionModelChange={(id) => setSelectionModel(id)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
      <TableEditDialog
        open={openEditDialog}
        selectedRow={selectedRow}
        handleClose={handleClose}
      />
      <TableDeleteDialog
        row={selectedRow}
        open={openDeleteDialog}
        handleClose={handleClose}
      />
    </>
  );
};

export default Table;

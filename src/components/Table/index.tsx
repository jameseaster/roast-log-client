// Imports
import { style } from "./style";
import { columns } from "./config";
import { ITableProps } from "./types";
import React, { useState } from "react";
import { IRoast } from "hooks/useFetchLastRoast";
import TableEditDialog from "components/TableEditDialog";
//MUI
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";

/**
 * Table - Basic MUI data grid to display user's roasts
 */
const Table: React.FC<ITableProps> = ({ rows }) => {
  // Local State
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [selectedRow, setSelectedRow] = React.useState<IRoast | undefined>();
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  // Logs selected row to the console
  const handleClick = () => {
    const newSelection = rows.find((r) => r.id === Number(selectionModel));
    setSelectedRow(newSelection);
    setOpenEditDialog(true);
  };

  // Clears row selection
  const clearSelection = () => {
    setSelectedRow(undefined);
    setSelectionModel([]);
  };

  // Clears row selection & closes dialog
  const handleClose = () => {
    clearSelection();
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableEditDialog
        open={openEditDialog}
        selectedRow={selectedRow}
        handleClose={handleClose}
      />
      <Box sx={style.buttonBox}>
        <Button
          variant="contained"
          sx={style.editButton}
          onClick={handleClick}
          disabled={!selectionModel.length}
        >
          Edit Selected
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        selectionModel={selectionModel}
        rowsPerPageOptions={[10, 20, 50]}
        onSelectionModelChange={(id) => setSelectionModel(id)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </>
  );
};

export default Table;

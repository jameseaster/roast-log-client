// Imports
import { columns } from "./config";
import { ITableProps } from "./types";
import React, { useState } from "react";
//MUI
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";

/**
 * Table - Basic MUI data grid to display user's roasts
 */
const Table: React.FC<ITableProps> = ({ rows }) => {
  // Local State
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  // Logs selected row to the console
  // TODO: Set up edit and delete for rows
  const handleClick = () => {
    const newSelection = rows.find((r) => r.id === Number(selectionModel));
    console.log(newSelection);
    setSelectionModel([]);
  };

  return (
    <>
      <Box style={{ textAlign: "right" }}>
        <Button
          sx={{ mb: 1 }}
          variant="contained"
          onClick={handleClick}
          disabled={!selectionModel.length}
        >
          Edit Selected
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        pageSize={10}
        columns={columns}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        rowsPerPageOptions={[10]}
      />
    </>
  );
};

export default Table;

// Imports
import { columns } from "./config";
import { ITableProps } from "./types";
import { DataGrid } from "@mui/x-data-grid";

/**
 * Table - Basic MUI data grid to display user's roasts
 */
export default function Table({ rows }: ITableProps) {
  return (
    <DataGrid
      rows={rows}
      pageSize={5}
      columns={columns}
      checkboxSelection
      disableSelectionOnClick
      rowsPerPageOptions={[5]}
    />
  );
}

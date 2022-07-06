// Imports
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { formatDateString, formatTime, formatRoastTimes } from "utils/helpers";

// Table column configurations
export const columns: GridColDef[] = [
  {
    field: "roast_number",
    headerName: "#",
    width: 50,
  },
  {
    field: "coffee_origin",
    headerName: "Origin",
    width: 300,
  },
  {
    align: "center",
    field: "date",
    headerName: "Date",
    valueGetter: ({ row }: GridValueGetterParams) =>
      `${formatDateString(row.date)}`,
  },
  {
    align: "center",
    field: "time",
    headerName: "Time",
    valueGetter: ({ row }: GridValueGetterParams) => `${formatTime(row.time)}`,
  },
  {
    align: "center",
    field: "green_weight",
    headerName: "Green",
    valueGetter: ({ row }: GridValueGetterParams) => `${row.green_weight} g`,
  },
  {
    align: "center",
    field: "roasted_weight",
    headerName: "Roasted",
    valueGetter: ({ row }: GridValueGetterParams) => `${row.roasted_weight} g`,
  },
  {
    align: "center",
    field: "percentage",
    headerName: "Loss %",
    description: "Percentage lossed from green to roasted weight.",
    valueGetter: ({ row }: GridValueGetterParams) =>
      `${(1 - row.roasted_weight / row.green_weight) * 100}`,
  },
  {
    align: "center",
    field: "first_crack",
    headerName: "First Crack",
    valueGetter: ({ row }: GridValueGetterParams) =>
      `${formatRoastTimes(row.first_crack)}`,
  },
  {
    align: "center",
    field: "cool_down",
    headerName: "Cool Down",
    valueGetter: ({ row }: GridValueGetterParams) =>
      `${formatRoastTimes(row.cool_down)}`,
  },
  {
    align: "center",
    field: "vac_to_250",
    headerName: "Vac to 250°",
    valueGetter: ({ row }: GridValueGetterParams) => `${row.vac_to_250 > 0}`,
  },
];

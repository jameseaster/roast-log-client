import { IRoast } from "hooks/useFetchLastRoast";

export interface ITableEditDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  selectedRow: IRoast | undefined;
}

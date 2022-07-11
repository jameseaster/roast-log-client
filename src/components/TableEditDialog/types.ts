import { IRoast } from "types/app";

export interface ITableEditDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  selectedRow: IRoast | undefined;
}

// Types
import { IRoast } from "types/app";

export interface ITableDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  row: IRoast | undefined;
}

// Types
import { IRoast } from "components/Table/types";

export interface ITableDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  row: IRoast | undefined;
}

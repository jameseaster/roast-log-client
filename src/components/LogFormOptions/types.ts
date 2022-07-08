// Imports
import { Dispatch, SetStateAction } from "react";

export interface ILogFormOptionsProps {
  openOptions: boolean;
  geneCafeTime: boolean;
  handleImportData: VoidFunction;
  setOpenOptions: Dispatch<SetStateAction<boolean>>;
  setGeneCafeTime: Dispatch<SetStateAction<boolean>>;
}

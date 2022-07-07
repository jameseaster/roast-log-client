// Imports
import { Dispatch, SetStateAction } from "react";

export interface ILogFormOptionsProps {
  width?: number;
  importData: boolean;
  openOptions: boolean;
  geneCafeTime: boolean;
  setImportData: Dispatch<SetStateAction<boolean>>;
  setOpenOptions: Dispatch<SetStateAction<boolean>>;
  setGeneCafeTime: Dispatch<SetStateAction<boolean>>;
}

// Imports
import { Dispatch, SetStateAction } from "react";

export interface IDropdownSelectProps {
  value: string;
  label: string;
  width: number;
  options: string[];
  setValue: Dispatch<SetStateAction<string>>;
}

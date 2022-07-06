import { Dispatch, SetStateAction } from "react";

export interface IAutoCompleteProps {
  label: string;
  width?: number;
  options: string[];
  optionLimit?: number;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
}

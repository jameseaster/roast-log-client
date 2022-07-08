// Imports
import { Dispatch, SetStateAction } from "react";

export interface INumberInputProps {
  max: number;
  value: string;
  label: string;
  error: boolean;
  width?: number;
  intOnly?: boolean;
  adornment: string;
  placeholder?: string;
  adornmentPosition: "end" | "start";
  setValue: Dispatch<SetStateAction<string>>;
}

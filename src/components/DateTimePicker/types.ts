// Imports
import { Dispatch, SetStateAction } from "react";

export interface IDateTimeProps {
  errors: boolean[];
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
}

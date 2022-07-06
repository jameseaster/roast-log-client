// Imports
import { Dispatch, SetStateAction } from "react";

export interface IDateTimeProps {
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
}

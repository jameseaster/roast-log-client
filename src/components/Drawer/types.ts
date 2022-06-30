// Imports
import { KeyboardEvent, MouseEvent } from "react";

export interface IDrawer {
  open: boolean;
  toggleDrawer: (state: boolean) => (event: KeyboardEvent | MouseEvent) => void;
}

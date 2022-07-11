import { ToggleBtnThemeColorMUI } from "types/app";

export interface IToggleButtonProps {
  label: string;
  width?: number;
  selected: boolean;
  handleChange: VoidFunction;
  color: ToggleBtnThemeColorMUI;
}

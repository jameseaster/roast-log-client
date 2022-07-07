export interface IToggleButtonProps {
  label: string;
  width?: number;
  selected: boolean;
  handleChange: VoidFunction;
  color:
    | "standard"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

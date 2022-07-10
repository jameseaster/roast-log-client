export interface IDialogProps {
  open: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  handleCancel: VoidFunction;
  handleConfirm: VoidFunction;
  cancelColor?: ButtonThemeColorMUI;
  confirmColor?: ButtonThemeColorMUI;
  children: JSX.Element | JSX.Element[];
  cancelVariant?: ButtonThemeVariantMUI;
  confirmVariant?: ButtonThemeVariantMUI;
}

export type ButtonThemeVariantMUI =
  | "text"
  | "outlined"
  | "contained"
  | undefined;

export type ButtonThemeColorMUI =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

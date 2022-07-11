import { ButtonThemeVariantMUI, ButtonThemeColorMUI } from "types/app";

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

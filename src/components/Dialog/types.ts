export interface IDialogProps {
  open: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  handleCancel: VoidFunction;
  handleConfirm: VoidFunction;
  children: JSX.Element | JSX.Element[];
}

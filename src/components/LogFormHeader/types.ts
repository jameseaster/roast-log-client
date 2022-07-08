import { IFormState } from "hooks/useLogForm";

export interface ILogFormHeaderProps {
  form: IFormState;
  clearForm: VoidFunction;
  handleImportData: VoidFunction;
}

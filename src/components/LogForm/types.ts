import { IFormState, IErrorState } from "types/app";

export interface ILogFormProps {
  form: IFormState;
  loading: boolean;
  errors: IErrorState;
  submitForm?: VoidFunction;
  formIsIncomplete: boolean;
  hideSubmitButton?: boolean;
  updateForm: (key: keyof IFormState) => (value: any) => void;
}

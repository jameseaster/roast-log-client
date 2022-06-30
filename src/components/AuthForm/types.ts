export interface IAuthFormProps {
  title: string;
  submitText: string;
  type: "signin" | "register";
  errors: { email: boolean; password: boolean; password2: boolean };
  handleSubmit: (props: IHandleSubmit) => Promise<void>;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
      password2: boolean;
    }>
  >;
}

export interface IHandleSubmit {
  email: string;
  password: string;
  password2: string;
  onSuccess: () => void;
  onFailure: () => void;
}

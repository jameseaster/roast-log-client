export interface ISignin {
  email: string;
  password: string;
  onSuccess?: VoidFunction;
  onFailure?: (err: any) => void;
}

export interface ISignout {
  onSuccess?: VoidFunction;
  onFailure?: (err: any) => void;
}

export interface IRegister {
  email: string;
  password: string;
  password2: string;
  onSuccess?: VoidFunction;
  onFailure?: (err: any) => void;
}

export interface IAuthContext {
  user: string;
  sendSigninRequest: (props: ISignin) => Promise<void>;
  sendSignoutRequest: (props: ISignout) => Promise<void>;
  sendRegisterRequest: (props: IRegister) => Promise<void>;
}

export interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

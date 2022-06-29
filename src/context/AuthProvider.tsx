// Imports
import React, { useContext, createContext } from "react";
import API from "../api/axios";
import CONSTANTS from "../utils/constants";
import useSnacks from "../hooks/useSnacks";

// Types
interface ISignin {
  email: string;
  password: string;
  onFailure?: (err: any) => void;
  onSuccess?: VoidFunction;
}

// Types
export interface ISignout {
  onFailure?: (err: any) => void;
  onSuccess?: VoidFunction;
}

// Types
export interface ISignup {
  email: string;
  password: string;
  password2: string;
  onFailure?: (err: any) => void;
  onSuccess?: VoidFunction;
}

interface IAuthContext {
  user: string;
  sendSigninRequest: (props: ISignin) => Promise<void>;
  sendSignoutRequest: (props: ISignout) => Promise<void>;
  sendSignupRequest: (props: ISignup) => Promise<void>;
}
interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

// Auth Default Context
const AuthContext = createContext<IAuthContext>(null!);

// Create Auth Context
export const useAuthContext = () => useContext(AuthContext);

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  // State
  const [user, setUser] = React.useState<string>("");

  // See if user is logged in
  React.useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const response = await API.get(CONSTANTS.API_IS_LOGGED_IN);
        if (response.status === 200) setUser(response.data.email);
        else throw new Error("Not signed in");
      } catch (err) {
        setUser("");
      }
    };
    // Fetch logged in status
    isUserLoggedIn();
  }, []);

  // Hooks
  const { createSnack } = useSnacks();

  // Signs a user in
  const sendSigninRequest = async ({
    email,
    password,
    onFailure,
    onSuccess,
  }: ISignin) => {
    try {
      const url = CONSTANTS.API_LOGIN_URL;
      const body = JSON.stringify({ email, password });
      const response = await API.post(url, body);
      if (response.status === 200) {
        setUser(email);
        createSnack("Logged in", "success");
        onSuccess !== undefined && onSuccess();
      } else throw Error("Failed to sign in");
    } catch (err: any) {
      console.log(err);
      createSnack("Failed to sign in", "error");
      setUser("");
      onFailure !== undefined && onFailure(err);
    }
  };

  // Signs a user in
  const sendSignupRequest = async ({
    email,
    password,
    password2,
    onFailure,
    onSuccess,
  }: ISignup) => {
    try {
      const url = CONSTANTS.API_SIGNUP_URL;
      const body = JSON.stringify({ email, password, password2 });
      const response = await API.post(url, body);
      if (response.status === 201) {
        await sendSigninRequest({ email, password });
        setUser(email);
        createSnack("Signed up!", "success");
        onSuccess !== undefined && onSuccess();
      } else {
        throw Error("Failed to log in");
      }
    } catch (err: any) {
      console.log(err);
      createSnack("Failed create an account", "error");
      setUser("");
      onFailure !== undefined && onFailure(err);
    }
  };

  // Signs a user out
  const sendSignoutRequest = async ({ onSuccess, onFailure }: ISignout) => {
    try {
      const url = CONSTANTS.API_LOGOUT_URL;
      const body = JSON.stringify({});
      const response = await API.post(url, body);
      if (response.status === 200) {
        createSnack("Signed out", "success");
        setUser("");
        onSuccess !== undefined && onSuccess();
      } else throw Error("Failed to logout");
    } catch (err: any) {
      console.log(err);
      createSnack("Failed to sign out", "error");
      onFailure !== undefined && onFailure(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, sendSigninRequest, sendSignoutRequest, sendSignupRequest }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Imports
import React, { useState, useEffect } from "react";
import API from "../api/axios";
import constants from "../utils/constants";
import useSnacks from "../hooks/useSnacks";

// Types
interface ISignin {
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

interface IAuthContext {
  user: string;
  sendSigninRequest: (props: ISignin) => Promise<void>;
  sendSignoutRequest: (props: ISignout) => Promise<void>;
  sendRegisterRequest: (props: IRegister) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

// Auth Default Context
const AuthContext = React.createContext<IAuthContext>(null!);

// Create Auth Context
export const useAuthContext = () => React.useContext(AuthContext);

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  // State
  const [user, setUser] = useState<string>("");

  // See if user is signed in
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await API.get(constants.api.authenticated);
        if (response.status === 200) setUser(response.data.email);
        else throw new Error("Not signed in");
      } catch (err) {
        setUser("");
      }
    };
    // Fetch signed in status
    isAuthenticated();
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
      const url = constants.api.signin;
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

  // Sends a register user request
  const sendRegisterRequest = async ({
    email,
    password,
    password2,
    onFailure,
    onSuccess,
  }: IRegister) => {
    try {
      const url = constants.api.register;
      const body = JSON.stringify({ email, password, password2 });
      const response = await API.post(url, body);
      if (response.status === 201) {
        await sendSigninRequest({ email, password });
        setUser(email);
        createSnack("Registered account!", "success");
        onSuccess !== undefined && onSuccess();
      } else {
        throw Error("Failed to register account & sign in");
      }
    } catch (err: any) {
      console.log(err);
      createSnack("Failed to register account & sign in", "error");
      setUser("");
      onFailure !== undefined && onFailure(err);
    }
  };

  // Signs a user out
  const sendSignoutRequest = async ({ onSuccess, onFailure }: ISignout) => {
    try {
      const url = constants.api.signout;
      const body = JSON.stringify({});
      const response = await API.post(url, body);
      if (response.status === 200) {
        createSnack("Signed out", "success");
        setUser("");
        onSuccess !== undefined && onSuccess();
      } else throw Error("Failed to sign out");
    } catch (err: any) {
      console.log(err);
      createSnack("Failed to sign out", "error");
      onFailure !== undefined && onFailure(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sendSigninRequest,
        sendSignoutRequest,
        sendRegisterRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

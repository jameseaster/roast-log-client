// Imports
import API from "api/axios";
import constants from "utils/constants";
import useSnacks from "hooks/useSnacks";
import { AuthContext } from "./context";
import { useState, useEffect } from "react";
import {
  ISignin,
  ISignout,
  IRegister,
  IAuthProviderProps,
} from "../../types/auth";

// TODO: CONVERT TO UTILIZE REDUX API MIDDLEWARE //

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  // State
  const [user, setUser] = useState<string>("");

  // Hooks
  const { createSnack } = useSnacks();

  /**
   * Checks if user is signed in
   */
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

  /**
   * Sends a sign in request to server
   */
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

  /**
   * Sends a register request to server
   */
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

  /**
   * Sends a sign out request to server
   */
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

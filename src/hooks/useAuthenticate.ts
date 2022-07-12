// Imports
import { useState } from "react";
import { ISignout } from "types/auth";
import { useAuthContext } from "providers/auth/context";
import { IHandleSubmit } from "components/AuthForm/types";

/**
 * useAuthenticate - returns functions to validate auth requests
 */
const useAuthenticate = () => {
  // Global State
  const { sendSigninRequest, sendSignoutRequest, sendRegisterRequest } =
    useAuthContext();

  // Local State
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    password2: false,
  });

  // Handles sign in form submit
  const signin = async ({
    email,
    password,
    onFailure,
    onSuccess,
  }: IHandleSubmit) => {
    // Validate
    if (!email.length || !password.length) {
      const e = { email: !email.length, password: !password.length };
      return setErrors((errors) => ({ ...errors, ...e }));
    }
    await sendSigninRequest({
      email,
      password,
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  // Handles sign out form submit
  const signout = async ({ onFailure, onSuccess }: ISignout) => {
    await sendSignoutRequest({
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  // Handles register form submit
  const register = async ({
    email,
    password,
    password2,
    onFailure,
    onSuccess,
  }: IHandleSubmit) => {
    // Validate
    if (!email.length || !password.length || !password2.length) {
      return setErrors({
        email: !email.length,
        password: !password.length,
        password2: !password2.length,
      });
    }
    sendRegisterRequest({
      email,
      password,
      password2,
      onFailure,
      onSuccess,
    });
  };

  return { errors, setErrors, signin, register, signout };
};

export default useAuthenticate;

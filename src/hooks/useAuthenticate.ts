// Imports
import { useState } from "react";
import { IHandleSubmit } from "../components/AuthForm";
import { useAuthContext, ISignout } from "../context/AuthProvider";

/**
 * useAuthenticate
 * Returns functions to authenticate user
 */
const useAuthenticate = () => {
  // Global State
  const { sendSigninRequest, sendSignoutRequest, sendSignupRequest } =
    useAuthContext();

  // Local State
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    password2: false,
  });

  // Handles login form submit
  const signIn = async ({
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

  // Handles login form submit
  const signOut = async ({ onFailure, onSuccess }: ISignout) => {
    await sendSignoutRequest({
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  };

  // Handles login form submit
  const signUp = async ({
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
    sendSignupRequest({
      email,
      password,
      password2,
      onFailure,
      onSuccess,
    });
  };

  return { errors, setErrors, signIn, signUp, signOut };
};

export default useAuthenticate;

// Imports
import { useState } from "react";
import API from "../api/axios";
import useSnacks from "../hooks/useSnacks";
import CONSTANTS from "../utils/constants";
import { IHandleSubmit } from "../components/AuthForm";
import { useAuthContext } from "../context/AuthProvider";

/**
 * useAuthenticate
 * Returns functions to authenticate user
 */
const useAuthenticate = () => {
  // Global State
  const { setAuth } = useAuthContext();

  // Local State
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    password2: false,
  });

  // Hooks
  const { createSnack } = useSnacks();

  // Handles login form submit
  const signIn = async ({
    email,
    password,
    onFailure,
    onSuccess,
  }: IHandleSubmit) => {
    // Validate
    if (!email.length || !password.length) {
      return setErrors((errors) => ({
        ...errors,
        email: !email.length,
        password: !password.length,
      }));
    }
    try {
      const url = CONSTANTS.API_LOGIN_URL;
      const body = JSON.stringify({ email, password });
      const response = await API.post(url, body);
      console.log(JSON.stringify(response, null, 2));
      setAuth({ email, loggedIn: true });
      createSnack("Logged in", "success");
      onSuccess();
    } catch (err: any) {
      // TODO: Handle failed message for bad password
      setAuth({ email, loggedIn: false });
      createSnack(`Login failed: ${err?.message}`, "error");
      onFailure();
    }
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
    try {
      // Send request
      const url = CONSTANTS.API_SIGNUP_URL;
      const body = JSON.stringify({ email, password, password2 });
      debugger;
      const response = await API.post(url, body);
      console.log(JSON.stringify(response, null, 2));
      setAuth({ email, loggedIn: true });
      createSnack("Successfully signed up!", "success");
      onSuccess();
    } catch (err: any) {
      setAuth({ email, loggedIn: false });
      createSnack(`Sign up failed: ${err?.message}`, "error");
      onFailure();
    }
  };

  return { errors, setErrors, signIn, signUp };
};

export default useAuthenticate;

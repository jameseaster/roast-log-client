// Imports
import axios from "../api/axios";
import React, { useState } from "react";
import useSnacks from "../hooks/useSnacks";
import CONSTANTS from "../utils/constants";
import { useAuthContext } from "../context/AuthProvider";
import AuthForm, { IHandleSubmit } from "../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";

// Types
export interface ILoginProps {}

// Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

/**
 * Login Page
 * A form for a user to login to the app
 */
const Login: React.FC<ILoginProps> = () => {
  // Global State
  const { setAuth } = useAuthContext();

  // Local State
  const [errors, setErrors] = useState({ email: false, password: false });

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
      return setErrors({ email: !email.length, password: !password.length });
    }
    try {
      // TODO: Send request
      const url = CONSTANTS.API_LOGIN_URL;
      const body = JSON.stringify({ email, password });
      const response = await axios.post(url, body);
      console.log(JSON.stringify(response, null, 2));
      setAuth({ email, loggedIn: true });
      createSnack("Logged in", "success");
      onSuccess();
    } catch (err: any) {
      setAuth({ email, loggedIn: false });
      createSnack(`Login failed: ${err?.message}`, "error");
      onFailure();
    }
  };

  return (
    <Container sx={styles.container}>
      <AuthForm
        type="login"
        title="Sign In"
        errors={errors}
        submitText="Login"
        setErrors={setErrors}
        handleSubmit={signIn}
      />
    </Container>
  );
};

export default Login;

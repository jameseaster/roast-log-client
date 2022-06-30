// Imports
import { style } from "./style";
import { ISigninProps } from "./types";
import AuthForm from "components/AuthForm";
import { Navigate } from "react-router-dom";
import useAuthenticate from "hooks/useAuthenticate";
// MUI Imports
import Container from "@mui/material/Container";

/**
 * Signin Page - renders a form for a user to sign in to the app
 */
const Signin: React.FC<ISigninProps> = ({ user }) => {
  // Hooks
  const { errors, setErrors, signin } = useAuthenticate();

  // If authenticated, navigate to home page
  if (user) return <Navigate to="/" replace />;

  // If not authenticated, render Sign In form
  return (
    <Container sx={style.container}>
      <AuthForm
        type="signin"
        title="Sign In"
        errors={errors}
        submitText="Submit"
        setErrors={setErrors}
        handleSubmit={signin}
      />
    </Container>
  );
};

export default Signin;

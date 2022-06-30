// Imports
import classes from "./styles";
import { Navigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";
import useAuthenticate from "../../hooks/useAuthenticate";

// Types
export interface ISigninProps {
  user: string;
}

/**
 * Signin Page - renders a form for a user to sign in to the app
 */
const Signin: React.FC<ISigninProps> = ({ user }: ISigninProps) => {
  // Hooks
  const { errors, setErrors, signin } = useAuthenticate();

  // If user is authenticated, navigate to home page
  if (user) return <Navigate to="/" replace />;

  // If user is not authenticated, render Sign In form
  return (
    <Container sx={classes.container}>
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

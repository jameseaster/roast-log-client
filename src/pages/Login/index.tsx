// Imports
import classes from "./styles";
import { Navigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";
import useAuthenticate from "../../hooks/useAuthenticate";

// Types
export interface ILoginProps {
  user: string;
}

/**
 * Login Page
 * A form for a user to login to the app
 */
const Login: React.FC<ILoginProps> = ({ user }: ILoginProps) => {
  // Hooks
  const { errors, setErrors, signIn } = useAuthenticate();
  // If user is logged in, navigate to home page
  if (user) return <Navigate to="/" replace />;

  return (
    <Container sx={classes.container}>
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

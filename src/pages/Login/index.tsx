// Imports
import classes from "./styles";
import AuthForm from "../../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";
import useAuthenticate from "../../hooks/useAuthenticate";

// Types
export interface ILoginProps {}

/**
 * Login Page
 * A form for a user to login to the app
 */
const Login: React.FC<ILoginProps> = () => {
  // Hooks
  const { errors, setErrors, signIn } = useAuthenticate();

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

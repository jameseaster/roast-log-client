// Imports
import classes from "./styles";
import AuthForm from "../../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";
import useAuthenticate from "../../hooks/useAuthenticate";

// Types
export interface ISignupProps {}

/**
 * Signup Page
 * A form for a user to sign up to the app
 */
const Signup: React.FC<ISignupProps> = () => {
  const { errors, setErrors, signUp } = useAuthenticate();

  return (
    <Container sx={classes.container}>
      <AuthForm
        type="signup"
        title="Sign Up"
        errors={errors}
        submitText="Register"
        setErrors={setErrors}
        handleSubmit={signUp}
      />
    </Container>
  );
};

export default Signup;

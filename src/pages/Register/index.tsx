// Imports
import classes from "./styles";
import AuthForm from "../../components/AuthForm";
// MUI Imports
import Container from "@mui/material/Container";
import useAuthenticate from "../../hooks/useAuthenticate";

// Types
export interface IRegisterProps {}

/**
 * Register Page - renders a form for a user to sign up to the app
 */
const Register: React.FC<IRegisterProps> = () => {
  const { errors, setErrors, register } = useAuthenticate();

  return (
    <Container sx={classes.container}>
      <AuthForm
        type="register"
        errors={errors}
        submitText="Submit"
        setErrors={setErrors}
        handleSubmit={register}
        title="Register Account"
      />
    </Container>
  );
};

export default Register;

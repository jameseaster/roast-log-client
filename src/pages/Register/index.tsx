// Imports
import { style } from "./style";
import { IRegisterProps } from "./types";
import AuthForm from "components/AuthForm";
import useAuthenticate from "hooks/useAuthenticate";
// MUI Imports
import Container from "@mui/material/Container";

/**
 * Register Page - renders a form for a user to sign up to the app
 */
const Register: React.FC<IRegisterProps> = () => {
  // Hooks
  const { errors, setErrors, register } = useAuthenticate();

  return (
    <Container sx={style.container}>
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

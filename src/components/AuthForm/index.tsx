// Imports
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// MUI
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

// Types
export interface IAuthFormProps {
  title: string;
  submitText: string;
  type: "login" | "signup";
  errors: { email: boolean; password: boolean; password2: boolean };
  handleSubmit: (props: IHandleSubmit) => Promise<void>;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
      password2: boolean;
    }>
  >;
}

// Handle submit parameter types
export interface IHandleSubmit {
  email: string;
  password: string;
  password2: string;
  onSuccess: () => void;
  onFailure: () => void;
}

/**
 * AuthForm
 * Used for logining in, signing up, and resetting passwords
 */
const AuthForm: React.FC<IAuthFormProps> = ({
  type,
  title,
  errors,
  setErrors,
  submitText,
  handleSubmit,
}) => {
  // Local State
  const [email, setEmail] = useState("user@roast.com");
  const [password, setPassword] = useState("123");
  const [password2, setPassword2] = useState("");

  // Hooks
  const navigate = useNavigate();

  // Calls on handleSubmit success
  const onSuccess = () => {
    if (type === "signup") navigate("/", { replace: true });
    clearFormState();
  };

  // Calls on handleSubmit failure
  const onFailure = () => {};

  const clearFormState = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <Card sx={{ width: 320, marginBottom: "200px" }}>
      <CardContent>
        <Typography sx={{ mb: 3 }} variant="h4">
          {title}
        </Typography>
        <Stack spacing={3} component="form" autoComplete="off">
          {(type === "login" || type === "signup") && (
            <TextField
              fullWidth
              label="Email"
              value={email}
              id="email-input"
              error={errors.email}
              helperText={errors.email && "Email is required"}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((errors) => ({ ...errors, email: false }));
              }}
            />
          )}
          {(type === "login" || type === "signup") && (
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              id="password-input"
              error={errors.password}
              helperText={errors.password && "Password is required"}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((errors) => ({ ...errors, password: false }));
              }}
            />
          )}
          {type === "signup" && (
            <TextField
              fullWidth
              type="password"
              label="Password Confirmation"
              value={password2}
              id="password-input-confirmation"
              error={errors.password2}
              helperText={
                errors.password2 &&
                "Password confirmation is required & must match password"
              }
              onChange={(e) => {
                setPassword2(e.target.value);
                setErrors((errors) => ({ ...errors, password2: false }));
              }}
            />
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              handleSubmit({ email, password, password2, onSuccess, onFailure })
            }
          >
            {submitText}
          </Button>
        </Stack>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          {type === "login" && (
            <Typography sx={{ m: 2 }}>
              Need an account?
              <Link style={{ marginLeft: "6px" }} to="/signup">
                Sign Up
              </Link>
            </Typography>
          )}
          {type === "signup" && (
            <Typography sx={{ m: 2 }}>
              Already have an account?
              <Link style={{ marginLeft: "6px" }} to="/login">
                Login
              </Link>
            </Typography>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

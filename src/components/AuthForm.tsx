// Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  errors: { email: boolean; password: boolean };
  handleSubmit: ({ email, password }: IHandleSubmit) => Promise<void>;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
}

// Handle submit parameter types
export interface IHandleSubmit {
  email: string;
  password: string;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Calls on handleSubmit success
  const onSuccess = () => {
    if (type === "login") {
      setEmail("");
      setPassword("");
      console.log("Successfully logged in and cleared form state");
    }
  };

  // Calls on handleSubmit failure
  const onFailure = () => {
    if (type === "login") {
      console.log("Failed to log in");
    }
  };

  return (
    <Card sx={{ width: 300, marginBottom: "200px" }}>
      <CardContent>
        <Typography sx={{ mb: 3 }} variant="h4">
          {title}
        </Typography>
        <Stack spacing={3} component="form" autoComplete="off">
          {type === "login" && (
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
          {type === "login" && (
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
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              handleSubmit({ email, password, onSuccess, onFailure })
            }
          >
            {submitText}
          </Button>
        </Stack>
        <CardActions>
          {type === "login" && (
            <Typography sx={{ m: 2 }}>
              Need an account?
              <Link to="/signup">Sign Up</Link>
            </Typography>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

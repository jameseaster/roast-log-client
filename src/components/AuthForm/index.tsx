// Imports
import { style } from "./style";
import React, { useState } from "react";
import { IAuthFormProps } from "./types";
import { Link, useNavigate } from "react-router-dom";
// MUI
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

/**
 * AuthForm
 * Used for signing in and signing up
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

  // Called on handleSubmit success
  const onSuccess = () => {
    if (type === "register") navigate("/", { replace: true });
    clearFormState();
  };

  // Called on handleSubmit failure
  const onFailure = () => {};

  // Clears all local form state
  const clearFormState = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <Card sx={style.card}>
      <CardContent>
        <Typography sx={{ mb: 3 }} variant="h4">
          {title}
        </Typography>
        <Stack spacing={3} component="form" autoComplete="off">
          {(type === "signin" || type === "register") && (
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
          {(type === "signin" || type === "register") && (
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
          {type === "register" && (
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
          {type === "signin" && (
            <Typography sx={{ mt: 2 }}>
              Need an account?
              <Link style={{ marginLeft: "6px" }} to="/register">
                Sign Up
              </Link>
            </Typography>
          )}
          {type === "register" && (
            <Typography sx={{ mt: 2 }}>
              Already have an account?
              <Link style={{ marginLeft: "6px" }} to="/signin">
                Sign In
              </Link>
            </Typography>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

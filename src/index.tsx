// Imports
import App from "./App";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "state/authProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Constants
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

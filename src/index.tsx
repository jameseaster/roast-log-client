// Imports
import App from "./App";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthProvider";

// Constants
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

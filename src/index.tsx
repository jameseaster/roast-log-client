// Imports
import App from "./App";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "state/authProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";

// Constants
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider autoHideDuration={3500}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

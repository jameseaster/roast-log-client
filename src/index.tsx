// Imports
import App from "./App";
import theme from "./theme";
import store from "providers/redux/store";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "providers/auth/provider";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Constants
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();

root.render(
  <SnackbarProvider autoHideDuration={3500}>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
            </LocalizationProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  </SnackbarProvider>
);

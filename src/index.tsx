// Imports
import App from "./App";
import theme from "./theme";
import store from "state/redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "state/auth/provider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Constants
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();

root.render(
  <SnackbarProvider autoHideDuration={3500}>
    <Provider store={store}>
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
    </Provider>
  </SnackbarProvider>
);

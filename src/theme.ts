import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#3A5BA0",
    },
    secondary: {
      main: "#ffaf40",
    },
    error: {
      main: "#e55039",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FAFAFA",
    },
  },
});

export default theme;

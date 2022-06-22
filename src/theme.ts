import { createTheme } from "@mui/material/styles";

// See https://flatuicolors.com/palette/fr

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e3799",
    },
    secondary: {
      main: "#38ada9",
    },
    error: {
      main: "#e55039",
    },
  },
});

export default theme;

// Imports
import { useSnackbar, VariantType } from "notistack";
// MUI
import IconButton from "@mui/material/IconButton";
// MUI Icons
import CloseIcon from "@mui/icons-material/Close";

/**
 * useSnacks - returns a hook to generate snacks with close button
 */
const useSnacks = () => {
  // Hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Creates a snack with a close button
  const createSnack = (text: string, variant: VariantType) => {
    enqueueSnackbar(text, {
      variant,
      action: (key) => (
        <IconButton
          size="small"
          color="inherit"
          aria-label="close"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ),
    });
  };

  return { createSnack };
};

export default useSnacks;

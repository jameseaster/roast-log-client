// Imports
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSnackbar, VariantType } from "notistack";

/**
 * useSnacks
 * Returns a hook to generate a snack with a close button
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

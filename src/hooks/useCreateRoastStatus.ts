// Imports
import useSnacks from "./useSnacks";
import { VariantType } from "notistack";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "providers/redux/store";
import {
  getRoastsState,
  clearRoastStatus,
} from "providers/redux/slices/roasts";

/**
 * useCreateRoastStatus - creates a snack for the status update when creating a roast log
 */
const useCreateRoastStatus = (onSuccess?: VoidFunction | undefined) => {
  // Global State
  const dispatch = useAppDispatch();
  const { createRoastStatus } = useSelector(getRoastsState);

  // Hooks
  const { createSnack } = useSnacks();

  // Stabilizes snack for useEffect callback
  const stableSnack = useCallback(
    (message: string, type: VariantType) => createSnack(message, type),
    [createSnack]
  );

  // Create snack and call on success if status is "success"
  useEffect(() => {
    if (createRoastStatus === "success") {
      stableSnack("Roast log created", "success");
      dispatch({
        type: clearRoastStatus.type,
        payload: "POST",
      });
      onSuccess && onSuccess();
    } else if (createRoastStatus === "error") {
      stableSnack("Failed to create roast log", "error");
      dispatch({
        type: clearRoastStatus.type,
        payload: "POST",
      });
    }
  }, [createRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default useCreateRoastStatus;

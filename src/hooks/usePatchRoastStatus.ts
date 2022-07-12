// Imports
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state/redux/store";
import {
  getUpdateRoastStatus,
  clearUpdateRoastStatus,
} from "state/redux/slices/app";
import useSnacks from "./useSnacks";
import { VariantType } from "notistack";

/**
 * usePatchRoastStatus - creates a snack for the status update when updating a roast log
 */
const usePatchRoastStatus = (onSuccess: VoidFunction) => {
  // Global State
  const dispatch = useAppDispatch();
  const { updateRoastStatus } = useSelector(getUpdateRoastStatus);
  // Hooks
  const { createSnack } = useSnacks();

  // Stabilizes snack for useEffect callback
  const stableSnack = useCallback(
    (message: string, type: VariantType) => createSnack(message, type),
    [createSnack]
  );

  // Create snack and call on success if status is "success"
  useEffect(() => {
    if (updateRoastStatus === "success") {
      stableSnack("Roast log updated", "success");
      dispatch(clearUpdateRoastStatus());
      onSuccess();
    } else if (updateRoastStatus === "error") {
      stableSnack("Failed to update roast log", "error");
      dispatch(clearUpdateRoastStatus());
    }
  }, [updateRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default usePatchRoastStatus;

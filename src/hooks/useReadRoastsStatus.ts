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
 * useReadRoastsStatus - creates a snack for the status update when deleting a roast log
 */
const useReadRoastsStatus = (onSuccess?: VoidFunction | undefined) => {
  // Global State
  const dispatch = useAppDispatch();
  const { readRoastStatus } = useSelector(getRoastsState);

  // Hooks
  const { createSnack } = useSnacks();

  // Stabilizes snack for useEffect callback
  const stableSnack = useCallback(
    (message: string, type: VariantType) => createSnack(message, type),
    [createSnack]
  );

  // Create snack and call on delete if status is "success"
  useEffect(() => {
    if (readRoastStatus === "success") {
      dispatch({
        type: clearRoastStatus.type,
        payload: "GET",
      });
      onSuccess && onSuccess();
    } else if (readRoastStatus === "error") {
      stableSnack("Failed to fetch roast logs", "error");
      dispatch({
        type: clearRoastStatus.type,
        payload: "GET",
      });
    }
  }, [readRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default useReadRoastsStatus;

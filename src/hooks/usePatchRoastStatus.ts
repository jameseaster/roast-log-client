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
 * usePatchRoastStatus - creates a snack for the status update when updating a roast log
 */
const usePatchRoastStatus = (onSuccess: VoidFunction) => {
  // Global State
  const dispatch = useAppDispatch();
  const { updateRoastStatus } = useSelector(getRoastsState);

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
      dispatch({
        type: clearRoastStatus.type,
        payload: "PATCH",
      });
      onSuccess();
    } else if (updateRoastStatus === "error") {
      stableSnack("Failed to update roast log", "error");
      dispatch(
        dispatch({
          type: clearRoastStatus.type,
          payload: "PATCH",
        })
      );
    }
  }, [updateRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default usePatchRoastStatus;

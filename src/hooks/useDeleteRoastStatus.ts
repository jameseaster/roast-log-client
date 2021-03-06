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
 * useDeleteRoastStatus - creates a snack for the status update when deleting a roast log
 */
const useDeleteRoastStatus = (onSuccess?: VoidFunction | undefined) => {
  // Global State
  const dispatch = useAppDispatch();
  const { deleteRoastStatus } = useSelector(getRoastsState);

  // Hooks
  const { createSnack } = useSnacks();

  // Stabilizes snack for useEffect callback
  const stableSnack = useCallback(
    (message: string, type: VariantType) => createSnack(message, type),
    [createSnack]
  );

  // Create snack and call on delete if status is "success"
  useEffect(() => {
    if (deleteRoastStatus === "success") {
      stableSnack("Roast log deleted", "success");
      dispatch({
        type: clearRoastStatus.type,
        payload: "DELETE",
      });
      onSuccess && onSuccess();
    } else if (deleteRoastStatus === "error") {
      stableSnack("Failed to delete roast log", "error");
      dispatch({
        type: clearRoastStatus.type,
        payload: "DELETE",
      });
    }
  }, [deleteRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default useDeleteRoastStatus;

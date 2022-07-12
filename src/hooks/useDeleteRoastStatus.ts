// Imports
import useSnacks from "./useSnacks";
import { VariantType } from "notistack";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "state/redux/store";
import { getAppState, clearDeleteRoastStatus } from "state/redux/slices/app";

/**
 * useDeleteRoastStatus - creates a snack for the status update when creating a roast log
 */
const useDeleteRoastStatus = (onSuccess?: VoidFunction | undefined) => {
  // Global State
  const dispatch = useAppDispatch();
  const { deleteRoastStatus } = useSelector(getAppState);

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
      dispatch(clearDeleteRoastStatus());
      onSuccess && onSuccess();
    } else if (deleteRoastStatus === "error") {
      stableSnack("Failed to delete roast log", "error");
      dispatch(clearDeleteRoastStatus());
    }
  }, [deleteRoastStatus, stableSnack, dispatch, onSuccess]);
};

export default useDeleteRoastStatus;

// Imports
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "providers/redux/store";
import { readRoasts, getRoastsState } from "providers/redux/slices/roasts";

/**
 * useReadRoasts
 */
const useReadRoasts = () => {
  // Global State
  const dispatch = useAppDispatch();
  const { allIds } = useSelector(getRoastsState);

  // Requests roasts if they are not present
  useEffect(() => {
    if (!allIds.length) dispatch(readRoasts());
  }, [dispatch, allIds.length]);
};

export default useReadRoasts;

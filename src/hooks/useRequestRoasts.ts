// Imports
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state/redux/store";
import { readRoasts, roastData } from "state/redux/slices/app";

/**
 * useRequestRoasts
 */
const useRequestRoasts = () => {
  // Global State
  const dispatch = useAppDispatch();
  const { roasts } = useSelector(roastData);

  // Requests roasts if they are not present
  useEffect(() => {
    if (!roasts.length) dispatch(readRoasts());
  }, [dispatch, roasts.length]);
};

export default useRequestRoasts;

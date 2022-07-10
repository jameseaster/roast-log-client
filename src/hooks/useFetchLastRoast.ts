// Imports
import { useState, useEffect } from "react";
import { getRoasts } from "api/axios";
import { useQuery } from "react-query";

export interface IRoast {
  id: number;
  date: string;
  time: string;
  region: string;
  process: string;
  country: string;
  cool_down: string;
  vac_to_250: number;
  user_email: string;
  first_crack: string;
  green_weight: number;
  roasted_weight: number;
}

/**
 * useFetchLastRoast - stores the data from the most recent roast
 */
const useFetchLastRoast = () => {
  // Local State
  const [lastRoast, setLastRoast] = useState<IRoast>();
  const [roastNumber, setRoastNumber] = useState<number>(1);

  // Fetch roasts
  const {
    data,
    isError,
    refetch: updateLastRoast,
  } = useQuery("roasts", getRoasts);

  // Store last roast in state
  useEffect(() => {
    if (isError) setLastRoast(undefined);
    else if (data?.length) {
      setLastRoast(data[0]);
      setRoastNumber(data.length + 1);
    }
  }, [data, isError]);

  return { roastNumber, lastRoast, updateLastRoast };
};

export default useFetchLastRoast;

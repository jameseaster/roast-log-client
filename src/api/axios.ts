import axios from "axios";
import constants from "utils/constants";

interface IRoastRequestData {
  date: string;
  time: string;
  region: string;
  process: string;
  country: string;
  cool_down: number;
  vac_to_250: number;
  first_crack: number;
  green_weight: number;
  roasted_weight: number;
}

const API = axios.create({
  withCredentials: true,
  baseURL: constants.api.baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Get signed in user's roasts
export const getRoasts = async () => {
  const response = await API.get(constants.api.roasts);
  return response.data;
};

// Sends post request to create new roast
export const createRoast = async (roastData: IRoastRequestData) => {
  const response = await API.post(constants.api.roasts, roastData);
  return response;
};

// Sends patch request to create new roast
export const updateRoast = async (roastData: IRoastRequestData) => {
  const response = await API.patch(constants.api.roasts, roastData);
  return response;
};

export default API;

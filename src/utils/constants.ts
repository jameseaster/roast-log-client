// Imports
import {
  IApiConstants,
  ILogConstants,
  IAppbarConstants,
  IGeneralConstants,
  IReactQueryConstants,
} from "types/constants";

// API
const api: IApiConstants = {
  roasts: "roasts/",
  signin: "auth/signin/",
  signout: "auth/signout/",
  register: "auth/register/",
  authenticated: "auth/authenticated/",
  baseUrl: "http://localhost:8080/API/",
};

// App Bar
const appbar: IAppbarConstants = {
  title: "ROAST LOG",
};

// Log Form
const log: ILogConstants = {
  options: ["Dry", "Wet", "Honey"],
};

// React Query
const reactQuery: IReactQueryConstants = {
  allRoasts: "allRoasts",
};

// General
const general: IGeneralConstants = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

/**
 * Combine constants
 */
const constants = { api, appbar, log, reactQuery, general };

export default constants;

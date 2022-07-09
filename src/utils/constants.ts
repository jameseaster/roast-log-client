/**
 * API
 */
interface IApi {
  roasts: string;
  signin: string;
  baseUrl: string;
  signout: string;
  register: string;
  authenticated: string;
}
const api: IApi = {
  roasts: "/roasts",
  signin: "/auth/signin",
  signout: "/auth/signout",
  register: "/auth/register",
  authenticated: "/auth/authenticated",
  baseUrl: "http://localhost:8080/API",
};

/**
 * App Bar
 */
interface IAppbar {
  title: string;
}
const appbar: IAppbar = {
  title: "ROAST LOG",
};

/**
 * Log Form
 */
interface ILog {
  options: string[];
}

const log: ILog = {
  options: ["Dry", "Wet", "Honey"],
};

/**
 * React Query
 */
interface IReactQuery {
  allRoasts: string;
}

const reactQuery: IReactQuery = {
  allRoasts: "allRoasts",
};

/**
 * General
 */
interface IGeneral {
  months: string[];
}

const general: IGeneral = {
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

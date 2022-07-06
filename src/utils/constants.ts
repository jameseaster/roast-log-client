/**
 * API
 */
interface IApi {
  signin: string;
  register: string;
  signout: string;
  authenticated: string;
}
const api: IApi = {
  signin: "/auth/signin",
  signout: "/auth/signout",
  register: "/auth/register",
  authenticated: "/auth/authenticated",
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
const constants = { api, appbar, log, general };

export default constants;

// API
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

// App Bar
interface IAppbar {
  title: string;
}
const appbar: IAppbar = {
  title: "ROAST LOG",
};

// Combine constants
const constants = { api, appbar };

export default constants;

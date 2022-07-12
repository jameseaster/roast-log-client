export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type GlobalStateStatus = "loading" | "error" | "success" | null;

export type ButtonThemeVariantMUI =
  | "text"
  | "outlined"
  | "contained"
  | undefined;

export type ButtonThemeColorMUI =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type ToggleBtnThemeColorMUI =
  | "standard"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | undefined;

export interface IFormState {
  region: string;
  coolDown: string;
  vacCool: boolean;
  firstCrack: string;
  greenWeight: string;
  process: string | null;
  country: string | null;
  roastedWeight: string;
  dateTime: Date | null;
}

export interface IReqBody {
  country: string;
  region: string;
  process: string;
  date: string;
  time: string;
  green_weight: number;
  roasted_weight: number;
  first_crack: number;
  cool_down: number;
  vac_to_250: number;
  id?: number;
}

export interface IErrorState {
  [key: string]: boolean;
}

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

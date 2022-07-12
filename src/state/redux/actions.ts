// Dependency Imports
import { createAction } from "@reduxjs/toolkit";

interface IApiCallBegan {
  data?: any;
  url: string;
  method: string;
  onStart: string;
  onSuccess: string;
  onError: string;
}

// TODO: Type payload better
const prepareAction = (t: any) => ({ payload: t });

/**
 * These variables are actually functions, to get their type
 * you need to access their type key/value pair: apiCallBegan.type
 */
export const apiCallBegan = createAction<IApiCallBegan>("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess", prepareAction);
export const apiCallFailed = createAction("api/CallFailed", prepareAction);

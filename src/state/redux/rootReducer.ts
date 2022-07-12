// Dependency Imports
import { combineReducers } from "redux";
// Import reducers to combine
import appReducer from "./slices/app";

export const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

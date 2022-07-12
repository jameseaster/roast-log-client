// Dependency Imports
import { combineReducers } from "redux";
// Import reducers to combine
import appReducer from "./slices/app";
import roastsReducer from "./slices/roasts";

export const rootReducer = combineReducers({
  app: appReducer,
  roasts: roastsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

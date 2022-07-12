// Dependency Imports
import { configureStore } from "@reduxjs/toolkit";
// Combined reducer
import { rootReducer } from "./rootReducer";
// Middleware
import api from "./middleware/api";
// Hook
import { useDispatch } from "react-redux";

// ConfigureStore allows us to dispatch async actions as well as sets up interactions with devTools
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

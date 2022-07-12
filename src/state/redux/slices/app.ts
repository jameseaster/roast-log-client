import constants from "utils/constants";
import { apiCallBegan } from "../actions";
import { IReqBody, IRoast } from "types/app";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "state/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";

// Statuses for global state
type globalStateStatus = "loading" | "error" | "success" | null;

// Define a type for the slice state
interface AppState {
  userEmail: string;

  nextRoastNumber: number;

  roasts: IRoast[];

  // Create Roast
  createRoastStatus: globalStateStatus;

  // Read
  loadingRoasts: boolean;
  loadingRoastsError: string | null;

  // Update Request Status
  updateRoastStatus: globalStateStatus;

  // Delete Request Status
  deleteRoastStatus: globalStateStatus;
}

// Define the initial state using that type
const initialState: AppState = {
  roasts: [],
  userEmail: "",
  nextRoastNumber: 1,
  loadingRoasts: false,
  loadingRoastsError: null,

  createRoastStatus: null,
  updateRoastStatus: null,
  deleteRoastStatus: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  // actions => action handlers
  reducers: {
    // Update user email value
    updateUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    // Call when requesting roasts
    roastsRequested: (state) => {
      state.loadingRoastsError = null;
      state.loadingRoasts = true;
    },
    // Call when request for roasts fails
    roastsRequestFailed: (state, action) => {
      state.loadingRoastsError = "Failed to fetch roasts";
      state.loadingRoasts = false;
    },
    // Call when request for roasts succeeds
    roastsReceived: (state, action: PayloadAction<Array<IRoast>>) => {
      state.roasts = action.payload;
      state.nextRoastNumber = action.payload.length + 1;
      state.loadingRoasts = false;
    },
    // Call when creating roast
    createRoastsRequested: (state) => {
      state.createRoastStatus = "loading";
    },
    // Call when request for creating roast fails
    createRoastsRequestFailed: (state, action) => {
      state.createRoastStatus = "error";
    },
    // Call when request for creating roast succeeds
    createRoastsReceived: (
      state,
      action: PayloadAction<{ message: string; data: IRoast }>
    ) => {
      const updatedRoasts = [action.payload.data, ...state.roasts];
      state.nextRoastNumber = updatedRoasts.length + 1;
      state.roasts = updatedRoasts;
      state.createRoastStatus = "success";
    },
    // Clears Create Roast Status
    clearCreateRoastStatus: (state) => {
      state.createRoastStatus = null;
    },
    // Call when requesting to update roast
    roastUpdateRequested: (state) => {
      state.updateRoastStatus = "loading";
    },
    // Call when request to update roast fails
    roastUpdateFailed: (state, action) => {
      state.updateRoastStatus = "error";
    },
    // Call when request to update roast succeeds
    roastUpdateReceived: (state, action) => {
      const { id } = action.payload.data;
      const idx = state.roasts.findIndex((r) => r.id === id);
      const updatedRoasts = state.roasts.filter((r) => r.id !== id);
      updatedRoasts.splice(idx, 0, action.payload.data);
      state.roasts = updatedRoasts;
      state.updateRoastStatus = "success";
    },
    // Clears Update Roast Status
    clearUpdateRoastStatus: (state) => {
      state.updateRoastStatus = null;
    },
    // Call when requesting to delete roast
    deleteRoastRequested: (state) => {
      state.deleteRoastStatus = "loading";
    },
    // Call when request to delete roast fails
    deleteRoastFailed: (state, action) => {
      state.deleteRoastStatus = "error";
    },
    // Call when request to delete roast succeeds
    deleteRoastReceived: (state, action) => {
      const { id } = action.payload.data;
      const remainingRoasts = state.roasts.filter((r) => r.id !== id);
      state.roasts = remainingRoasts;
      state.deleteRoastStatus = "success";
    },
    // Clears Delete Roast Status
    clearDeleteRoastStatus: (state) => {
      state.deleteRoastStatus = null;
    },
  },
});

export const {
  updateUserEmail,

  /* Create Roast */
  createRoastsReceived,
  createRoastsRequested,
  clearCreateRoastStatus,
  createRoastsRequestFailed,

  /* Read roasts */
  roastsReceived,
  roastsRequested,
  roastsRequestFailed,

  /* Update Roast */
  roastUpdateFailed,
  roastUpdateReceived,
  roastUpdateRequested,
  clearUpdateRoastStatus,

  /* Delete Roast */
  deleteRoastFailed,
  deleteRoastReceived,
  deleteRoastRequested,
  clearDeleteRoastStatus,
} = slice.actions;

export default slice.reducer;

// Action Creators
export const createRoast = (data: IReqBody) =>
  apiCallBegan({
    data,
    method: "POST",
    url: constants.api.roasts,
    onStart: createRoastsRequested.type,
    onSuccess: createRoastsReceived.type,
    onError: createRoastsRequestFailed.type,
  });

export const readRoasts = () =>
  apiCallBegan({
    method: "GET",
    url: constants.api.roasts,
    onStart: roastsRequested.type,
    onSuccess: roastsReceived.type,
    onError: roastsRequestFailed.type,
  });

export const updateRoast = (data: IRoast) =>
  apiCallBegan({
    data,
    method: "PATCH",
    url: constants.api.roasts,
    onError: roastUpdateFailed.type,
    onStart: roastUpdateRequested.type,
    onSuccess: roastUpdateReceived.type,
  });

export const deleteRoast = (id: string) =>
  apiCallBegan({
    method: "DELETE",
    url: `${constants.api.roasts}/${id}`,
    onError: deleteRoastFailed.type,
    onStart: deleteRoastRequested.type,
    onSuccess: deleteRoastReceived.type,
  });

// Selectors
export const getAppState = (state: RootState) => {
  return state.app;
};

export const roastData = (state: RootState) => {
  const { roasts, loadingRoasts, loadingRoastsError } = state.app;
  return { roasts, loadingRoasts, loadingRoastsError };
};

export const getRoastNumber = (state: RootState) => {
  const { nextRoastNumber } = state.app;
  return { nextRoastNumber };
};

export const getLastRoast = (state: RootState) => {
  const { roasts } = state.app;
  return { lastRoast: roasts[0] };
};

export const getUpdateRoastStatus = (state: RootState) => {
  const { updateRoastStatus } = state.app;
  return { updateRoastStatus };
};

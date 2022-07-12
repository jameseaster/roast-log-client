import constants from "utils/constants";
import { apiCallBegan } from "../actions";
import { IReqBody, IRoast } from "types/app";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "providers/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RequestMethod, GlobalStateStatus } from "types/app";

// Define a type for the slice state
interface RoastState {
  allIds: string[];
  byId: { [key: string]: IRoast };
  nextRoastNumber: number;
  // Status
  createRoastStatus: GlobalStateStatus;
  readRoastStatus: GlobalStateStatus;
  updateRoastStatus: GlobalStateStatus;
  deleteRoastStatus: GlobalStateStatus;
}

// Define the initial state using that type
const initialState: RoastState = {
  allIds: [],
  byId: {},
  nextRoastNumber: 1,
  createRoastStatus: null,
  readRoastStatus: null,
  updateRoastStatus: null,
  deleteRoastStatus: null,
};

const slice = createSlice({
  name: "roasts",
  initialState,
  // actions => action handlers
  reducers: {
    /**
     * Request Status
     */
    roastsRequested: (state, action) => {
      const { method } = action.payload;
      if (method === "GET") state.readRoastStatus = "loading";
      if (method === "POST") state.createRoastStatus = "loading";
      if (method === "PATCH") state.updateRoastStatus = "loading";
      if (method === "DELETE") state.deleteRoastStatus = "loading";
    },
    roastsRequestFailed: (state, action) => {
      const { method } = action.payload;
      if (method === "GET") state.readRoastStatus = "error";
      if (method === "POST") state.createRoastStatus = "error";
      if (method === "PATCH") state.updateRoastStatus = "error";
      if (method === "DELETE") state.deleteRoastStatus = "error";
    },
    clearRoastStatus: (state, action: PayloadAction<RequestMethod>) => {
      const method = action.payload;
      if (method === "GET") state.readRoastStatus = null;
      if (method === "POST") state.createRoastStatus = null;
      if (method === "PATCH") state.updateRoastStatus = null;
      if (method === "DELETE") state.deleteRoastStatus = null;
    },

    /**
     * Roast CRUD Requests
     */
    createRoastsReceived: (
      state,
      action: PayloadAction<{ message: string; data: IRoast }>
    ) => {
      const newRoast = action.payload.data;
      const updatedAllIds = [...state.allIds, String(newRoast.id)];
      state.byId = { ...state.byId, [newRoast.id]: newRoast };
      state.allIds = updatedAllIds;
      state.nextRoastNumber = updatedAllIds.length + 1;
      state.createRoastStatus = "success";
    },
    roastsReceived: (state, action: PayloadAction<Array<IRoast>>) => {
      const allRoasts = action.payload.reduce((byId, roast) => {
        return {
          ...byId,
          [roast.id]: { ...roast, date: roast.date.slice(0, 10) },
        };
      }, {});
      state.byId = allRoasts;
      state.allIds = Object.keys(allRoasts);
      state.nextRoastNumber = action.payload.length + 1;
      state.readRoastStatus = "success";
    },
    roastUpdateReceived: (
      state,
      action: PayloadAction<{ message: string; data: IRoast }>
    ) => {
      const { id } = action.payload.data;
      const updatedId = String(id);
      const updatedRoast = action.payload.data;
      state.byId = { ...state.byId, [updatedId]: updatedRoast };
      state.allIds = [
        updatedId,
        ...state.allIds.filter((id) => id !== updatedId),
      ];
      state.updateRoastStatus = "success";
    },
    deleteRoastReceived: (
      state,
      action: PayloadAction<{ message: string; data: { id: string } }>
    ) => {
      const { id } = action.payload.data;
      const idToRemove = String(id);
      const { [idToRemove]: _, ...rest } = state.byId;
      state.byId = rest;
      state.allIds = state.allIds.filter((id) => id !== idToRemove);
      state.nextRoastNumber = state.nextRoastNumber - 1;
      state.deleteRoastStatus = "success";
    },
  },
});

export const {
  // Status Action Handlers
  roastsRequested,
  clearRoastStatus,
  roastsRequestFailed,
  // CRUD Action Handlers
  roastsReceived,
  roastUpdateReceived,
  deleteRoastReceived,
  createRoastsReceived,
} = slice.actions;

export default slice.reducer;

// Action Creators
export const createRoast = (data: IReqBody) =>
  apiCallBegan({
    data,
    method: "POST",
    url: constants.api.roasts,
    onStart: roastsRequested.type,
    onError: roastsRequestFailed.type,
    onSuccess: createRoastsReceived.type,
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
    onStart: roastsRequested.type,
    onError: roastsRequestFailed.type,
    onSuccess: roastUpdateReceived.type,
  });

export const deleteRoast = (id: string) =>
  apiCallBegan({
    method: "DELETE",
    url: `${constants.api.roasts}/${id}`,
    onStart: roastsRequested.type,
    onError: roastsRequestFailed.type,
    onSuccess: deleteRoastReceived.type,
  });

// Selectors
export const getRoastsState = (state: RootState) => {
  return state.roasts;
};

export const getAllRoasts = (state: RootState) => {
  const allRoasts =
    state.roasts.allIds
      .map((id) => state.roasts.byId[id])
      .sort(
        (a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
      ) || [];
  return { allRoasts };
};

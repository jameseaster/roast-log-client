// import constants from "utils/constants";
// import { apiCallBegan } from "../actions";
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "state/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AppState {
  userEmail: string;
}

// Define the initial state using that type
const initialState: AppState = {
  userEmail: "",
};

const slice = createSlice({
  name: "app",
  initialState,
  // actions => action handlers
  reducers: {
    // Update user email value
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const { updateUserEmail } = slice.actions;

export default slice.reducer;

// Action Creators
// export const createRoast = (data: IReqBody) =>
//   apiCallBegan({
//     data,
//     method: "POST",
//     url: constants.api.roasts,
//     onStart: createRoastsRequested.type,
//     onSuccess: createRoastsReceived.type,
//     onError: createRoastsRequestFailed.type,
//   });

// Selectors
// export const getAppState = (state: RootState) => {
//   return state.app;
// };

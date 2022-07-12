import axios from "axios";
import * as actions from "../actions";
import constants from "utils/constants";

// API middleware which logs progress and sends http requests
const api = (store: any) => (next: any) => async (action: any) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  // Pass along method for reducer to update request statuses
  if (onStart) store.dispatch({ type: onStart, payload: { method } });

  // General log for the start of an api request
  // next(action); // SHOWS THE API CALL BEGAN

  try {
    // DEV TESTING: Delays request to mock longer loading
    await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: COMMENT OUT

    // HTTP request
    const response = await axios.request({
      baseURL: constants.api.baseUrl,
      url,
      data,
      method,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    // General success dispatch
    // store.dispatch(actions.apiCallSuccess(response.data)); // SHOWS THE API CALL SUCCEEDED

    // Specific success dispatch
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error: any) {
    // General err dispatch
    // store.dispatch(actions.apiCallFailed(error)); // SHOWS THE API CALL FAILED

    // Specific error dispatch
    if (onError) {
      store.dispatch({
        type: onError,
        // Include method for reducer to update request statuses
        payload: { method, error: error.message },
      });
    }
  }
};

export default api;

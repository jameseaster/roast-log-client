import axios from "axios";
import * as actions from "../actions";
import constants from "utils/constants";

// API middleware which logs progress and sends http requests
const api = (store: any) => (next: any) => async (action: any) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) store.dispatch({ type: onStart });

  // Add next here to see both actions in devTools
  next(action); // SHOWS THE API CALL BEGAN

  try {
    // Bearer Token for local requests
    const headers = { "Content-Type": "application/json" };

    // Delays request for dev testing //
    await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: COMMENT OUT

    // HTTP request
    const response = await axios.request({
      baseURL: constants.api.baseUrl,
      url,
      headers,
      method,
      data,
      withCredentials: true,
    });

    // General success dispatch
    store.dispatch(actions.apiCallSuccess(response.data)); // SHOWS THE API CALL SUCCEEDED

    // Specific success dispatch
    if (onSuccess) {
      store.dispatch({ type: onSuccess, payload: response.data });
    }
  } catch (error: any) {
    // General err dispatch
    store.dispatch(actions.apiCallFailed(error)); // SHOWS THE API CALL FAILED

    // Specific error dispatch
    if (onError) {
      store.dispatch({ type: onError, error: error.message });
    }
  }
};

export default api;

import { ERROR, LOADING, RESPONSE_SUCCESS } from "./Actions";

export const initialState = {
  loading: false,
  videos: null,
  error: null,
}

const VideosReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {loading: true, ...state};
    case RESPONSE_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
        error: null,
      }
    case ERROR:
      return {
        loading: false,
        error: action.payload,
        videos: null
      };
    default:
      return state;
  }
}

export default VideosReducer;
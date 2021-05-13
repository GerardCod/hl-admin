import { ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from "./Actions";

export const initialState = {
  loading: false,
  videos: null,
  error: null,
}

const VideosReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    case FETCH_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
        error: null,
      }
    case RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
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
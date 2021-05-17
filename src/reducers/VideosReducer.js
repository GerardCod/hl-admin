import { DOCUMENT_FOUND, ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from "./Actions";

export const initialState = {
  loading: false,
  videos: null,
  error: null,
  videoSelected: null,
}

const VideosReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true, error: null, videoSelected: null};
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
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOCUMENT_FOUND: 
      return {
        ...state,
        loading: false,
        videoSelected: action.payload,
        error: null
      }
    default:
      return state;
  }
}

export default VideosReducer;
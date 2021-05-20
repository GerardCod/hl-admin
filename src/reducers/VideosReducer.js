export const initialState = {
  loading: false,
  videos: null,
  error: null,
  videoSelected: null,
}

const VideosReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null, videoSelected: null},
    FETCH_VIDEOS_SUCCESS: {loading: false, videos: action.payload, error: null},
    RESPONSE_SUCCESS: {...state, loading: false},
    ERROR: {...state, loading: false, error: action.payload},
    DOCUMENT_FOUND: {...state, loading: false, videoSelected: action.payload, error: null}
  }

  return states[action.type] || state;
}

export default VideosReducer;
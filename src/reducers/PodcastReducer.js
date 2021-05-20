export const initialState = {
  loading: false,
  podcasts: null,
  error: null,
  podcastSelected: null,
}

const PodcastReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null, podcastSelected: null},
    FETCH_DOCUMENTS: {...state, podcasts: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    RESPONSE_SUCCESS: {...state, error: null, loading: false},
    DOCUMENT_FOUND: {...state, error: null, loading: false, podcastSelected: action.payload}
  }

  return states[action.type] || state;
}

export default PodcastReducer;
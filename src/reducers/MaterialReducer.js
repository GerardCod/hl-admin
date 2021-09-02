
/**
 * Represents the intial state for material reducer.
 */
export const initialState = {
  loading: false,
  audios: [],
  videos: [],
  books: [],
  error: null,
}

/**
 * Handles the state changes.
 * @param {*} state is the current value of material state.
 * @param {*} action is the action dispatched from the ui.
 * @returns a new state value or the current by default.
 */
const MaterialReducer = function reducer(state, action) {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_AUDIOS: {...state, loading: false, audios: action.payload},
    FETCH_VIDEOS: {...state, loading: false, videos: action.payload},
    FETCH_BOOKS: {...state, loading: false, books: action.payload},
    ERROR: {...state, loading: false, error: action.payload}
  }

  return states[action.type] || state;
}

export default MaterialReducer;
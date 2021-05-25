export const initialState = {
  loading: false,
  avatars: null,
  error: null
}

const AvatarReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    FETCH_DOCUMENTS: {...state, loading: false, avatars: action.payload},
    ERROR: {...state, loading: false, error: action.payload}
  }

  return states[action.type] || state;
}

export default AvatarReducer;
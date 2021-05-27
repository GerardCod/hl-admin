
export const initialState = {
  loading: false,
  user: null,
  error: null,
}

const AuthReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: false, error: null},
    USER_FOUND: {...state, user: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false}
  }

  return states[action.type] || state;
}

export default AuthReducer;
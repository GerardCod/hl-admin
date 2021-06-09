
export const initialState = {
  loading: false,
  user: null,
  error: null,
}

const AuthReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    USER_FOUND: {...state, user: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    SIGN_OUT: {...state, user: null},
    RESPONSE_SUCCESS: {...state, loading: false}
  }

  return states[action.type] || state;
}

export default AuthReducer;
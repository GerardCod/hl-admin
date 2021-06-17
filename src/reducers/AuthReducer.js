
export const initialState = {
  loading: false,
  user: null,
  error: null,
  reset_status: null,
  password_changed: false,
}

const AuthReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    USER_FOUND: {...state, user: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    SIGN_OUT: {...state, user: null},
    RESPONSE_SUCCESS: {...state, loading: false},
    RESET_STATUS: {...state, loading: false, reset_status: action.payload},
    PASSWORD_CHANGED: {...state, loading: false, password_changed: true}
  }

  return states[action.type] || state;
}

export default AuthReducer;
export const initialState = {
  loading: false,
  accounts: null,
  error: null,
  accountSelected: null,
}

const AccountReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    FETCH_DOCUMENTS: {...state, loading: false, accounts: action.payload},
    RESPONSE_SUCCESS: {...state, loading: false, error: null},
    DOCUMENT_FOUND: {...state, loading: false, error: null, accountSelected: action.payload},
    ERROR: {...state, loading: false, error: action.payload},
  }

  return states[action.type] || state;
}

export default AccountReducer;
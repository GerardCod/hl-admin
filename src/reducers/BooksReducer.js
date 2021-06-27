export const initialState = {
  loading: false,
  books: [],
  error: null,
  bookSelected: null
};

/**
 * Handles the actions to perform at books domain.
 * @param {*} state an object that represents the current books state.
 * @param {*} action an object that contains data about the action to perform.
 * @returns 
 */
const BooksReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    RESPONSE_SUCCESS: {...state, loading: false,},
    FETCH_DOCUMENTS: {...state, loading: false, books: action.payload},
    DOCUMENT_FOUND: {...state, loading: false, bookSelected: action.payload},
    ERROR: {...state, loading: false, error: action.payload}
  }

  return states[action.type] || state;
}

export default BooksReducer;
export const initialState = {
  loading: false,
  activities: null,
  error: null,
  activitySelected: null,
}

const ActivityReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    FETCH_DOCUMENTS: {...state, loading: false, activities: action.payload},
    ERROR: {...state, loading: false, error: action.payload},
    DOCUMENT_FOUND: {...state, loading: false, activitySelected: action.payload}
  }

  return states[action.type] || state;
}

export default ActivityReducer;
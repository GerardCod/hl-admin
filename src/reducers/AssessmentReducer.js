export const initialState = {
  loading: false,
  assessments: null,
  error: null,
  assessmentSelected: null,
}

const AssessmentReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_DOCUMENTS: {...state, assessments: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    DOCUMENT_FOUND: {...state, assessmentSelected: action.payload, loading: false},
    RESPONSE_SUCCESS: {...state, loading: false}
  };

  return states[action.type] || state;
}

export default AssessmentReducer;
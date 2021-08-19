export const SAVE_GENERAL_INFO = 'SAVE_GENERAL_INFO';
export const SAVE_CONTENT = 'SAVE_CONTENT';
export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

const CreateAssessmentReducer = (state, action) => {
  const states = {
    SAVE_GENERAL_INFO: {...state, ...action.payload},
    SAVE_CONTENT: {...state, ...action.payload},
    ADD_QUESTION: {...state, questions: [...state.questions, action.payload]},
    DELETE_QUESTION: {...state, questions: state.questions.filter(q => q.id !== action.payload.id)},
    SAVE_QUESTION: {...state, questions: state.questions.map(q => {
      if (q.id === action.payload.id) {
        q = action.payload;
      }
      return q;
    })},
  }

  return states[action.type] || state;
}

export default CreateAssessmentReducer;
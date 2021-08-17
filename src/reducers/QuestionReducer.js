export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const MARK_AS_CORRECT = 'MARK_AS_CORRECT';
export const QUESTION_CONTENT = 'QUESTION_CONTENT';
export const ANSWER_CONTENT = 'ANSWER_CONTENT';

const QuestionReducer = (state, action) => {
  const states = {
    ADD_ANSWER: {...state, answers: [...state.answers, action.payload]},
    REMOVE_ANSWER: {...state, answers: state.answers.filter(a => a.id !== action.payload.id)},
    MARK_AS_CORRECT: {...state, correctAnswer: action.payload},
    QUESTION_CONTENT: {...state, question: action.payload},
    ANSWER_CONTENT: {...state, answers: state.answers.map(e => {
      if (e.id === action.payload.id) {
        e.answer = action.payload.answer;
      }
      return e;
    })}
  }

  return states[action.type] || state;
}

export default QuestionReducer;
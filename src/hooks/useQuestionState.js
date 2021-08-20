import { useReducer, useCallback } from "react"
import QuestionReducer, { ADD_ANSWER, REMOVE_ANSWER, MARK_AS_CORRECT, QUESTION_CONTENT, ANSWER_CONTENT } from "../reducers/QuestionReducer"

const useQuestionState = questionState => {
  const [state, dispatch] = useReducer(QuestionReducer, questionState);

  const addAnswer = useCallback(() => {
    dispatch({type: ADD_ANSWER, payload: {id: Date.now(), answer: ''}});
  }, []);

  const removeAnswer = useCallback((answer) => {
    dispatch({type: REMOVE_ANSWER, payload: answer});
  }, []);

  const markAsCorrect = useCallback((answer) => {
    dispatch({ type: MARK_AS_CORRECT, payload: answer });
  }, []);

  const handleChange = useCallback((e) => {
    dispatch({ type: QUESTION_CONTENT, payload: e.target.value.trimLeft() });
  }, []);

  const handleAnswerChange = useCallback(answer => {
    dispatch({type: ANSWER_CONTENT, payload: answer});
  }, []);

  return [
    state,
    addAnswer,
    removeAnswer,
    markAsCorrect,
    handleChange,
    handleAnswerChange,
  ]
}

export default useQuestionState;
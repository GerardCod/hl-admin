import { useReducer, useCallback } from 'react';
import { questionInitialState } from '../utils';
import CreateAssessmentReducer, { ADD_QUESTION, DELETE_QUESTION, SAVE_CONTENT, SAVE_GENERAL_INFO, SAVE_QUESTION } from '../reducers/CreateAssessmentReducer';

const useAssessmentState = (assessmentState) => {
  const [state, dispatch] = useReducer(CreateAssessmentReducer, assessmentState);

  const saveGeneralInfo = useCallback((info) => {
    dispatch({type: SAVE_GENERAL_INFO, payload: info});
  }, []);

  const saveContent = useCallback((content) => {
    dispatch({type: SAVE_CONTENT, payload: content});
  }, []);

  const addQuestion = useCallback(() => {
    const newQuestion = JSON.parse(JSON.stringify(questionInitialState));
    newQuestion.id = Date.now();
    dispatch({type: ADD_QUESTION, payload: newQuestion});
  }, []);

  const removeQuestion = useCallback((question) => {
    dispatch({type: DELETE_QUESTION, payload: question});
  }, []);

  const saveQuestion = useCallback((question) => {
    dispatch({ type: SAVE_QUESTION, payload: question });
  }, []);

  return {
    state,
    saveGeneralInfo,
    saveContent,
    addQuestion,
    removeQuestion,
    saveQuestion,
  }
}

export default useAssessmentState;
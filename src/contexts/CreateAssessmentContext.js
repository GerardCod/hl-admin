import { useCallback, useReducer } from "react";
import { createContext } from "react";
import CreateAssessmentReducer, { ADD_QUESTION, DELETE_QUESTION, SAVE_CONTENT, SAVE_GENERAL_INFO, SAVE_QUESTION } from "../reducers/CreateAssessmentReducer";
import { assessmentInitialState, questionInitialState } from '../utils';

export const CreateAssessmentContext = createContext();

const CreateAssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CreateAssessmentReducer, assessmentInitialState);

  const saveGeneralInfo = useCallback((info) => {
    dispatch({type: SAVE_GENERAL_INFO, payload: info});
  }, []);

  const saveContent = useCallback((content) => {
    dispatch({type: SAVE_CONTENT, payload: content});
  }, []);

  const addQuestion = useCallback(() => {
    dispatch({type: ADD_QUESTION, payload: questionInitialState});
  }, []);

  const removeQuestion = useCallback((question) => {
    dispatch({type: DELETE_QUESTION, payload: question});
  }, []);

  const saveQuestion = useCallback((question) => {
    dispatch({ type: SAVE_QUESTION, payload: question });
  }, []);

  const childProps = {
    state,
    saveGeneralInfo,
    saveContent,
    addQuestion,
    removeQuestion,
    saveQuestion,
  }

  return (
    <CreateAssessmentContext.Provider value={childProps}>
      { children }
    </CreateAssessmentContext.Provider>
  );
}

export default CreateAssessmentProvider;
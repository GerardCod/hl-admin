import { createContext, useReducer } from "react";
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';

export const AssessmentContext = createContext();

const AssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AssessmentReducer, initialState);

  const childProps = {
    state,
  }

  return (
    <AssessmentContext.Provider value={ childProps }>
      { children }
    </AssessmentContext.Provider>
  );
}

export default AssessmentProvider;
import { createContext, useCallback, useReducer, useRef } from "react";
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';
import { firestore } from '../services/Firebase';
import { LOADING, FETCH_DOCUMENTS, ERROR } from '../reducers/Actions';
import { collectIdAndData } from '../utils';
 
export const AssessmentContext = createContext();

const AssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AssessmentReducer, initialState);
  const collectionRef = useRef({});

  const fetchCollection = useCallback(({ onError }) => {
    dispatch({type: LOADING});
    collectionRef.current = firestore.collection('assessments').onSnapshot(
      snapshot => {
        const assessments = snapshot.docs.map(collectIdAndData);
        dispatch({ type: FETCH_DOCUMENTS, payload: assessments });
      },
      error => {
        dispatch({ type: ERROR, payload: error.message });
        onError(error.message);
      }
    ); 
  }, []);

  const childProps = {
    state,
    collectionRef,
    fetchCollection,
  }

  return (
    <AssessmentContext.Provider value={ childProps }>
      { children }
    </AssessmentContext.Provider>
  );
}

export default AssessmentProvider;
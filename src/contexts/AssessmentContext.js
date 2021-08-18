import { createContext, useCallback, useReducer, useRef } from "react";
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';
import { firestore } from '../services/Firebase';
import { LOADING, FETCH_DOCUMENTS, ERROR, RESPONSE_SUCCESS } from '../reducers/Actions';
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

  const createAssessment = useCallback(async (assessment, {onSuccess, onError, final}) => {
    dispatch({ type: LOADING });
    try {
      const today = new Date();
      assessment.postDate = today.toLocaleDateString('es-MX');
      assessment.postTime = today.toLocaleTimeString('es-MX');
      await firestore.collection('assessments').add(assessment);
      dispatch({ type: RESPONSE_SUCCESS });
      onSuccess('Evaluación creada exitosamente');
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
      onError(error.message);
    } finally {
      localStorage.removeItem('assessment');
      final(true);
    }
  }, []);

  const childProps = {
    state,
    collectionRef,
    fetchCollection,
    createAssessment,
  }

  return (
    <AssessmentContext.Provider value={ childProps }>
      { children }
    </AssessmentContext.Provider>
  );
}

export default AssessmentProvider;
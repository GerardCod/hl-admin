import { createContext, useCallback, useReducer, useRef } from "react";
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';
import { firestore } from '../services/Firebase';
import { LOADING, FETCH_DOCUMENTS, ERROR, RESPONSE_SUCCESS, DOCUMENT_FOUND } from '../reducers/Actions';
import { addPostDateAndTime, collectIdAndData, sortItems } from '../utils';

export const AssessmentContext = createContext();

const AssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AssessmentReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

  const fetchCollection = useCallback(({ onError }) => {
    dispatch({ type: LOADING });
    collectionRef.current = firestore.collection('assessments').onSnapshot(
      snapshot => {
        const assessments = snapshot.docs.map(collectIdAndData);
        const sortedAssessments = sortItems(assessments);
        dispatch({ type: FETCH_DOCUMENTS, payload: sortedAssessments });
      },
      error => {
        dispatch({ type: ERROR, payload: error.message });
        onError(error.message);
      }
    );
  }, []);

  const createAssessment = useCallback(async (assessment, { onSuccess, onError, final }) => {
    dispatch({ type: LOADING });
    try {
      assessment = addPostDateAndTime(assessment);
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

  const fetchAssessment = useCallback((id, { onError }) => {
    dispatch({type: LOADING});
    documentRef.current = firestore.doc(`assessments/${id}`).onSnapshot(
      snapshot => {
        const assessment = collectIdAndData(snapshot);
        dispatch({type: DOCUMENT_FOUND, payload: assessment});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const updateAssessment = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`assessments/${data.id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Evaluación actualizada');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const removeAssessment = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`assessments/${data.id}`).delete();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('La evaluación ha sido eliminada');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const childProps = {
    state,
    collectionRef,
    documentRef,
    fetchCollection,
    createAssessment,
    fetchAssessment,
    updateAssessment,
    removeAssessment,
  }

  return (
    <AssessmentContext.Provider value={childProps}>
      {children}
    </AssessmentContext.Provider>
  );
}

export default AssessmentProvider;
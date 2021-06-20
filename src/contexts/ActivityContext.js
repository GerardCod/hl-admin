import React, { createContext, useCallback, useReducer, useRef } from 'react';
import ActivityReducer, { initialState } from '../reducers/ActivityReducer';
import { ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import { firestore } from '../services/Firebase';
import { collectIdAndData } from '../utils';

export const ActivityContext = createContext();

const ActivityProvider = ({children}) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  const listenerRef = useRef({});

  const createActivity = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.collection('activities').add(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Actividad creada exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const fetchActivities = useCallback(({onError}) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('activities').onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_DOCUMENTS, payload: docs});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );;
  }, []);

  const childrenProps = { state, createActivity, fetchActivities, listenerRef };

  return (
    <ActivityContext.Provider value={childrenProps}>
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;
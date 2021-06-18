import React, { createContext, useCallback, useReducer } from 'react';
import ActivityReducer, { initialState } from '../reducers/ActivityReducer';
import { ERROR, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import { firestore } from '../services/Firebase';

export const ActivityContext = createContext();

const ActivityProvider = ({children}) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

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

  const childrenProps = { state, createActivity };

  return (
    <ActivityContext.Provider value={childrenProps}>
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;
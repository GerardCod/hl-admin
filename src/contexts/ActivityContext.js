import React, { createContext, useCallback, useReducer, useRef } from 'react';
import ActivityReducer, { initialState } from '../reducers/ActivityReducer';
import { DOCUMENT_FOUND, ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import { firestore } from '../services/Firebase';
import { collectIdAndData } from '../utils';


export const ActivityContext = createContext();

const ActivityProvider = ({children}) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  const listenerRef = useRef({});

  const createActivity = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      const today = new Date();
      data.postDate = today.toLocaleDateString('es-MX');
      data.postTime = today.toLocaleTimeString('es-MX');
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

  const activityDetails = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.doc(`activities/${id}`).onSnapshot(
      snapshot => {
        const document = collectIdAndData(snapshot);
        dispatch({type: DOCUMENT_FOUND, payload: document});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const editActivity = useCallback(async (id, data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`activities/${id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Actividad actualizada correctamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    } 
  }, []);

  const deleteActivity = useCallback(async (id, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`activities/${id}`).delete();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Actividad eliminada correctamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const addCommentToSubmit = useCallback(async ({activity, submit, comment}, {onError}) => {
    dispatch({type: LOADING});
    try {
      if (!submit.comments) {
        submit.comments = [];
      }

      submit.comments.push(comment);
      const submitsFiltered = activity.submits.filter(e => e.user.email !== submit.user.email);
      activity.submits = [...submitsFiltered, submit];
      await firestore.doc(`activities/${activity.id}`).update(activity);
      dispatch({type: RESPONSE_SUCCESS});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const childrenProps = { 
    state, 
    listenerRef,
    createActivity,
    fetchActivities,
    activityDetails,
    editActivity,
    deleteActivity,
    addCommentToSubmit,
  };

  return (
    <ActivityContext.Provider value={childrenProps}>
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;
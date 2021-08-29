import React, { createContext, useCallback, useReducer, useRef } from "react";
import { firestore, storage } from '../services/Firebase';
import PodcastReducer, { initialState } from '../reducers/PodcastReducer';
import { FETCH_DOCUMENTS, LOADING, ERROR, RESPONSE_SUCCESS, DOCUMENT_FOUND } from "../reducers/Actions";
import { addPostDateAndTime, collectIdAndData } from '../utils';

export const PodcastContext = createContext();

const PodcastProvider = ({children}) => {
  const [state, dispatch] = useReducer(PodcastReducer, initialState);
  const listenerRef = useRef({});
  const podcastRef = useRef({});

  const fetchPodcasts = useCallback((errorCallback) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('podcasts')
    .onSnapshot(snapshot => {
      const podcasts = snapshot.docs.map(collectIdAndData);
      dispatch({type: FETCH_DOCUMENTS, payload: podcasts});
    }, error => {
      dispatch({type: ERROR, payload: error.message});
      errorCallback(error.message);
    });
  }, []);

  const uploadPodcast = useCallback(async (data, audio, {onError, onSuccess}) => {
    dispatch({type: LOADING});
    try {
      const urlRef = await storage.ref().child('podcasts').child(`podcast-${Date.now()}`).put(audio);
      const url = await urlRef.ref.getDownloadURL();
      data = addPostDateAndTime(data);
      await firestore.collection('podcasts').add({...data, url});
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess()
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const getPodcastById = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    podcastRef.current = firestore.doc(`podcasts/${id}`)
    .onSnapshot(docSnapshot => {
      const document = collectIdAndData(docSnapshot);
      console.log(document);
      dispatch({type: DOCUMENT_FOUND, payload: document});
    }, error => {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    });
  }, []);

  const editPodcast = useCallback(async (id, data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`podcasts/${id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS}); 
      onSuccess();
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message)
    }
  }, []);

  const removePodcast = useCallback(async (id, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`podcasts/${id}`).delete();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess();
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    } 
  }, []);

  const addComment = useCallback(async (podcast, comment, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!podcast.comments) {
        podcast.comments = [];
      }

      podcast.comments.push(comment);
      await firestore.doc(`podcasts/${podcast.id}`).update(podcast);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Se ha agregado tu comentario');
    } catch (error) {
      onError(error.message);
      dispatch({type: ERROR, payload: error.message});
    }
  }, []);

  const childProps = {
    fetchPodcasts, 
    state, 
    listenerRef, 
    uploadPodcast, 
    getPodcastById, 
    podcastRef, 
    editPodcast, 
    removePodcast,
    addComment
  }

  return (
    <PodcastContext.Provider value={childProps}>
      { children }
    </PodcastContext.Provider>
  );
}

export default PodcastProvider;
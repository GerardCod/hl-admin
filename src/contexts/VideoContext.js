import React, {createContext, useCallback, useReducer, useRef } from 'react';
import { DOCUMENT_FOUND, ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';
import { addPostDateAndTime, collectIdAndData, detectAndCreateLinks, sortItems } from '../utils';

export const VideoContext = createContext();

const VideoProvider = ({children}) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);
  const listenerRef = useRef({});
  const videoListenerRef = useRef({});

  const uploadVideo = useCallback(async (video, file) => {
    dispatch({type: LOADING});
    try {
      const response = await storage.ref().child('videos').child(`video-${Date.now()}`).put(file);
      const url = await response.ref.getDownloadURL();
      video.url = url;
      video = addPostDateAndTime(video)
      await firestore.collection('videos').add(video);
      dispatch({type: RESPONSE_SUCCESS});
    } catch(e) {
      dispatch({type: ERROR, payload: e.message})
      return e;
    }
  }, []);

  const fetchVideos = useCallback(() => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('videos').onSnapshot(snapshot => {
      const videos = snapshot.docs.map(collectIdAndData);
      const sortedVideos = sortItems(videos);
      dispatch({type: FETCH_VIDEOS_SUCCESS, payload: sortedVideos});
    });
  }, []);

  const getVideo = useCallback(async (id, errorCallback) => {
    dispatch({type: LOADING});
    try {
      const docRef = await firestore.doc(`videos/${id}`).get();
      const payload = collectIdAndData(docRef);
      const processedVideo = detectAndCreateLinks('description', payload);
      dispatch({type: DOCUMENT_FOUND, processedVideo})
    } catch (e) {
      dispatch({type: ERROR, payload: e.message});
      errorCallback(e.message);
    } 
  }, []);

  const getAndObserveVideo = useCallback((id, errorCallback) => {
    dispatch({type: LOADING});
    videoListenerRef.current = firestore.doc(`videos/${id}`).onSnapshot(videoSnapshot => {
      const video = collectIdAndData(videoSnapshot);
      dispatch({type: DOCUMENT_FOUND, payload: video});
    }, error => {
      dispatch({type: ERROR, payload: error.message});
      errorCallback(error.message);
    });
  }, []);

  const editVideo = useCallback(async (id, data) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`videos/${id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS});
    } catch (e) {
      dispatch({type: ERROR, payload: e.message})
    }
  }, []);

  const removeVideo = useCallback(async (id, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`videos/${id}`).delete();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('El vídeo fue eliminado con éxito');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const addComment = useCallback(async (video, comment, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!video.comments) {
        video.comments = [];
      }

      video.comments.push(comment);
      await firestore.doc(`videos/${video.id}`).update(video);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Tu comentario ha sido agregado');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  },[]);

  const propsChildren = { 
    state, 
    listenerRef, 
    videoListenerRef, 
    uploadVideo, 
    fetchVideos, 
    getVideo, 
    editVideo, 
    getAndObserveVideo, 
    removeVideo,
    addComment,
  };
   

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
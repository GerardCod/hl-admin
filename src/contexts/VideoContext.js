import React, {createContext, useCallback, useReducer, useRef } from 'react';
import { DOCUMENT_FOUND, ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';
import { collectIdAndData } from '../utils';

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
      video.createdAt = Date.now();
      await firestore.collection('videos').add(video);
      dispatch({type: RESPONSE_SUCCESS});
    } catch(e) {
      dispatch({type: ERROR, payload: e.message})
      return e;
    }
  }, []);

  const fetchVideos = useCallback(() => {
    listenerRef.current = firestore.collection('videos').onSnapshot(snapshot => {
      const videos = snapshot.docs.map(collectIdAndData).sort((a, b) => a.createdAt - b.createdAt);
      dispatch({type: FETCH_VIDEOS_SUCCESS, payload: videos});
    });
  }, []);

  const getVideo = useCallback(async (id) => {
    dispatch({type: LOADING});
    try {
      const docRef = await firestore.doc(`videos/${id}`).get();
      const payload = collectIdAndData(docRef);
      dispatch({type: DOCUMENT_FOUND, payload})
    } catch (e) {
      dispatch({type: ERROR, payload: e.message});
    } 
  }, []);

  const getAndObserveVideo = useCallback((id) => {
    dispatch({type: LOADING});
    videoListenerRef.current = firestore.doc(`videos/${id}`).onSnapshot(videoSnapshot => {
      const video = collectIdAndData(videoSnapshot);
      dispatch({type: DOCUMENT_FOUND, payload: video});
    }, error => {
      dispatch({type: ERROR, payload: error.message});
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

  const propsChildren = { state, uploadVideo, fetchVideos, listenerRef, getVideo, editVideo, getAndObserveVideo, videoListenerRef};

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
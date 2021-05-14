import React, {createContext, useCallback, useReducer, useRef } from 'react';
import { ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';
import { collectIdAndData } from '../utils';

export const VideoContext = createContext();

const VideoProvider = ({children}) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);
  const listenerRef = useRef({});

  const uploadVideo = useCallback(async (video, file) => {
    dispatch({type: LOADING});
    try {
      const response = await storage.ref().child('videos').child(`video-${Date.now()}`).put(file);
      const url = await response.ref.getDownloadURL();
      video.url = url;
      video.createdAt = Date.now();
      await firestore.collection('videos').add(video);
      dispatch({type: RESPONSE_SUCCESS})
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

  const getVideo = useCallback((id) => {
    return state.videos.find(video => video.id === id);
  }, []);

  const propsChildren = { state, uploadVideo, fetchVideos, listenerRef, getVideo };

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
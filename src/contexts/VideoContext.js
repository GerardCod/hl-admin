import React, {createContext, useCallback, useReducer} from 'react';
import { useRef } from 'react/cjs/react.development';
import { ERROR, FETCH_VIDEOS_SUCCESS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';
import { collectIdAndData } from '../utils';

export const VideoContext = createContext();

const VideoProvider = ({children}) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);
  const listener = useRef();

  const uploadVideo = useCallback(async (video, file) => {
    dispatch({type: LOADING});
    try {
      const response = await storage.ref().child('videos').child(`video-${Date.now()}`).put(file);
      const url = await response.ref.getDownloadURL();
      video.url = url;
      await firestore.collection('videos').add(video);
      dispatch({type: RESPONSE_SUCCESS})
    } catch(e) {
      dispatch({type: ERROR, payload: e.message})
      return e;
    }
  }, []);

  const fetchVideos = useCallback(() => {
    listener.current = firestore.collection('videos').onSnapshot(snapshot => {
      const videos = snapshot.docs.map(collectIdAndData);
      dispatch({type: FETCH_VIDEOS_SUCCESS, payload: videos});
    });
  }, []);

  const propsChildren = { state, uploadVideo, fetchVideos };

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
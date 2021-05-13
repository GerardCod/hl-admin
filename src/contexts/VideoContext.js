import React, {createContext, useCallback, useReducer} from 'react';
import { ERROR, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';

export const VideoContext = createContext();

const VideoProvider = ({children}) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

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

  const propsChildren = { state, uploadVideo };

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
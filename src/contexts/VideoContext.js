import React, {useCallback, useContext, useReducer} from 'react';
import { ERROR, LOADING } from '../reducers/Actions';
import VideosReducer, {initialState} from '../reducers/VideosReducer';
import { firestore, storage } from '../services/Firebase';

export const VideoContext = useContext();

const VideoProvider = ({children}) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const UploadVideo = useCallback(async (video, file) => {
    dispatch({type: LOADING});
    try {
      const response = await storage.ref().child('videos').child(`video-${Date.now()}`).put(file);
      const url = response.ref.getDownloadURL();
      video.url = url;
      await firestore.collection('videos').add(video);
    } catch(e) {
      dispatch({type: ERROR, payload: e.message})
    }
  }, []);

  const propsChildren = { state, UploadVideo };

  return (
    <VideoContext.Provider value={propsChildren}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;
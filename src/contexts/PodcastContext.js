import { createContext, useCallback, useReducer, useRef } from "react";
import { firestore } from '../services/Firebase';
import PodcastReducer, { initialState } from '../reducers/PodcastReducer';
import { FETCH_DOCUMENTS, LOADING } from "../reducers/Actions";
import { collectIdAndData } from '../utils';

export const PodcastContext = createContext();

const PodcastProvider = ({children}) => {
  const [state, dispatch] = useReducer(PodcastReducer, initialState);
  const listenerRef = useRef({});

  const fetchVideos = useCallback((errorCallback) => {
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

  const childProps = {fetchVideos, state}

  return (
    <PodcastContext.Provider value={childProps}>
      { children }
    </PodcastContext.Provider>
  );
}

export default PodcastProvider;
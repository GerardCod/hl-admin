import { createContext, useCallback, useReducer, useRef } from "react";
import AvatarReducer, { initialState } from "../reducers/AvatarReducer";
import { ERROR, FETCH_DOCUMENTS, LOADING } from '../reducers/Actions';
import { firestore } from '../services/Firebase';
import { collectIdAndData } from '../utils';

export const AvatarContext = createContext();

const AvatarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AvatarReducer, initialState);
  const listenerRef = useRef();

  const fetchAvatars = useCallback(({onError}) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('avatars').onSnapshot(
      snapshot => {
        const avatars = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_DOCUMENTS, payload: avatars});
      }, error => {
        dispatch({type: ERROR, payload: error.message})
        onError(error.message);
      }
    );
  }, []);
  
  const childProps = { fetchAvatars, state, listenerRef }

  return (
    <AvatarContext.Provider value={childProps}>
      { children }
    </AvatarContext.Provider>
  );
}

export default AvatarProvider;
import { createContext, useCallback, useReducer, useRef } from "react";
import MaterialReducer, { initialState } from '../reducers/MaterialReducer';
import { ERROR, FETCH_AUDIOS, FETCH_BOOKS, FETCH_VIDEOS, LOADING } from '../reducers/Actions';
import { firestore } from '../services/Firebase';
import { addLinkToDocumentData } from '../utils';

export const MaterialContext = createContext();

const MaterialProvider = function Component({children}) {
  const [state, dispatch] = useReducer(MaterialReducer, initialState);
  const videosRef = useRef({});
  const audiosRef = useRef({});
  const booksRef = useRef({});

  const fetchVideos = useCallback(function callback({onError}) {
    dispatch({type: LOADING});
    videosRef.current = firestore.collection('videos').onSnapshot(
      snapshot => {
        const videos = snapshot.docs.map(doc => addLinkToDocumentData(doc));
        dispatch({type: FETCH_VIDEOS, payload: videos});
      },
      error => {
        onError(error.message)
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const fetchAudios = useCallback(function callback({onError}) {
    dispatch({type: LOADING});
    audiosRef.current = firestore.collection('podcasts').onSnapshot(
      snapshot => {
        const audios = snapshot.docs.map(doc => addLinkToDocumentData(doc, 'podcasts'));
        dispatch({type: FETCH_AUDIOS, payload: audios});
      },
      error => {
        onError(error.message)
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const fetchBooks = useCallback(function callback({onError}) {
    dispatch({type: LOADING});
    booksRef.current = firestore.collection('books').onSnapshot(
      snapshot => {
        const books = snapshot.docs.map(doc => addLinkToDocumentData(doc, 'books'));
        dispatch({type: FETCH_BOOKS, payload: books});
      },
      error => {
        onError(error.message);
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const childProps = {
    state,
    videosRef,
    audiosRef,
    booksRef,
    fetchVideos,
    fetchAudios,
    fetchBooks,
  }

  return (
    <MaterialContext.Provider value={childProps}>
      { children }
    </MaterialContext.Provider>
  );
}

export default MaterialProvider;
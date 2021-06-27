import React, { createContext, useCallback, useReducer, useRef } from "react";
import BooksReducer, { initialState } from "../reducers/BooksReducer";
import { firestore, storage } from '../services/Firebase';
import { collectIdAndData } from '../utils';
import { ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';

export const BooksContext = createContext();

const BooksProvider = ({children}) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);
  const listenerRef = useRef({});

  const fetchDocuments = useCallback(({onError}) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('books').onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_DOCUMENTS, payload: docs});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const uploadBook = useCallback(async (data, file, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      const response = await storage.ref().child('books').child(`book-${Date.now()}`).put(file);
      const url = await response.ref.getDownloadURL();
      data.url = url;
      await firestore.collection('books').add(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Libro subido exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const childProps = {state, fetchDocuments, uploadBook, listenerRef};

  return (
    <BooksContext.Provider value={childProps}>
      { children }
    </BooksContext.Provider> 
  );
}

export default BooksProvider;
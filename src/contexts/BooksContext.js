import React, { createContext, useCallback, useReducer, useRef } from "react";
import BooksReducer, { initialState } from "../reducers/BooksReducer";
import { firestore, storage } from '../services/Firebase';
import { addPostDateAndTime, collectIdAndData } from '../utils';
import { DOCUMENT_FOUND, ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);
  const listenerRef = useRef({});
  const bookRef = useRef({});

  const fetchDocuments = useCallback(({ onError }) => {
    dispatch({ type: LOADING });
    listenerRef.current = firestore.collection('books').onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(collectIdAndData);
        dispatch({ type: FETCH_DOCUMENTS, payload: docs });
      },
      error => {
        dispatch({ type: ERROR, payload: error.message });
        onError(error.message);
      }
    );
  }, []);

  const uploadBook = useCallback(async (data, file, { onSuccess, onError }) => {
    dispatch({ type: LOADING });
    try {
      const url = await uploadFile(file);
      data.url = url;
      data = addPostDateAndTime(data);
      await firestore.collection('books').add(data);
      dispatch({ type: RESPONSE_SUCCESS });
      onSuccess('Libro subido exitosamente');
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
      onError(error.message);
    }
  }, []);

  const getBook = useCallback((id, { onError }) => {
    dispatch({ type: LOADING });
    bookRef.current = firestore.doc(`books/${id}`).onSnapshot(
      snapshot => {
        const doc = collectIdAndData(snapshot);
        dispatch({ type: DOCUMENT_FOUND, payload: doc });
      },
      error => {
        dispatch({ type: ERROR, payload: error.message });
        onError(error.message);
      }
    );
  }, []);

  const editBook = useCallback(async (data, file, { onSuccess, onError }) => {
    dispatch({ type: LOADING });
    try {
      if (file) {
        const url = await uploadFile(file);
        data.url = url;
      }
      await firestore.doc(`books/${data.id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Libro actualizado exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const deleteBook = useCallback(async (id, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`books/${id}`).delete();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Libro eliminado exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const uploadFile = async (file) => {
    const response = await storage.ref().child('books').child(`book-${Date.now()}`).put(file);
    const url = await response.ref.getDownloadURL();
    return url;
  }

  const childProps = { state, fetchDocuments, uploadBook, listenerRef, getBook, bookRef, editBook, deleteBook };

  return (
    <BooksContext.Provider value={childProps}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
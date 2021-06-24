import React, { createContext, useCallback, useReducer, useRef } from "react";
import BooksReducer, { initialState } from "../reducers/BooksReducer";
import { firestore } from '../services/Firebase';
import { collectIdAndData } from '../utils';
import { ERROR, FETCH_DOCUMENTS, LOADING } from '../reducers/Actions';

export const BooksContext = createContext();

const BooksProvider = ({children}) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);
  const listenerRef = useRef({});

  const fetchDocuments = useCallback(() => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('books').onSnapshot(
      snapshot => {
        const docs = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENTS, payload: docs});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const childProps = {state, fetchDocuments};

  return (
    <BooksContext.Provider value={childProps}>
      { children }
    </BooksContext.Provider> 
  );
}

export default BooksProvider;
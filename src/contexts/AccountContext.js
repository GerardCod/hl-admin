import { createContext, useCallback, useReducer } from "react";
import { firestore } from '../services/Firebase';
import { collectIdAndData } from '../utils';
import AccountReducer, { initialState } from '../reducers/AccountReducer';
import { ERROR, FETCH_DOCUMENTS, LOADING } from '../reducers/Actions';

export const AccountContext = createContext();

const AccountProvider = ({children}) => {
  const [state, dispatch] = useReducer(AccountReducer, initialState);
  const listenerRef = useRef();
  
  const fetchDocuments = useCallback(({onError}) => {
    dispatch({type: LOADING});
    listenerRef.current = firestore.collection('accounts').onSnapshot(
      snapshot => {
        const documents = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_DOCUMENTS, payload: documents});
      }, error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);
  
  const childProps = { fetchDocuments, state, listenerRef }

  return (
    <AccountContext.Provider value={ childProps }>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
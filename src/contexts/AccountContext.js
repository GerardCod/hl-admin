import { createContext, useCallback, useReducer, useRef } from "react";
import { firestore } from '../services/Firebase';
import { collectIdAndData, roles } from '../utils';
import AccountReducer, { initialState } from '../reducers/AccountReducer';
import { ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';

export const AccountContext = createContext();

const AccountProvider = ({children}) => {
  const [state, dispatch] = useReducer(AccountReducer, initialState);
  const listenerRef = useRef();
  
  const fetchAccounts = useCallback(({onError}) => {
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
  
  const createStudentAccount = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.collection('accounts').add(data);
      data.role = roles[1];
      data.name = `Tutor de ${data.name}`;
      await firestore.collection('accounts').add(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Cuentas de estudiante y tutor creadas con éxito');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const createAccount = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.collection('accounts').add(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Cuenta creada exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    } 
  }, []);

  const childProps = { fetchAccounts, state, listenerRef, createStudentAccount, createAccount }

  return (
    <AccountContext.Provider value={ childProps }>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
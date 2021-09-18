import React, { createContext, useCallback, useReducer, useRef } from "react";
import { auth, batch, firestore } from '../services/Firebase';
import { addPostDateAndTime, collectIdAndData, roles } from '../utils';
import AccountReducer, { initialState } from '../reducers/AccountReducer';
import { DOCUMENT_FOUND, ERROR, FETCH_DOCUMENTS, LOADING, RESPONSE_SUCCESS } from '../reducers/Actions';

export const AccountContext = createContext();

const AccountProvider = ({children}) => {
  const [state, dispatch] = useReducer(AccountReducer, initialState);
  const listenerRef = useRef();
  const accountRef = useRef();
  
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
  
  const createAuthAccount = useCallback(async ({email, password}) => {
    try {
      const userData = await auth.createUserWithEmailAndPassword(email, password);
      return userData.user.uid;
    } catch (error) {
      return error;
    }
  }, []);

  const createStudentAccount = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      const uid = await createAuthAccount(data);
      data.uid = uid;
      delete data.confirmPassword;
      await firestore.collection('accounts').add(data);

      data.role = roles[1];
      data.name = `Tutor de ${data.name}`;
      await firestore.collection('accounts').add(data);

      await auth.currentUser.sendEmailVerification();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Cuentas de estudiante y tutor creadas con éxito');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    } finally {
      auth.signOut();
    }
  }, [createAuthAccount]);

  const createAccount = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      const uid = await createAuthAccount(data);
      data.uid = uid;
      delete data.confirmPassword;
      data = addPostDateAndTime(data);
      await firestore.collection('accounts').add(data);
      await auth.currentUser.sendEmailVerification();
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Cuenta creada exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    } finally {
      auth.signOut();
    }
  }, [createAuthAccount]);

  const getAccount = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    accountRef.current = firestore.doc(`accounts/${id}`).onSnapshot(
      snapshot => {
        const account = collectIdAndData(snapshot);
        dispatch({type: DOCUMENT_FOUND, payload: account});
      }, error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const editAccount = useCallback(async (id, data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await firestore.doc(`accounts/${id}`).update(data);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess('Cuenta actualizada con éxito');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const deleteAccount = useCallback(async ({email}, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      firestore.collection('accounts').where('email', '==', email).get()
        .then(collection => {
          collection.forEach(doc => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        }).then(() => {
          onSuccess('Cuenta(s) eliminada(s) exitosamente');
          dispatch({type: RESPONSE_SUCCESS});
        });
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message)
    }
  }, []);

  const childProps = { fetchAccounts, state, listenerRef, createStudentAccount, createAccount, getAccount, accountRef, editAccount, deleteAccount }

  return (
    <AccountContext.Provider value={ childProps }>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
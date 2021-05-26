import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import EditAccountForm from '../components/EditAccountForm';
import Loader from '../components/Loader';
import { AccountContext } from '../contexts/AccountContext';
import { onError } from '../utils';

const EditAccountPage = () => {
  const { id } = useParams();
  const { state: { accountSelected }, getAccount, accountRef } = useContext(AccountContext);

  useEffect(() => {
    getAccount(id, { onError });
    const subscriber = accountRef.current;

    return () => {
      subscriber();
    }
  }, [getAccount, accountRef, id]);

  return (
    <>
      <Back urlBack="/admin/accounts" />
      <h1>Modificación de cuenta</h1>
      {
        accountSelected ?
          <EditAccountForm account={accountSelected} />
          : <Loader text="Cargando datos de la cuenta" />
      }
    </>
  );
}

export default EditAccountPage;
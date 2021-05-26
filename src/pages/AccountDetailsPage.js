import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import { AccountContext } from '../contexts/AccountContext';
import { onError } from '../utils';
import Loader from '../components/Loader';

const AccountDetailsPage = () => {
  const { state: { accountSelected }, accountRef, getAccount } = useContext(AccountContext);
  const { id } = useParams();

  useEffect(() => {
    getAccount(id, { onError });
    const subscriber = accountRef.current;

    return () => {
      subscriber();
    }
  }, [accountRef, id, getAccount]);

  console.log(accountSelected);

  return (
    <>
      <Back urlBack="/admin/accounts" />
      <h1>Detalles de la cuenta</h1>
      {
        !accountSelected ?
          <Loader text="Cargando datos de la cuenta" /> :
          <article className="flex Account">
            <figure className="Account__Avatar">
              <img src={accountSelected.avatar} alt="avatar" />
            </figure>
            <div className="Account__Details">
              <h2>{accountSelected.name}</h2>
              <p>{accountSelected.email}</p>
              <p>{accountSelected.role.name}</p>
            </div>
          </article>
      }
    </>
  );
}

export default AccountDetailsPage;
import React, { useContext, useEffect } from 'react';
import Illustration from '../components/Illustration';
import Loader from '../components/Loader';
import { AccountContext } from '../contexts/AccountContext';
import { onError } from '../utils';
import peopleImg from '../assets/people.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AccountsPage = () => {
  const { fetchAccounts, state, listenerRef } = useContext(AccountContext);

  useEffect(() => {
    fetchAccounts({ onError });
    const subscribe = listenerRef.current;

    return () => {
      subscribe();
    }
  }, [listenerRef, fetchAccounts]);

  return (
    <div>
      <header className="flex VideosHeader">
        <h1>Cuentas de usuario</h1>
        <Link to="/admin/accounts/new" className="Button AddVideo Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Crear nueva cuenta</span>
        </Link>
      </header>
      {
        state.loading ?
          <Loader text="Cargando cuentas de usuario" />
          : (state.accounts && state.accounts.length > 0) ?
            <div>Hay cuentas de usuario</div> :
            <Illustration illustration={peopleImg} message="No hay usuarios registrados en la plataforma" />
      }
    </div>
  );
}

export default AccountsPage;
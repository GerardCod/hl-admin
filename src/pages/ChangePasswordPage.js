import React, { useContext, useEffect } from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { AuthContext } from '../contexts/AuthContext';
import useQueryParams from '../hooks/useQueryParams';
import { onError } from '../utils';
import Loader from '../components/Loader';
import Illustration from '../components/Illustration';
import email from '../assets/email.png';

const ChangePasswordPage = () => {
  const { state, verifyEmailCode } = useContext(AuthContext);
  let query = useQueryParams();

  useEffect(() => {
    verifyEmailCode(query.get('oobCode'), { onError });
  }, [query, verifyEmailCode])

  return (
    <div className="width--full height--fullscreen back--gradient-blue flex f-justify--center f-align--center">
      {
        state.loading ?
          <Loader text="Verificando código de cambio de contraseña" />
          : state.reset_status ?
            <Illustration illustration={email} message={state.reset_status} /> :
            <ChangePasswordForm code={query.get('oobCode')} />
      }

    </div>
  );
}

export default ChangePasswordPage;
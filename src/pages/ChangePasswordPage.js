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
  const getParams = useQueryParams();

  useEffect(() => {
    const query = getParams();
    verifyEmailCode(query.get('oobCode'), { onError });
  }, [verifyEmailCode, getParams])

  return (
    <div className="width--full height--fullscreen back--gradient-blue flex f-justify--center f-align--center">
      {
        state.loading ?
          <Loader text="Verificando código de cambio de contraseña" light />
          : state.reset_status ?
            <Illustration illustration={email} message={state.reset_status} /> :
            <ChangePasswordForm code={getParams().get('oobCode')} />
      }
    </div>
  );
}

export default ChangePasswordPage;
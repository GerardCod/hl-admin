import React, {Fragment} from 'react';
import Back from '../components/Back';
import CreateAccountForm from '../components/CreateAccountForm';

const CreateAccountPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/accounts" />
      <h1>Crear nueva cuenta de usuario</h1>
      <CreateAccountForm />
    </Fragment>
  );
}

export default CreateAccountPage;
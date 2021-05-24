import React from 'react';
import Back from '../components/Back';
import CreateAccountForm from '../components/CreateAccountForm';

const CreateAccountPage = () => {
  return (
    <>
      <Back urlBack="/admin/accounts" />
      <h1>Crear nueva cuenta de usuario</h1>
      <CreateAccountForm />
    </>
  );
}

export default CreateAccountPage;
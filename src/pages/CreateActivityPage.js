import React, { Fragment } from 'react';
import Back from '../components/Back';
import CreateActivityForm from '../components/CreateActivityForm';

const CreateActivityPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/activities" />
      <h1>Crear actividad</h1>
      <CreateActivityForm />
    </Fragment>
  );
}

export default CreateActivityPage;
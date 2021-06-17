import React, { Fragment } from 'react';
import Back from '../components/Back';

const CreateActivityPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/activities" />
      <h1>Crear actividad</h1>
    </Fragment>
  );
}

export default CreateActivityPage;
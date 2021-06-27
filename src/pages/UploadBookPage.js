import React from 'react';
import { Fragment } from 'react-is';
import Back from '../components/Back';
import UploadBookForm from '../components/UploadBookForm';

const UploadBookPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/books" />
      <h1>Subir libro</h1>
      <UploadBookForm />
    </Fragment>
  );
}

export default UploadBookPage;
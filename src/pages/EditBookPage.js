import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../components/Back';
import EditBookForm from '../components/EditBookForm';
import { BooksContext } from '../contexts/BooksContext';
import { onError } from '../utils';
import Loader from '../components/Loader';

const EditBookPage = () => {
  const { state, getBook, bookRef } = useContext(BooksContext);
  const { id } = useParams();

  useEffect(() => {
    getBook(id, { onError });
    const subscriber = bookRef.current;

    return () => {
      subscriber();
    }
  }, [id, getBook, bookRef]);

  return (
    <Fragment>
      <Back urlBack="/admin/books" />
      {
        state.bookSelected ?
        <EditBookForm book={state.bookSelected} /> :
        <Loader text="Cargando libro" />
      }
    </Fragment>
  );
}

export default EditBookPage;
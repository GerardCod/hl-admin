import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import { BooksContext } from '../contexts/BooksContext';
import Loader from '../components/Loader';
import { onError } from '../utils';
import TextDescription from '../components/TextDescription';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { state, getBook, bookRef } = useContext(BooksContext);

  useEffect(() => {
    getBook(id, {onError});
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
          <main>
            <h1>
              <a href={state.bookSelected.url} target="_blank" rel="noreferrer">{state.bookSelected.title}</a>
            </h1>
            <TextDescription text={state.bookSelected.description} />
            <iframe src={state.bookSelected.url} title={state.bookSelected.title} className="BookViewer"></iframe>
          </main> :
          <Loader text="Cargando libro" />
      }
    </Fragment>
  );
}

export default BookDetailsPage;
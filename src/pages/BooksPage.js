import React, { useContext, useEffect } from 'react';
import { Fragment } from 'react-is';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Illustration from '../components/Illustration';
import { BooksContext } from '../contexts/BooksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { onError } from '../utils';
import BookItem from '../components/BookItem';

const BooksPage = () => {
  const { state, fetchDocuments, listenerRef } = useContext(BooksContext);

  useEffect(() => {
    fetchDocuments({onError});
    const subscriber = listenerRef.current;
    
    return () => {
      subscriber();
    }
  }, [fetchDocuments, listenerRef])

  return (
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Libros</h1>
        <Link to="/admin/books/upload" className="Button Button--Icon Button--Add Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir libro</span>
        </Link>
      </header>
      {
        state.loading ?
          <Loader text="Cargando libros" /> :
          (state.books && state.books.length > 0) ?
          state.books.map(book => <BookItem {...book} key={`book-${book.id}`} />) :
          <Illustration message="No hay libros en la plataforma" />
      }
    </Fragment>
  );
}

export default BooksPage;
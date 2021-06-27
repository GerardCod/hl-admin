import React, { useContext } from 'react';
import { Fragment } from 'react-is';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Illustration from '../components/Illustration';
import img from '../assets/books.png';
import { BooksContext } from '../contexts/BooksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const BooksPage = () => {
  const { state } = useContext(BooksContext);

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
          <p>Hay libros en la plataforma</p> :
          <Illustration illustration={img} message="No hay libros en la plataforma" />
      }
    </Fragment>
  );
}

export default BooksPage;
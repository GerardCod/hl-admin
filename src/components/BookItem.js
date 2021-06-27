import React, { useContext } from 'react';
import { Fragment } from 'react-is';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom'
import { BooksContext } from '../contexts/BooksContext';
import { onError, onSuccess } from '../utils';
import swal from 'sweetalert';

const BookItem = ({ title, id }) => {
  let { path } = useRouteMatch();
  const { deleteBook } = useContext(BooksContext);

  const handleDelete = () => {
    swal({
      title: '¿Realmente desea eliminar este libro?',
      text: 'Luego de eliminarlo, el libro ya no estará disponible',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteBook(id, {onSuccess, onError});
      }
    });
  }

  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faBook} className="ListItem__Icon Icon--Purple" />
          <div className="ListItem__Description">
            <h4>{title}</h4>
          </div>
        </div>
        <div className="flex f-justify--center f-align--center ListItem__Actions">
          <Link to={`${path}/${id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <Link to={`${path}/${id}/edit`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEdit} className="Icon--Purple" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" onClick={handleDelete} />
        </div>
      </article>
    </Fragment>
  );
}

export default BookItem;
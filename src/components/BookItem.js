import React from 'react';
import { Fragment } from 'react-is';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom'

const BookItem = ({ title, id }) => {
  let { path } = useRouteMatch();

  const handleDelete = () => {
    console.log('Deleting the item');
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
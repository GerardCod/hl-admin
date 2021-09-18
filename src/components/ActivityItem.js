import React, { Fragment, useContext } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivityContext } from '../contexts/ActivityContext';
import swal from 'sweetalert';
import { onError, onSuccess } from '../utils';

const ActivityItem = ({title, id, postDate, postTime}) => {
  const {path} = useRouteMatch();
  const { deleteActivity } = useContext(ActivityContext);

  const handleDelete = () => {
    swal({
      title: '¿Realmente desea eliminar esta actividad?',
      text: 'Después de eliminarla, la actividad no volverá a estar disponible en la plataforma.',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteActivity(id, {onSuccess, onError});
      }
    });
  }

  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faFile} className="ListItem__Icon Icon--Success" />
          <div className="ListItem__Description">
            <h4 className="Text--success">{title}</h4>
            <p>Subido el {postDate} a las {postTime}</p>
          </div>
        </div>
        <div className="flex f-justify--center f-align--center ListItem__Actions">
          <Link to={`${path}/details/${id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <Link to={`${path}/${id}/edit`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEdit} className="Icon--Purple" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" onClick={handleDelete}/>
        </div>
      </article>
    </Fragment>
  );
}

export default ActivityItem;
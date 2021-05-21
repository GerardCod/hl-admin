import { faEdit, faEye, faPodcast, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { PodcastContext } from '../contexts/PodcastContext';
import { onSuccess, onError } from '../utils';

const PodcastItem = ({ title, id }) => {
  let { path } = useRouteMatch();
  const { removePodcast } = useContext(PodcastContext);

  const handleDelete = () => {
    swal({
      title: '¿Realmente desea remover este podcast?',
      text: 'Luego de removerlo, el podcast ya no estará disponible',
      icon: 'warning',
      buttons: ['Cancelar', 'Remover'],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        removePodcast(id, {onSuccess: () => onSuccess('Podcast eliminado'), onError});
      }
    });
  }

  return (
    <>
      <article className="flex ListItem">
        <div className="ListItem__Content flex">
          <FontAwesomeIcon icon={faPodcast} className="ListItem__Icon Icon--Orange" />
          <div className="ListItem__Description">
            <h4>{title}</h4>
          </div>
        </div>
        <div className="flex flex--center ListItem__Actions">
          <Link to={`${path}/${id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <Link to={`${path}/${id}/edit`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEdit} className="Icon--Purple" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" onClick={handleDelete}ñ />
        </div>
      </article>
    </>
  );
}

export default PodcastItem;
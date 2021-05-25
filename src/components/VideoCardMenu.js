import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { VideoContext } from '../contexts/VideoContext';
import { onError, onSuccess } from '../utils';

const VideoCardMenu = ({show, id}) => {
  const { url } = useRouteMatch();
  const { removeVideo } = useContext(VideoContext);

  const handleClick = () => {
    swal({
      title: '¿Realmente desea eliminar este vídeo?', 
      text: 'Luego de eliminarlo, el vídeo ya no estará disponible en la plataforma',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
      icon: 'warning',
    }).then((willDelete) => {
      if (willDelete) {
        removeVideo(id, {onSuccess, onError});
      }
    });
  }

  return (
    <div className={`VideoCardMenu flex flex--column ${show ? "reveal" : "reveal--inverse"}`}>
      <Link className="flex VideoCardMenu__Item VideoCardMenu__Item--Blue" to={`${url}/${id}`}>
        <FontAwesomeIcon icon={faEye}/>
        <span>Ver descripción</span>
      </Link>
      <Link className="flex VideoCardMenu__Item VideoCardMenu__Item--Blue" to={`${url}/${id}/edit`}>
        <FontAwesomeIcon icon={faEdit}/>
        <span>Editar vídeo</span>
      </Link>
      <button className="flex VideoCardMenu__Item VideoCardMenu__Item--Blue" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrash} />
        <span>Remover vídeo</span>
      </button>
    </div>
  );
}

export default VideoCardMenu;
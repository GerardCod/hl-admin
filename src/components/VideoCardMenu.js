import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { VideoContext } from '../contexts/VideoContext';

const VideoCardMenu = ({show, id}) => {
  const { url } = useRouteMatch();
  const { removeVideo } = useContext(VideoContext);

  const handleClick = (id) => {
    const onSuccess = () => {
      swal({title: 'Bien hecho', text: 'El video fue removido exitosamente', icon: 'success'});
    }

    const onError = (text) => {
      swal({title: 'Error removiendo el vídeo', text, icon: 'error'});
    }

    removeVideo(id, onSuccess, onError);
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
      <button className="flex VideoCardMenu__Item VideoCardMenu__Item--Blue" onClick={() => handleClick(id)}>
        <FontAwesomeIcon icon={faTrash} />
        <span>Remover vídeo</span>
      </button>
    </div>
  );
}

export default VideoCardMenu;
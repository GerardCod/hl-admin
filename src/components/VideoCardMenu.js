import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const VideoCardMenu = ({show, id}) => {
  const { url } = useRouteMatch();

  console.log(url);
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
    </div>
  );
}

export default VideoCardMenu;
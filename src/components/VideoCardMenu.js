import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCardMenu = ({show, id}) => {
  return (
    <div className={`VideoCardMenu flex flex--column ${show ? "reveal" : "reveal--inverse"}`}>
      <Link className="flex VideoCardMenu__Item VideoCardMenu__Item--Blue" to={`/videos/${id}`}>
        <FontAwesomeIcon icon={faEye}/>
        <span>Ver descripción</span>
      </Link>
    </div>
  );
}

export default VideoCardMenu;
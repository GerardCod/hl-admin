import React from 'react';
import Admin from '../containers/Admin';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const UploadVideoPage = () => {
  return (
    <Admin>
      <h1>Subir vídeo</h1>
      <Link to="/videos" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
    </Admin>
  );
}

export default UploadVideoPage;
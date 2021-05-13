import React from 'react';
import Admin from '../containers/Admin';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UploadVideoForm from '../components/UploadVideoForm';

const UploadVideoPage = () => {
  return (
    <Admin>
      <Link to="/videos" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
      <h1>Subir vídeo</h1>
      <UploadVideoForm />
    </Admin>
  );
}

export default UploadVideoPage;
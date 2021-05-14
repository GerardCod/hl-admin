import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UploadVideoForm from '../components/UploadVideoForm';

const UploadVideoPage = () => {
  return (
    <>
      <Link to="/videos" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
      <h1>Subir vídeo</h1>
      <UploadVideoForm />
    </>
  );
}

export default UploadVideoPage;
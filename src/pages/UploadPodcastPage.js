import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UploadPodcastForm from '../components/UploadPodcastForm';

const UploadPodcastPage = () => {
  return (
    <>
      <Link to="/admin/podcasts" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
      <h1>Subir un podcast</h1>
      <UploadPodcastForm />
    </>
  );
}

export default UploadPodcastPage;
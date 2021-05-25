import React from 'react';
import UploadPodcastForm from '../components/UploadPodcastForm';
import Back from '../components/Back';

const UploadPodcastPage = () => {
  return (
    <>
      <Back urlBack="/admin/podcasts" />
      <h1>Subir un podcast</h1>
      <UploadPodcastForm />
    </>
  );
}

export default UploadPodcastPage;
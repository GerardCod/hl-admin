import React, {Fragment} from 'react';
import UploadPodcastForm from '../components/UploadPodcastForm';
import Back from '../components/Back';

const UploadPodcastPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/podcasts" />
      <h1>Subir un podcast</h1>
      <UploadPodcastForm />
    </Fragment>
  );
}

export default UploadPodcastPage;
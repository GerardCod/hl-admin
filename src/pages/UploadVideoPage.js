import React, {Fragment} from 'react';
import UploadVideoForm from '../components/UploadVideoForm';
import Back from '../components/Back';

const UploadVideoPage = () => {
  return (
    <Fragment>
      <Back urlBack="/admin/videos" />
      <h1>Subir vídeo</h1>
      <UploadVideoForm />
    </Fragment>
  );
}

export default UploadVideoPage;
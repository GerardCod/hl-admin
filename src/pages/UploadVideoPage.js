import React from 'react';
import UploadVideoForm from '../components/UploadVideoForm';
import Back from '../components/Back';

const UploadVideoPage = () => {
  return (
    <>
      <Back urlBack="/admin/videos" />
      <h1>Subir vídeo</h1>
      <UploadVideoForm />
    </>
  );
}

export default UploadVideoPage;
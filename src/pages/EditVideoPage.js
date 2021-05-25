import React, { useEffect, useContext } from 'react';
import EditVideoForm from '../components/EditVideoForm';
import { useParams } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import Loader from '../components/Loader';
import Back from '../components/Back';


const EditVideoPage = () => {
  const { id } = useParams();
  const { getAndObserveVideo, state: {videoSelected, loading}, videoListenerRef} = useContext(VideoContext); 

  useEffect(() => {
    function showErrorMessage(text) {
      swal({title: 'Error obteniendo el vídeo', text, icon: 'error'});
    }

    function executeFetch(id) {
      getAndObserveVideo(id, showErrorMessage);
      return videoListenerRef.current;
    }

    const subscriber = executeFetch(id);

    return () => {
      subscriber();
    }
  }, [id, getAndObserveVideo, videoListenerRef]);

  return (
    <>
      <Back urlBack="/admin/videos" />
      <h1>Modificación de vídeo</h1>
      {
        loading ?
        <Loader text='Cargando vídeo...' /> :
        <EditVideoForm id={id} video={videoSelected} /> 
      }
    </>
  );
}

export default EditVideoPage;
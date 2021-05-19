import React, { useEffect, useContext } from 'react';
import EditVideoForm from '../components/EditVideoForm';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import Loader from '../components/Loader';


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

  console.log('Rendering component');

  return (
    <>
      <Link to="/admin/videos" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
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
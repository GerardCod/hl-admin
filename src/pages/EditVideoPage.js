import React, { useEffect, useContext } from 'react';
import EditVideoForm from '../components/EditVideoForm';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import Loader from '../components/Loader';

const EditVideoPage = () => {
  const { id } = useParams();
  const { getAndObserveVideo, state: {videoSelected, error, loading}, videoListenerRef} = useContext(VideoContext); 

  useEffect(() => {
    getAndObserveVideo(id);
    const subscriber = videoListenerRef.current;
    if (error) {
      swal({title: 'Error obteniendo el usuario', text: error, icon: 'error'});
    }

    return () => {
      subscriber();
    }
  }, [getAndObserveVideo]);

  return (
    <>
      <Link to="/videos" className="Back">
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
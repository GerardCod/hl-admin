import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import EditPodcastForm from '../components/EditPodcastForm';
import { PodcastContext } from '../contexts/PodcastContext';
import Loader from '../components/Loader';
import Back from '../components/Back';

const EditPodcastPage = () => {
  const { getPodcastById, state: { podcastSelected }, podcastRef } = useContext(PodcastContext);
  const { id } = useParams();

  useEffect(() => {
    const onError = text => swal({ title: 'Error obteniendo el podcast', text, icon: 'error' });
    getPodcastById(id, { onError });

    const listener = podcastRef.current;

    return () => {
      listener();
    }
  }, [getPodcastById, id, podcastRef]);

  return (
    <Fragment>
      <Back urlBack="/admin/podcasts" />
      <h1>Modificación del vídeo</h1>
      {
        podcastSelected ?
          <EditPodcastForm podcast={podcastSelected} /> :
          <Loader text="Cargando podcast" />
      }
    </Fragment>
  );
}

export default EditPodcastPage;
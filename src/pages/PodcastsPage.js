import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PodcastContext } from '../contexts/PodcastContext';
import swal from 'sweetalert';
import Illustration from '../components/Illustration';
import podcastIllustration from '../assets/podcasts.png';
import Loader from '../components/Loader';

const PodcastsPage = () => {
  const { fetchPodcasts, listenerRef, state } = useContext(PodcastContext);

  useEffect(() => {
    const showError = (message) => {
      swal({ title: 'Error obteniendo los podcasts', text: message, icon: 'error' });
    }

    fetchPodcasts(showError);
    const listener = listenerRef.current;

    return () => {
      listener();
    }
  }, [fetchPodcasts, listenerRef]);

  return (
    <>
      <header className="flex VideosHeader">
        <h1>Podcasts</h1>
        <Link to="/podcasts" className="Button AddVideo Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir podcast</span>
        </Link>
      </header>
      {
        state.loading ?
          <Loader text={'Cargando podcasts'} />
          : (state.podcasts && state.podcasts.length > 0) ?
            <h2>Hay podcasts</h2> :
            <Illustration illustration={podcastIllustration} message={'No hay podcasts en la plataforma'} />
      }
    </>
  );
}

export default PodcastsPage;
import React, { useContext, useEffect, Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PodcastContext } from '../contexts/PodcastContext';
import swal from 'sweetalert';
import Illustration from '../components/Illustration';
import podcastIllustration from '../assets/podcasts.png';
import Loader from '../components/Loader';
import PodcastItem from '../components/PodcastItem';

const PodcastsPage = () => {
  const { fetchPodcasts, listenerRef, state } = useContext(PodcastContext);
  let { path } = useRouteMatch();

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
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Podcasts</h1>
        <Link to={`${path}/upload`} className="Button Button--Icon Button--Add Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir podcast</span>
        </Link>
      </header>
      {
        state.loading ?
          <Loader text={'Cargando podcasts'} />
          : (state.podcasts && state.podcasts.length > 0) ?
          state.podcasts.map(e => <PodcastItem key={`podcast-${e.id}`} {...e} />) :
            <Illustration illustration={podcastIllustration} message={'No hay podcasts en la plataforma'} />
      }
    </Fragment>
  );
}

export default PodcastsPage;
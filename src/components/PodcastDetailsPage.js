import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { PodcastContext } from '../contexts/PodcastContext';
import Loader from '../components/Loader';
import swal from 'sweetalert';
import AudioPlayer from './AudioPlayer';

const PodcastDetailsPage = () => {
  const { getPodcastById, state: { podcastSelected }, podcastRef } = useContext(PodcastContext);
  let { id } = useParams();

  useEffect(() => {
    const onError = (text) => swal({ title: 'Error obteniendo el podcast', text, icon: 'error' });
    getPodcastById(id, { onError });

    const listener = podcastRef.current;
    return () => {
      listener();
    }
  }, [podcastRef, getPodcastById, id]);

  console.log(id);
  return (
    <>
      <Link to="/admin/podcasts" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
      {
        podcastSelected ?
          <div className="PodcastLayout">
            <div>
              <h1>{podcastSelected.title}</h1>
              <AudioPlayer url={podcastSelected.url} />
              <p>{podcastSelected.description}</p>
              <section>
                <h2>Comentarios</h2>
              </section>
            </div>
            <div>
              <h3>Visto por</h3>
            </div>
          </div>
          :
          <Loader text="Cargando podcast" />
      }
    </>
  );
}

export default PodcastDetailsPage;

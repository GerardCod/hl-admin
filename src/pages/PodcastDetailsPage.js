import React, { useContext, useEffect, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '../contexts/PodcastContext';
import Loader from '../components/Loader';
import swal from 'sweetalert';
import AudioPlayer from '../components/AudioPlayer';
import Back from '../components/Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Comment from '../components/Comment';
import Watch from '../components/Watch';

const PodcastDetailsPage = () => {
  const { getPodcastById, state: { podcastSelected }, podcastRef } = useContext(PodcastContext);
  let { id } = useParams();
  const playsRef = useRef({});

  const revealPlays = () => {
    playsRef.current.classList.toggle('Views--Active');
  }

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
    <Fragment>
      <Back urlBack="/admin/podcasts" />
      {
        podcastSelected ?
          <div className="PodcastLayout">
            <div>
              <h1>{podcastSelected.title}</h1>
              <AudioPlayer url={podcastSelected.url} />
              <p>{podcastSelected.description}</p>
              <button className="Button Button--Primary Button--Icon Button--Views" onClick={revealPlays}>
                <FontAwesomeIcon icon={faEye} />
                <span>Ver reproducciones</span>
              </button>
              <section className="Podcast__Comments">
                <h2>Comentarios</h2>
                {
                  (podcastSelected.comments.length > 0) &&
                  podcastSelected.comments.map((comment, idx) => <Comment {...comment} key={`comment-${idx}`} />)
                }
              </section>
            </div>
            <aside className="Views" ref={playsRef}>
              <h3>Escuchado por {podcastSelected.heardBy.length} personas</h3>
              {
                podcastSelected.heardBy.length > 0 &&
                podcastSelected.heardBy.map((hear, idx) => <Watch {...hear} key={`heard-${idx}`} />)
              }
            </aside>
          </div>
          :
          <Loader text="Cargando podcast" />
      }
    </Fragment>
  );
}

export default PodcastDetailsPage;

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '../contexts/PodcastContext';
import Loader from '../components/Loader';
import swal from 'sweetalert';
import AudioPlayer from '../components/AudioPlayer';
import Back from '../components/Back';

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
      <Back urlBack="/admin/podcasts" />
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

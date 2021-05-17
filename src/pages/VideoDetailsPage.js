import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetailsPage = () => {
  const { getVideo, state: { videoSelected, error } } = useContext(VideoContext);
  const { id } = useParams();

  useEffect(() => {
    getVideo(id).catch(() => {
      swal({ title: 'Error obteniendo el vídeo', text: error, icon: 'error' });
    });
  }, [getVideo])


  return (
    <>
      <Link to="/videos" className="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Regresar</span>
      </Link>
      {
        videoSelected ?
          <div className="VideoLayout">
            <div>
              <h1>{videoSelected.title}</h1>
              <VideoPlayer url={videoSelected.url} />
              <section>
                <h2>Descripción</h2>
                <p>{videoSelected.description}</p>
              </section>
              <section>
                <h2>Comentarios</h2>
              </section>
            </div>
            <aside>
              <h2>Visto por</h2>
            </aside>
          </div> :
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
      }
    </>
  );
}

export default VideoDetailsPage;
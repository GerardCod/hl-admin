import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetailsPage = () => {
  const { getVideo } = useContext(VideoContext);
  const { id } = useParams();
  const [video, setVideo] = useState({});

  useEffect(() => {
    getVideo(id).then(data => {
      setVideo(data);
    }).catch(e => {
      swal({
        title: 'Error cargando el vídeo',
        text: e.message,
        icon: 'error'
      })
    });
  }, [id, getVideo, setVideo])

  return (
    <>
      {
        video ?
      <div className="VideoLayout">
        <div>
          <Link to="/videos" className="Back">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Regresar</span>
          </Link>
          <h1>{video.title}</h1>
          <VideoPlayer url={video.url} />
          <section>
            <h2>Descripción</h2>
            <p>{video.description}</p>
          </section>
          <section>
            <h2>Comentarios</h2>
          </section>
        </div>
        <aside>
          <h2>Visto por</h2>
        </aside>
      </div> :
        <FontAwesomeIcon icon={faCircleNotch} className="Loading"/>
      }
    </>
  );
}

export default VideoDetailsPage;
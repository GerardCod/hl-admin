import React, { useContext, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';

const VideoDetailsPage = () => {
  const { getVideo } = useContext(VideoContext);
  const { id } = useParams();
  const {video, setVideo} = useState({});

  useEffect(() => {
    const videoFound = getVideo(id);
    setVideo(videoFound);
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
          <ReactPlayer url={video.url} controls light />
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
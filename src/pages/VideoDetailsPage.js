import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const VideoDetailsPage = () => {
  return (
    <>
      <div className="VideoLayout">
        <div>
          <Link to="/videos" className="Back">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Regresar</span>
          </Link>
          <h1>Título del vídeo</h1>
          <ReactPlayer url="https://youtu.be/aqz-KE-bpKQ" controls light />
          <section>
            <h2>Descripción</h2>
            <p>Lorem</p>
          </section>
          <section>
            <h2>Comentarios</h2>
          </section>
        </div>
        <aside>
          <h2>Visto por</h2>
        </aside>
      </div>
    </>
  );
}

export default VideoDetailsPage;
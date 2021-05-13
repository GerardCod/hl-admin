import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import VideoCard from '../components/VideoCard';
import Admin from '../containers/Admin';

const VideosPage = () => {

  return (
    <Admin>
      <h1>Vídeos</h1>
      <header className="flex VideosHeader">
        <h2 className="Title">Último vídeo subido</h2>
        <Link to="/uploadVideos" className="Button AddVideo Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir vídeo</span>
        </Link>
      </header>
      <ReactPlayer
        url="https://youtu.be/aqz-KE-bpKQ"
        controls
        light
      />
      <h2 className="Title">Otros vídeos subidos</h2>
      <section className="flex PlayList">
        {
          Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((e) => <VideoCard />)
        }
      </section>
    </Admin>
  );
}

export default VideosPage;
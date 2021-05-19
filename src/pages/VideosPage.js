import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { VideoContext } from '../contexts/VideoContext';
import VideoPlayer from '../components/VideoPlayer';
import illustration from '../assets/videos.png';
import Illustration from '../components/Illustration';
import Loader from '../components/Loader';

const VideosPage = () => {
  const { state, listenerRef, fetchVideos } = useContext(VideoContext);

  useEffect(() => {
    fetchVideos();
    const listener = listenerRef.current;
    return () => {
      listener();
    }
  }, [fetchVideos, listenerRef]);

  return (
    <>
      <header className="flex VideosHeader">
        <h1>Vídeos</h1>
        <Link to="/admin/videos/upload" className="Button AddVideo Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir vídeo</span>
        </Link>
      </header>
      {
        state.loading ? 
          <Loader text={'Cargando vídeos'} />
        :
        (state.videos && state.videos.length > 0) ?
          <div>
            <h2 className="Title">Último vídeo subido</h2>
            <VideoPlayer url={state.videos[state.videos.length - 1].url} />
            <h2 className="Title">Otros vídeos subidos</h2>
            <section className="flex PlayList">
              {
                state.videos.map((video) => <VideoCard key={video.id} video={video} />)
              }
            </section>
          </div>
          :
          <Illustration illustration={illustration} message={'No hay vídeos agregados'} />
      }
    </>
  );
}

export default VideosPage;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { VideoContext } from '../contexts/VideoContext';
import VideoPlayer from '../components/VideoPlayer';
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
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Vídeos</h1>
        <Link to="/admin/videos/upload" className="Button Button--Icon Button--Add Button--Success">
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
            <VideoPlayer url={state.videos[state.videos.length - 1].url} width="100%" />
            <h2 className="Title">Otros vídeos subidos</h2>
            <section className="flex PlayList">
              {
                state.videos.map((video) => <VideoCard key={video.id} video={video} />)
              }
            </section>
          </div>
          :
          <Illustration message={'No hay vídeos agregados'} />
      }
    </Fragment>
  );
}

export default VideosPage;
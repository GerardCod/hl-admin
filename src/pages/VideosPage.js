import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { VideoContext } from '../contexts/VideoContext';
import VideoPlayer from '../components/VideoPlayer';

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
      <h1>Vídeos</h1>
      <header className="flex VideosHeader">
        <h2 className="Title">Último vídeo subido</h2>
        <Link to="/videos/upload" className="Button AddVideo Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Subir vídeo</span>
        </Link>
      </header>
      {
        state.videos && <VideoPlayer url={state.videos[state.videos.length - 1]} />
      }
      <h2 className="Title">Otros vídeos subidos</h2>
      <section className="flex PlayList">
        {
          state.videos && state.videos.map((video) => <VideoCard key={video.id} video={video}  />)
        }
      </section>
    </>
  );
}

export default VideosPage;
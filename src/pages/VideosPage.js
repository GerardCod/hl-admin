import React from 'react';
import ReactPlayer from 'react-player';
import VideoCard from '../components/VideoCard';
import Admin from '../containers/Admin';

const VideosPage = () => {
  return (
    <Admin>
      <h1>Vídeos</h1>
      <div className="flex">
        <h2 className="Title">Último vídeo subido</h2>
      </div>
      <ReactPlayer
        url="https://youtu.be/aqz-KE-bpKQ"
        controls
        light
      />
      <h2 className="Title">Otros vídeos subidos</h2>
      <section className="flex PlayList">
        {
          Array.from([1,2,3,4,5,6,7,8,9]).map((e) => <VideoCard />)
        }
      </section>
    </Admin>
  );
}

export default VideosPage;
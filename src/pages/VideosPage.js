import React from 'react';
import ReactPlayer from 'react-player';
import Admin from '../containers/Admin';

const VideosPage = () => {
  return (
    <Admin>
      <div className="flex">
        <h2 className="Title">Último vídeo subido</h2>
      </div>
      <ReactPlayer
        url="https://youtu.be/aqz-KE-bpKQ"
        controls
        light 
      />
    </Admin>
  );
}

export default VideosPage;
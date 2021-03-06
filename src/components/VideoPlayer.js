import React from 'react';

const VideoPlayer = ({url}) => {

  return (
    <div className="VideoPlayerContainer">
      <video controls
        poster={"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"}
        src={url} >
      </video>
    </div>
  );
}

export default VideoPlayer;
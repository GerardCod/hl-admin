import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({url}) => {
  return <ReactPlayer url={url} controls light={"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"}/>
}

export default VideoPlayer;
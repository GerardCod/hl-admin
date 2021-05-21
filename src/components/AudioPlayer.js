import React from 'react';

const AudioPlayer = ({ url }) => (
  <audio controls>
    <source src={url} type="audio/mp3" />
  </audio>
);

export default AudioPlayer;
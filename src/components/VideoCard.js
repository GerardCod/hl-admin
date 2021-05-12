import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const VideoCard = () => {
  return (
    <article className="VideoCard">
      <div className="VideoCard__Thumbnail flex flex--center">
        <FontAwesomeIcon icon={faPlay} />
      </div>
      <footer className="flex">
        <h4>Big buck bunny</h4>
        <FontAwesomeIcon icon={faEllipsisV} />
      </footer>
    </article>
  );
}

export default VideoCard;
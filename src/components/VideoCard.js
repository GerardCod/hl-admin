import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const VideoCard = ({video}) => {
  return (
    <article className="VideoCard">
      <div className="VideoCard__Thumbnail flex flex--center">
        <FontAwesomeIcon icon={faPlay} />
      </div>
      <footer className="flex VideoCard__Footer">
        <span className="VideoCard__Title">{video.title}</span>
        <FontAwesomeIcon icon={faEllipsisV} className="VideoCard__Menu" />
      </footer>
    </article>
  );
}

export default VideoCard;
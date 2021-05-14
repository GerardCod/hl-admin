import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlay } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import VideoCardMenu from './VideoCardMenu';

const VideoCard = ({video}) => {
  const [reveal, setReveal] = useState(false);

  return (
    <article className="VideoCard">
      <div className="VideoCard__Thumbnail flex flex--center">
        <FontAwesomeIcon icon={faPlay} />
      </div>
      <footer className="flex VideoCard__Footer">
        <span className="VideoCard__Title">{video.title}</span>
        <FontAwesomeIcon icon={faEllipsisV} className="VideoCard__Menu" onClick={() => setReveal(!reveal)} />
        <VideoCardMenu show={reveal} />
      </footer>
    </article>
  );
}

export default VideoCard;
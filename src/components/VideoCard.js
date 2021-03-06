import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlay } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import VideoCardMenu from './VideoCardMenu';

const VideoCard = ({video}) => {
  const [reveal, setReveal] = useState(false);

  return (
    <article className="VideoCard">
      <div className="VideoCard__Thumbnail flex f-justify--center f-align--center">
        <FontAwesomeIcon icon={faPlay} />
      </div>
      <footer className="flex VideoCard__Footer">
        <span className="VideoCard__Title">{video.title}</span>
        <FontAwesomeIcon icon={faEllipsisV} className="VideoCard__Menu" onClick={() => setReveal(!reveal)} />
        <VideoCardMenu show={reveal} id={video.id} />
      </footer>
    </article>
  );
}

export default VideoCard;
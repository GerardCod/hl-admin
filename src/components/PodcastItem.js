import { faEdit, faEye, faPodcast, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PodcastItem = ({title}) => {
  return (
    <>
      <article className="flex ListItem">
        <div className="ListItem__Content flex">
          <FontAwesomeIcon icon={faPodcast} className="ListItem__Icon Icon--Orange" />
          <div className="ListItem__Description">
            <h4>{title}</h4>
          </div>
        </div>
        <div className="flex flex--center ListItem__Actions">
          <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          <FontAwesomeIcon icon={faEdit} className="Icon--Purple" />
          <FontAwesomeIcon icon={faTrash} className="Icon--Red" />
        </div>
      </article>
    </>
  );
}

export default PodcastItem;
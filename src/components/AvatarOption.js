import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const AvatarOption = React.memo(({onChange, url, value}) => {
  return (
    <div className="AvatarOption">
      <input type="radio" name="avatar" checked={(value === url)} className="AvatarOption__Select" onChange={onChange} value={url} />
      <span className="AvatarOption__Checked">
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <img src={url} className="AvatarOption__Img" alt="avatar_img" />
    </div>
  );
})

export default AvatarOption;
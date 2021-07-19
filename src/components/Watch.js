import React, { Fragment } from 'react';

const Watch = ({name, avatar}) => {
  return (
    <Fragment>
      <article className="grid Watch">
        <figure className="Watch__Avatar">
          <img src={avatar} alt="watch_avatar" />
        </figure>
        <p>{name}</p>
      </article>
    </Fragment>
  );
}

export default Watch;
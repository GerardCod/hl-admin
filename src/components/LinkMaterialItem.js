import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const LinkMaterialItem = function Component({material}) {
  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faBook} className="ListItem__Icon Icon--Blue" />
          <div className="ListItem__Description">
            <h4 className="Text--primary">
              <a href={material.link} target="_blank" rel="noreferrer">{material.title}</a>
            </h4>
            <p>Subido el {material.postDate} a las {material.postTime}</p>
          </div>
        </div>
      </article>
    </Fragment>
  );
}

export default LinkMaterialItem;
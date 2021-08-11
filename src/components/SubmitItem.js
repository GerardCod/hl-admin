import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';

const SubmitItem = ({file}) => {
  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faFile} className="ListItem__Icon Icon--Orange" />
          <div className="ListItem__Description">
            <h4>
              <a href={file.url} target="_blank" rel="noreferrer">
                {file.name}
              </a>
            </h4>  
          </div>         
        </div>
      </article>
    </Fragment>
  )
}

export default SubmitItem;
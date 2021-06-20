import React, { Fragment } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ActivityItem = ({title, id}) => {
  const {path} = useRouteMatch();

  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faFile} className="ListItem__Icon Icon--Success" />
          <div className="ListItem__Description">
            <h4>{title}</h4>
          </div>
        </div>
        <div className="flex f-justify--center f-align--center ListItem__Actions">
          <Link to={`${path}/${id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <Link to={`${path}/${id}/edit`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEdit} className="Icon--Purple" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" />
        </div>
      </article>
    </Fragment>
  );
}

export default ActivityItem;
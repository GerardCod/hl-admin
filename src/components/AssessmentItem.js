import { faClipboardList, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AssessmentItem = ({ assessment }) => {
  const { path } = useRouteMatch('/admin/assessments');

  const handleDelete = () => {
    console.log(assessment);
  }

  return (
    <Fragment>
      <article className="flex ListItem">
        <div className="ListItem__Content flex f-align--center">
          <FontAwesomeIcon icon={faClipboardList} className="ListItem__Icon Icon--Orange" />
          <div className="ListItem__Description">
            <h3 className="Text--orange">{assessment.title}</h3>
            <p>Subido el {assessment.postDate} a las {assessment.postTime}</p>
          </div>
        </div>
        <div className="flex f-justify--center f-align--center ListItem__Actions">
          <Link to={`${path}/${assessment.id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" onClick={handleDelete} />
        </div>
      </article>
    </Fragment>
  );
}

export default AssessmentItem;
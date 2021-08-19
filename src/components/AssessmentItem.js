import { faClipboardList, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError, onSuccess } from '../utils';

const AssessmentItem = ({ assessment }) => {
  const { path } = useRouteMatch('/admin/assessments');
  const { removeAssessment } = useContext(AssessmentContext);

  const handleDelete = () => {
    swal({
      title: '¿Realmente quieres eliminar esta evaluación?',
      text: 'Luego de removerla, no volverá a estar disponible en la plataforma',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeAssessment(assessment, {onSuccess, onError})
      }
    });
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
          <Link to={`${path}/details/${assessment.id}`} className="cursor--pointer">
            <FontAwesomeIcon icon={faEye} className="Icon--Blue" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="Icon--Red cursor--pointer" onClick={handleDelete} />
        </div>
      </article>
    </Fragment>
  );
}

export default AssessmentItem;
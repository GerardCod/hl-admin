import React, { Fragment, useEffect } from 'react';
import { useContext } from 'react';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import Illustration from '../components/Illustration';
import illustration from '../assets/videos.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AssessmentItem from '../components/AssessmentItem';

const AssessmentPage = () => {
  const { state, collectionRef, fetchCollection } = useContext(AssessmentContext);

  useEffect(() => {
    fetchCollection({ onError });
    const subscription = collectionRef.current;

    return () => {
      subscription();
    }
  }, [collectionRef, fetchCollection]);

  return (
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Evaluaciones subidas</h1>
        <Link to="/admin/assessments/create" className="Button Button--Icon Button--Add Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nueva evaluación</span>
        </Link>
      </header>
      {
        state.loading ?
        <Loader text="Cargando evaluaciones" /> :
        (state.assessments && state.assessments.length > 0) ?
        state.assessments.map(a => <AssessmentItem assessment={a} />) :
        <Illustration illustration={illustration} message="No hay evaluaciones en la plataforma." />
      }
    </Fragment>
  );
}

export default AssessmentPage;
import React, { Fragment, useEffect } from 'react';
import { useContext } from 'react';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import Illustration from '../components/Illustration';
import illustration from '../assets/videos.png';

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
      <h1>Evaluaciones subidas</h1>
      {
        state.loading ?
        <Loader text="Cargando evaluaciones" /> :
        (state.assessments && state.assessments.length > 0) ?
        <p>Hay evaluaciones en la plataforma.</p> :
        <Illustration illustration={illustration} message="No hay evaluaciones en la plataforma." />
      }
    </Fragment>
  );
}

export default AssessmentPage;
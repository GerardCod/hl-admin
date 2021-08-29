import React, { Fragment, useContext, useEffect } from 'react';
import Illustration from '../components/Illustration';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivityContext } from '../contexts/ActivityContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import ActivityItem from '../components/ActivityItem';

const ActivitiesPage = () => {
  const { state, fetchActivities, listenerRef } = useContext(ActivityContext);

  useEffect(() => {
    fetchActivities({ onError });
    const subscriber = listenerRef.current;

    return () => {
      subscriber();
    }
  }, [fetchActivities, listenerRef]);

  console.log(state.activities);

  return (
    <Fragment>
      <header className="flex VideosHeader">
        <h1>Actividades</h1>
        <Link to="/admin/activities/create" className="Button Button--Icon Button--Add Button--Success">
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar actividad</span>
        </Link>
      </header>
      {
        state.loading ?
          <Loader text="Cargando actividades" /> :
          (state.activities && state.activities.length > 0) ?
            state.activities.map(activity => <ActivityItem key={`activity-${activity.id}`} {...activity} />) :
            <Illustration message="No hay actividades en la plataforma" />
      }
    </Fragment>
  );
}

export default ActivitiesPage;
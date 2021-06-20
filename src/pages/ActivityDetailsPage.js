import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../components/Back'
import { ActivityContext } from '../contexts/ActivityContext';
import { onError } from '../utils';
import Loader from '../components/Loader';

const ActivityDetailsPage = () => {
  const { state, activityDetails, listenerRef } = useContext(ActivityContext);
  let { id } = useParams();

  useEffect(() => {
    activityDetails(id, { onError });
    const subscriber = listenerRef.current;

    return () => {
      subscriber();
    }
  }, [id, activityDetails, listenerRef]);

  return (
    <Fragment>
      <Back urlBack="/admin/activities" />
      {
        state.activitySelected ?
          <main className="VideoLayout">
            <div>
              <h1>{state.activitySelected.title}</h1>
              <p>{state.activitySelected.description}</p>
            </div>
            <aside className="Views">
              <h2>Entregas</h2>
            </aside>
          </main> :
          <Loader text="Cargando actividad" />      
      }
    </Fragment>
  );
}

export default ActivityDetailsPage;
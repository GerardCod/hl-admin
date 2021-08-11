import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import { ActivityContext } from '../contexts/ActivityContext';
import { onError } from '../utils';
import EditActivityForm from '../components/EditActivityForm';
import Loader from '../components/Loader';

const EditActivityPage = () => {
  let { id } = useParams();
  const { state, activityDetails, listenerRef } = useContext(ActivityContext);

  useEffect(() => {
    activityDetails(id, { onError });
    const subscriber = listenerRef.current;

    return () => {
      subscriber();
    }
  }, [activityDetails, listenerRef, id]);

  return (
    <Fragment>
      <Back urlBack="/admin/activities" />
      <h1>Edición de actividad</h1>
      {
        state.activitySelected ?
          <EditActivityForm activity={state.activitySelected} /> :
          <Loader text="Cargando la actividad" />
      }
    </Fragment>
  );
}

export default EditActivityPage;
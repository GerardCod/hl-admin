import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../components/Back'
import { ActivityContext } from '../contexts/ActivityContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import Submit from '../components/Submit';
import LinkMaterialItem from '../components/LinkMaterialItem';
import TextDescription from '../components/TextDescription';

const ActivityDetailsPage = () => {
  const { state, activityDetails, listenerRef, addCommentToSubmit } = useContext(ActivityContext);
  let { id } = useParams();

  useEffect(() => {
    activityDetails(id, { onError });
    const subscriber = listenerRef.current;

    return () => {
      subscriber();
    }
  }, [id, activityDetails, listenerRef]);

  const processComment = (activity, submit) => comment => {
    addCommentToSubmit({activity, submit, comment}, { onError });
  }

  return (
    <Fragment>
      <Back urlBack="/admin/activities" />
      {
        state.activitySelected ?
          <main className="VideoLayout">
            <div>
              <h1>{state.activitySelected.title}</h1>
              <TextDescription text={state.activitySelected.description} />
              {
                (state.activitySelected.links && state.activitySelected.links.length > 0 ) &&
                state.activitySelected.links.map(link => <LinkMaterialItem material={link} key={`material-link: ${link.id}`} />)
              }
              <section className="Submits">
                <h2>Entregas</h2>
                {
                  (state.activitySelected.submits && state.activitySelected.submits.length > 0) ?
                    state.activitySelected.submits.map((e, idx) => {
                      return <Submit submit={e} uploadComment={processComment(state.activitySelected, e)} key={`submit-${idx}`} />                      
                    }) :
                    <p>No hay entregas de los alumnos aún.</p>
                }
              </section>
            </div>
          </main> :
          <Loader text="Cargando actividad" />
      }
    </Fragment>
  );
}

export default ActivityDetailsPage;
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../components/Back';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError, onSuccess } from '../utils';
import Loader from '../components/Loader';
import { Tab, Tabs } from '@material-ui/core';
import CreateAssessmentForm from '../components/CreateAssessmentForm';
import ContentAssessmentForm from '../components/ContentAssessmentForm';

const AssessmentDetails = () => {
  const { id } = useParams();
  const {state, documentRef, fetchAssessment, updateAssessment} = useContext(AssessmentContext);
  const [tab, setTab] = useState(0)

  useEffect(() => {
    fetchAssessment(id, { onError });
    const subscription = documentRef.current;

    return () => {
      subscription();
    }
  }, [id, documentRef, fetchAssessment]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  const submitData = data => {
    updateAssessment(data, {onSuccess, onError});
  }

  return (
    <Fragment>
      <Back urlBack="/admin/assessments" />
      {
        state.assessmentSelected ?
        <div>
          <h1>{state.assessmentSelected.title}</h1>
          <br />
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Detalles" value={0} />
            <Tab label="Entregas" value={1} />
          </Tabs>
          {
            tab === 0 ?
            <div>
              <fieldset>
                <legend>Información general</legend>
                <CreateAssessmentForm assessmentState={state.assessmentSelected} handleSubmit={submitData} update cancel/>
              </fieldset>
              <fieldset>
                <legend>Contenido de la evaluación</legend>
                <ContentAssessmentForm assessmentState={state.assessmentSelected} handleSubmit={submitData} update cancel handleStateChanges={submitData} />
              </fieldset>
            </div> :
            <div>
              <h2>Entregas</h2>
            </div>
          }
        </div>:
        <Loader text="Cargando detalles de evaluación" />
      }
    </Fragment>
  );
}

export default AssessmentDetails;
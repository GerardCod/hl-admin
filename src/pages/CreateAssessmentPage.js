import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { Fragment, useState, useEffect, useContext } from 'react';
import Back from '../components/Back';
import { onError, onSuccess, useStyles } from '../utils';
import CreateAssessmentForm from '../components/CreateAssessmentForm';
import ContentAssessmentForm from '../components/ContentAssessmentForm';
import { CreateAssessmentContext } from '../contexts/CreateAssessmentContext';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { Redirect } from 'react-router-dom';

const CreateAssessmentPage = () => {
  const { state, saveGeneralInfo, saveContent } = useContext(CreateAssessmentContext);
  const { createAssessment } = useContext(AssessmentContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem('assessment', JSON.stringify(state));
  }, [state])

  const uploadAssessment = async () => {
    if (state.type === 'enlace' && state.link || state.type === 'quiz' && state.questions[0].question ) {
      await createAssessment(state, { onSuccess, onError, final: setRedirect });
    } else {
      onError('No has terminado de rellenar la evaluación');
    }
  }

  return (
    <Fragment>
      <Back urlBack="/admin/assessments" />
      {
        redirect && <Redirect to="/admin/assessments" />
      }
      <h1>Nueva evaluación</h1>
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Información general</StepLabel>
        </Step>
        <Step>
          <StepLabel>Contenido de la evaluación</StepLabel>
        </Step>
      </Stepper>
      {
        (currentStep === 0) ?
        <div>
          <CreateAssessmentForm handleSubmit={saveGeneralInfo} assessmentState={state} />
          <Button variant="contained" color="primary" onClick={() => { setCurrentStep(currentStep + 1); }} className={classes.button}>Siguiente</Button>
        </div> :
        <div>
          <ContentAssessmentForm assessmentState={state} handleSubmit={saveContent} />
          <Button onClick={() => { setCurrentStep(currentStep - 1); }} className={classes.button}>Atrás</Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={uploadAssessment}>Crear evaluación</Button>
          <br />
          <br />
        </div>
      }
    </Fragment>
  );
}

export default CreateAssessmentPage;
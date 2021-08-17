import React, { useContext } from 'react';
import { Fragment } from 'react';
import useForm from '../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import QuestionForm from './QuestionForm';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { CreateAssessmentContext } from '../contexts/CreateAssessmentContext';

const ContentAssessmentForm = ({ assessmentState, handleSubmit }) => {
  const [data, handleChange] = useForm(assessmentState);
  const { addQuestion, saveQuestion } = useContext(CreateAssessmentContext);

  const submitData = e => {
    e.preventDefault();
    handleSubmit(data);
  }

  return (
    <Fragment>
      {
        assessmentState.type === 'enlace' ?
          <form className="Form--Upload flex flex--column" onSubmit={submitData}>
            <p className="Textfield">
              <label className="Textfield__Label" htmlFor="link">Enlace de la evaluación</label>
              <input className="Textfield__Input Input--Full" type="text" name="link" id="link" onChange={handleChange} placeholder="https://somesite.com/efwfef951" required value={data.link} />
            </p>
            <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.link)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
          </form> :
          (assessmentState.type === 'quiz') ?
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={addQuestion}
            >
              Agregar pregunta
            </Button>
            <br />
            <br />
            {
              assessmentState.questions.map((q, idx) => <QuestionForm questionState={q} key={`question-${idx}`} handleSubmit={saveQuestion} />)
            }
          </div> :
          <p>Elige un tipo de evaluación</p>
      }
    </Fragment>
  )
}

export default ContentAssessmentForm;

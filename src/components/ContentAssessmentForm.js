import React, { Fragment, useContext, useState } from 'react';
import useForm from '../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import QuestionForm from './QuestionForm';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { CreateAssessmentContext } from '../contexts/CreateAssessmentContext';

const ContentAssessmentForm = ({ assessmentState, handleSubmit, update, cancel, addQuestion, saveQuestion, removeQuestion }) => {
  const [data, handleChange] = useForm(assessmentState);
  const [editable, setEditable] = useState(Boolean(update));

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
              <input
                className="Textfield__Input Input--Full" type="text" name="link" id="link"
                onChange={handleChange} placeholder="https://somesite.com/efwfef951" required value={data.link}
                disabled={editable} />
            </p>
            {
              !editable &&
              <div className="flex">
                <button type="submit" className="Button Button--Icon Button--Success" disabled={(!data.link)}>
                  <FontAwesomeIcon icon={faSave} />
                  <span>Guardar cambios</span>
                </button>
                {
                  cancel &&
                  <button type="button" className="Button Button--Icon ButtonOutlined--Success" onClick={() => { setEditable(true); }}>
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Cancelar</span>
                  </button>
                }
              </div>
            }
            {
              editable &&
              <button type="button" className="Button Button--Icon ButtonOutlined--Success width--full" onClick={() => { setEditable(false); }}>
                <FontAwesomeIcon icon={faSave} />
                <span>Editar</span>
              </button>
            }
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
                assessmentState.questions.map((q) => <QuestionForm questionState={q} key={`question-${q.id}`} handleSubmit={saveQuestion} handleRemoveQuestion={removeQuestion} />)
              }
            </div> :
            <p>Elige un tipo de evaluación</p>
      }
    </Fragment>
  )
}

ContentAssessmentForm.propTypes = {
  assessmentState: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  update: PropTypes.bool,
  cancel: PropTypes.bool,
  handleStateChanges: PropTypes.func,
}

export default ContentAssessmentForm;

import React, { useState, Fragment, useRef } from 'react';
import useForm from '../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  question: '',
  answers: [],
}

const QuestionsForm = ({ assessment }) => {
  const [add, setAdd] = useState(false);
  const [data, handleChange, reset] = useForm(initialState);
  const formRef = useRef({});

  const handleSubmit = e => {
    e.preventDefault();

    if (!assessment.content) {
      assessment.content = [];
    }

    data.question = data.question.trim();
    assessment.content.push(data);
    reset();
    formRef.current.reset();
    setAdd(false);
  }

  return (
    <Fragment>
      <p>
        <button type="button" className="Button Button--Icon Button--Success" onClick={() => { setAdd(true); }}>Agregar pregunta</button>
      </p>
      {
        add &&
        <form className="Form--Upload flex flex--column" onSubmit={handleSubmit} ref={formRef}>
          <p className="Textfield">
            <label className="Textfield__Label" htmlFor="title">Pregunta</label>
            <input className="Textfield__Input Input--Full" type="text" name="question" id="question" onChange={handleChange} placeholder="¿Cómo se llama el profesor?" required value={data.question} />
          </p>
          <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.question || !data.answers.length <= 0 )}>
            <FontAwesomeIcon icon={faSave} />
            <span>Agregar pregunta</span>
          </button>
        </form>
      }
    </Fragment>
  );
}

export default QuestionsForm;
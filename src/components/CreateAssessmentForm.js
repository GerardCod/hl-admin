import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import { assessmentTypes } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreateAssessmentForm = ({ handleSubmit, assessmentState, update, cancel }) => {
  const [data, handleChange] = useForm(assessmentState);
  const [editable, setEditable] = useState(Boolean(update));

  const submitData = e => {
    e.preventDefault();
    data.title = data.title.trim();
    data.instructions = data.instructions.trim();
    handleSubmit(data);
  }


  return (
    <form className="Form--Upload flex flex--column" onSubmit={submitData}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título de la evaluación</label>
        <input
          className="Textfield__Input Input--Full" type="text" name="title" id="title"
          onChange={handleChange} placeholder="Evaluación de primer bimestre" required value={data.title}
          disabled={editable} />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="instructions">Instrucciones de la evaluación</label>
        <input
          className="Textfield__Input Input--Full" type="text" name="instructions" id="instructions"
          onChange={handleChange} placeholder="Evaluación de primer bimestre" required value={data.instructions}
          disabled={editable} />
      </p>

      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="instructions">Tipo de evaluación</label>
        <select
          className="Textfield__Input Input--Full" type="text" name="type" id="type"
          onChange={handleChange} required value={data.type}
          disabled={editable}  >
          {
            assessmentTypes.map((e, idx) => <option value={e.value} key={`assessmentType-${idx}`}>{e.name}</option>)
          }
        </select>
      </p>

      {
        !editable &&
        <div className="flex">
          <button type="submit" className="Button Button--Icon Button--Success" disabled={(!data.title || !data.instructions || !data.type)}>
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
        <button type="button" className="Button Button--Icon ButtonOutlined--Success " onClick={() => { setEditable(false); }}>
          <FontAwesomeIcon icon={faEdit} />
          <span>Editar</span>
        </button>
      }
    </form>
  );
}

export default CreateAssessmentForm;
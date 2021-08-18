import React from 'react';
import useForm from '../hooks/useForm';
import { assessmentTypes } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const CreateAssessmentForm = ({handleSubmit, assessmentState}) => {
  const [data, handleChange ] = useForm(assessmentState);

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
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Evaluación de primer bimestre" required value={data.title} />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="instructions">Instrucciones de la evaluación</label>
        <input className="Textfield__Input Input--Full" type="text" name="instructions" id="instructions" onChange={handleChange} placeholder="Evaluación de primer bimestre" required value={data.instructions} />
      </p>

      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="instructions">Tipo de evaluación</label>
        <select className="Textfield__Input Input--Full" type="text" name="type" id="type" onChange={handleChange} required value={data.type}>
          {
            assessmentTypes.map((e, idx) => <option value={e.value} key={`assessmentType-${idx}`}>{e.name}</option>)
          }
        </select>
      </p>

      <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.title || !data.instructions || !data.type )}>
        <FontAwesomeIcon icon={faSave} />
        <span>Guardar cambios</span>
      </button>
    </form>
  );
}

export default CreateAssessmentForm;
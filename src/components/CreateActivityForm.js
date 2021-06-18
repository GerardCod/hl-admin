import React, { useContext, useRef, useState } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { onSuccess, onError } from '../utils';

const CreateActivityForm = () => {
  const [data, setData] = useState({});
  const { state, createActivity } = useContext(ActivityContext);
  const formRef = useRef({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    createActivity(data, {onSuccess, onError});
    setData({});
    formRef.current.reset();
  }

  return (
    <form ref={formRef} className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título de la actividad</label>
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Actividad 1" required />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Descripción de la actividad</label>
        <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Pongan un comentario acerca de lo visto en clase" required />
      </p>
      <fieldset className="AvatarSelector">
        <legend>Elige un tipo de entrega</legend>
        <div>
          <input type="radio" id="comment" name="submitType" value="comment" onChange={handleChange} />
          <label htmlFor="comment">Comentario</label>
        </div>
        <div>
          <input type="radio" id="evidence" name="submitType" value="evidence" onChange={handleChange} />
          <label htmlFor="evidence">Evidencia</label>
        </div>
      </fieldset>
      {
        state.loading ?
          <button type="button" className="Button Button--Icon Button--Success width--full" disabled>
            <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
            <span>Creando la actividad</span>
          </button> :
          <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.title || !data.description || !data.submitType)}>
            <FontAwesomeIcon icon={faSave} />
            <span>Guardar cambios</span>
          </button>
      }
    </form>
  );
}

export default CreateActivityForm;
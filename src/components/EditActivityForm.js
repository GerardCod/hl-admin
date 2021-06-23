import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { ActivityContext } from '../contexts/ActivityContext';
import { onError, onSuccess } from '../utils';

const EditActivityForm = ({ activity }) => {
  const [data, setData] = useState(activity);
  const { state, editActivity } = useContext(ActivityContext);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editActivity(activity.id, data, {onSuccess, onError});
  }

  return (
    <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título de la actividad</label>
        <input defaultValue={activity.title} className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Actividad 1" required />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Descripción de la actividad</label>
        <textarea defaultValue={activity.description} columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Pongan un comentario acerca de lo visto en clase" required />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="date">Fecha de entrega</label>
        <input type="date" defaultValue={activity.date} className="Textfield__Input Input--Full" name="date" id="date" onChange={handleChange} required />
      </p>
      <fieldset className="AvatarSelector">
        <legend>Elige un tipo de entrega</legend>
        <div>
          <input type="radio" id="comment" name="submitType" value="comment" checked={data.submitType === 'comment'} onChange={handleChange} />
          <label htmlFor="comment">Comentario</label>
        </div>
        <div>
          <input type="radio" id="evidence" name="submitType" value="evidence" checked={data.submitType === 'evidence'} onChange={handleChange} />
          <label htmlFor="evidence">Evidencia</label>
        </div>
      </fieldset>
      {
        state.loading ?
          <button type="button" className="Button Button--Icon Button--Success width--full" disabled>
            <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
            <span>Creando la actividad</span>
          </button> :
          <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.title || !data.description || !data.submitType || !data.date)}>
            <FontAwesomeIcon icon={faSave} />
            <span>Guardar cambios</span>
          </button>
      }
    </form>
  );
}

export default EditActivityForm;
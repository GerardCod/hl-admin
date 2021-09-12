import React, { useContext, useRef, useState } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { onSuccess, onError } from '../utils';
import { Button, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MaterialDialog from './MaterialDialog';
import { Fragment } from 'react';
import { AttachFile } from '@material-ui/icons';

const CreateActivityForm = () => {
  const [data, setData] = useState({});
  const { state, createActivity } = useContext(ActivityContext);
  const formRef = useRef({});
  const [open, setOpen] = useState(false); 

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

  const handleOpen = () => {
    setOpen(!open);
  }

  const addLinks = links => {
    const linkList = [];
    for (let key in links) {
      linkList.push(links[key]);
    }
    
    setData({
      ...data,
      links: linkList,
    });
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
      <p className="Textfield">
        <label className="Textfield__Label">Fecha de entrega</label>
        <input type="date" className="Textfield__Input Input--Full" name="date" id="date" onChange={handleChange} placeholder="Elige una fecha" required />
      </p>
      <br />
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
      <div>
        <h4>Agrega enlaces de materiales de clase a esta actividad</h4>
        <br />
        <Button variant="contained" color="primary" onClick={handleOpen}>Seleccionar material</Button>
        <MaterialDialog open={open} handleClose={handleOpen} addLinks={addLinks} />
        {
          (data.links && data.links.length > 0) &&
          data.links.map(link => {
            return (
              <Fragment key={`link-item-id: ${link.id}`}>
                <ListItem dense>
                  <ListItemIcon>
                    <AttachFile />
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItem>
              </Fragment>
            );
          })
        }
      </div>
      <br />
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

export default CreateActivityForm;
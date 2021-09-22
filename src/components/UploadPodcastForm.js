import React, { Fragment, useContext, useRef, useState } from 'react';
import swal from 'sweetalert';
import { PodcastContext } from '../contexts/PodcastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faFileUpload, faSave } from '@fortawesome/free-solid-svg-icons';
import TextArea from './TextArea';

const UploadPodcastForm = () => {
  const { uploadPodcast, state } = useContext(PodcastContext);
  const [data, setData] = useState({ timesHeard: 0 });
  const [audio, setAudio] = useState();
  const formRef = useRef();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handlePickUpAudio = e => {
    const file = e.target.files[0];
    setAudio(file);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const onSuccess = () => swal({ title: 'Bien hecho', text: 'El podcast fue subido con éxito', icon: 'success' });
    const onError = text => swal({ title: 'Lo sentimos mucho', text, icon: 'error' });
    uploadPodcast(data, audio, { onError, onSuccess });
    formRef.current.reset();
    setData({timesHeard: 0});
    setAudio(null);
  }

  return (
    <Fragment>
      <form ref={formRef} className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="title">Título del audio</label>
          <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" required />
        </p>
        <TextArea label="Descripción del audio" name="description" onChange={handleChange} />
        <div className="Textfield">
          <label className="Textfield__Label" htmlFor="description">
            Elige un audio
        </label>
          <div className="Textfield__Input Input--File flex flex--column f-justify--center f-align--center">
            <input type="file" name="video" id="video" accept="audio/mp3" onChange={handlePickUpAudio} required />
            <FontAwesomeIcon icon={faFileUpload} className={`Input__Icon ${audio ? "Icon--Success" : ""}`} />
            {
              audio && <span>{audio.name}</span>
            }
          </div>
        </div>
        <br></br>
        {
          state.loading ?
            <button type="button" className="Button Button--Icon Button--Success width--full" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Subiendo audio</span>
            </button>
            :
            <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.title || !data.description || !audio)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
        }
      </form>
    </Fragment>
  );
}

export default UploadPodcastForm;
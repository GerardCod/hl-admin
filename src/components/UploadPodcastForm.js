import React, { useContext, useRef, useState } from 'react';
import swal from 'sweetalert';
import { PodcastContext } from '../contexts/PodcastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faFileUpload, faSave } from '@fortawesome/free-solid-svg-icons';

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
    <>
      <form ref={formRef} className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="title">Título del podcast</label>
          <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="description">Descripción del podcast</label>
          <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es el vídeo de un conejo gordo" required />
        </p>
        <div className="Textfield">
          <label className="Textfield__Label" htmlFor="description">
            Elige un vídeo
        </label>
          <div className="Textfield__Input Input--File">
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
            <button type="button" className="Button AddVideo Button--Success UploadButton" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Subiendo vídeo</span>
            </button>
            :
            <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.title || !data.description || !audio)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
        }
      </form>
    </>
  );
}

export default UploadPodcastForm;
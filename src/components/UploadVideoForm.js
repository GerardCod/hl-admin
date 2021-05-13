import React, { useContext, useState } from 'react';
import { faFileUpload, faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';

const UploadVideoForm = () => {
  const { uploadVideo, state } = useContext(VideoContext);
  const [data, setData] = useState({ views: 0 });
  const [file, setFile] = useState();

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handlePickUpFile = (e) => {
    const file = e.target.files[0];
    if (file.type === 'video/mp4') {
      setFile(file);
    } else {

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadVideo(data, file)
      .then(() => {
        swal({ title: 'Bien hecho', text: 'El vídeo ha sido subido exitosamente', icon: 'success', button: 'Cerrar' })
      })
      .catch(() => {
        swal({ title: 'Oh no', text: state.error, icon: 'error', button: 'Cerrar' });
      }).finally(() => {
        e.target.reset();
        setData({views: 0});
        setFile(null);
      });
  }

 
  return (
    <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título del vídeo</label>
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" required />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Descripción del vídeo</label>
        <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es el vídeo de un conejo gordo" required />
      </p>
      <div className="Textfield">
        <label className="Textfield__Label" htmlFor="description">
          Elige un vídeo
        </label>
        <div className="Textfield__Input Input--File">
          <input type="file" name="video" id="video" onChange={handlePickUpFile} required />
          <FontAwesomeIcon icon={faFileUpload} className={`Input__Icon ${file ? "Icon--Success" : ""}`} />
          {
            file && <span>{file.name}</span>
          }
        </div>
      </div>
      <br></br>
      {
        state.loading ? 
        <button type="button" className="Button AddVideo Button--Success UploadButton">
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
          <span>Subiendo vídeo</span>
        </button> 
        : 
        <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.title || !data.description || !file)}>
          <FontAwesomeIcon icon={faSave} />
          <span>Guardar cambios</span>
        </button>
      }
    </form>
  );
}

export default UploadVideoForm;
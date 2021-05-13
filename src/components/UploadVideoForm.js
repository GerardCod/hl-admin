import React, { useContext, useState } from 'react';
import { faFileUpload, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VideoContext } from '../contexts/VideoContext';

const UploadVideoForm = () => {
  const { uploadVideo } = useContext(VideoContext);
  const [data, setData] = useState({views: 0});
  const [file, setFile] = useState();

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handlePickUpFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadVideo(data, file);
  }

  return (
    <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título del vídeo</label>
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Descripción del vídeo</label>
        <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es el vídeo de un conejo gordo" />
      </p>
      <div className="Textfield">
        <label className="Textfield__Label" htmlFor="description">
          Elige un vídeo
        </label>
        <div className="Textfield__Input Input--File">
          <input type="file" name="video" id="video" onChange={handlePickUpFile} />
          <FontAwesomeIcon icon={faFileUpload} className="Input__Icon" />
        </div>
      </div>
      <br></br>
      <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.title || !data.description || !file)}>
        <FontAwesomeIcon icon={faSave} />
        <span>Guardar cambios</span>
      </button>
    </form>
  );
}

export default UploadVideoForm;
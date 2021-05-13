import React, { useState } from 'react';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadVideoForm = () => {
  const [data, setData] = useState({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="Form--Upload flex flex--column">
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título del vídeo</label>
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Descripción del vídeo</label>
        <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es el vídeo de un conejo gordo" />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">
          Elige un vídeo
        </label>
        <div className="Textfield__Input Input--File">
          <input type="file" name="video" id="video" />
          <FontAwesomeIcon icon={faFileUpload} className="Input__Icon" />
        </div>
      </p>
    </form>
  );
}

export default UploadVideoForm;
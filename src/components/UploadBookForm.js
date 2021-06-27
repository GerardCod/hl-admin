import React, { useContext, useRef, useState } from 'react';
import { onError, onSuccess } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { BooksContext } from '../contexts/BooksContext';

const UploadBookForm = () => {
  const { state, uploadBook } = useContext(BooksContext);
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const formRef = useRef({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim()
    });
  }

  const handlePickUpFile = e => {
    const file = e.target.files[0];
    if (file.type === 'application/pdf') {
      setFile(file);
    } else {
      onError('Solo puedes escoger archivos PDF');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    uploadBook(data, file, {onSuccess, onError});
    setData({});
    setFile({});
    formRef.current.reset();
  }

  return (
    <form ref={formRef} className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="title">Título del libro</label>
        <input className="Textfield__Input Input--Full" type="text" name="title" id="title" onChange={handleChange} placeholder="El principito" required />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="description">Pequeña descripción del libro</label>
        <textarea columns="80" rows="10" name="description" id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es la historia de un principito" required />
      </p>
      <div className="Textfield">
        <label className="Textfield__Label" htmlFor="description">
          Elige un archivo
        </label>
        <div className="Textfield__Input Input--File flex flex--column f-justify--center f-align--center">
          <input type="file" name="book" id="video" accept=".pdf" onChange={handlePickUpFile} required />
          <FontAwesomeIcon icon={faFileUpload} className={`Input__Icon ${file ? "Icon--Success" : ""}`} />
          {
            file && <span>{file.name}</span>
          }
        </div>
      </div>
      <br></br>
      {
        state.loading ? 
        <button type="button" className="Button Button--Icon Button--Success width--full" disabled>
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
          <span>Subiendo libro</span>
        </button> 
        : 
        <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.title || !data.description || !file)}>
          <FontAwesomeIcon icon={faSave} />
          <span>Guardar cambios</span>
        </button>
      }
    </form>
  );
}

export default UploadBookForm;
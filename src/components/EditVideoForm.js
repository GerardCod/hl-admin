import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { VideoContext } from '../contexts/VideoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from '../components/VideoPlayer';

const EditVideoForm = ({ id, video }) => {
  const { state: { error, loading }, editVideo } = useContext(VideoContext);
  const [data, setData] = useState({ ...video });

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    editVideo(id, data).then(() => {
      swal({ title: 'Excelente', text: 'El vídeo ha sido actualizado', icon: 'success' });
    }).catch(() => {
      swal({ title: 'Qué pena', text: error, icon: 'error' });
    });
  }

  return (
    <>
      <div>
        <VideoPlayer url={data.url} />
        <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
          <p className="Textfield">
            <label className="Textfield__Label" htmlFor="title">Título del vídeo</label>
            <input className="Textfield__Input Input--Full" defaultValue={data.title} type="text" name="title" id="title" onChange={handleChange} placeholder="Big buck bunny" required />
          </p>
          <p className="Textfield">
            <label className="Textfield__Label" htmlFor="description">Descripción del vídeo</label>
            <textarea columns="80" rows="10" name="description" defaultValue={data.description} id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es el vídeo de un conejo gordo" required />
          </p>
          {
            loading ?
              <button type="button" className="Button AddVideo Button--Success UploadButton" disabled>
                <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
                <span>Subiendo vídeo</span>
              </button>
              :
              <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.title || !data.description)}>
                <FontAwesomeIcon icon={faSave} />
                <span>Guardar cambios</span>
              </button>
          }
        </form>
      </div>
    </>
  );
}

export default EditVideoForm;
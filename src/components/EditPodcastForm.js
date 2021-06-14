import React, { useContext, useState, Fragment } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import { PodcastContext } from '../contexts/PodcastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { onSuccess, onError } from '../utils';

const EditPodcastForm = ({ podcast }) => {
  const { state: { loading }, editPodcast } = useContext(PodcastContext);
  const [data, setData] = useState(podcast);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    editPodcast(podcast.id, data, { onSuccess: () => onSuccess('Actualización exitosa'), onError });
  }

  return (
    <Fragment>
      <div>
        <AudioPlayer url={data.url} />
        <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
          <p className="Textfield">
            <label className="Textfield__Label" htmlFor="title">Título del podcast</label>
            <input className="Textfield__Input Input--Full" defaultValue={data.title} type="text" name="title" id="title" onChange={handleChange} placeholder="El miedo" required />
          </p>
          <p className="Textfield">
            <label className="Textfield__Label" htmlFor="description">Descripción del podcast</label>
            <textarea columns="80" rows="10" name="description" defaultValue={data.description} id="description" className="Textfield__Input Input--Full" onChange={handleChange} placeholder="Es un podcast de migala" required />
          </p>
          {
            loading ?
              <button type="button" className="Button AddVideo Button--Success UploadButton" disabled>
                <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
                <span>Subiendo podcast</span>
              </button>
              :
              <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.title || !data.description)}>
                <FontAwesomeIcon icon={faSave} />
                <span>Guardar cambios</span>
              </button>
          }
        </form>
      </div>
    </Fragment>
  );
}

export default EditPodcastForm;
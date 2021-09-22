import React, { useContext, useState, Fragment } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import { PodcastContext } from '../contexts/PodcastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { onSuccess, onError } from '../utils';
import TextArea from './TextArea';

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
            <label className="Textfield__Label" htmlFor="title">Título del audio</label>
            <input className="Textfield__Input Input--Full" defaultValue={data.title} type="text" name="title" id="title" onChange={handleChange} placeholder="El miedo" required />
          </p>
          <TextArea label="Descripción del audio" name="description" onChange={handleChange} defaultValue={data.description} />
          {
            loading ?
              <button type="button" className="Button AddVideo Button--Success UploadButton" disabled>
                <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
                <span>Actualizando audio</span>
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
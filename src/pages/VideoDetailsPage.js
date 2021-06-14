import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEye } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import VideoPlayer from '../components/VideoPlayer';
import Back from '../components/Back';

const VideoDetailsPage = () => {
  const { getAndObserveVideo, state: { videoSelected }, videoListenerRef } = useContext(VideoContext);
  const { id } = useParams();
  const viewsRef = useRef({});

  useEffect(() => {
    function showError(text) {
      swal({title: 'Error obteniendo el vídeo', text, icon: 'error'});
    }

    function fetchVideo(id) {
      getAndObserveVideo(id, showError);
      return videoListenerRef.current;
    }
    const listener = fetchVideo(id);
    
    return () => {
      listener();
    }
  }, [getAndObserveVideo, id, videoListenerRef])

  const revealViews = () => {
    viewsRef.current.classList.toggle('Views--Active');
  }

  return (
    <Fragment>
      <Back urlBack="/admin/videos" />
      {
        videoSelected ?
          <div className="VideoLayout">
            <div>
              <h1>{videoSelected.title}</h1>
              <VideoPlayer url={videoSelected.url} />
              <button className="Button Button--Icon Button--Primary Button--Views" onClick={revealViews}>
                <FontAwesomeIcon icon={faEye} />
                <span>Ver vistas</span>
              </button>
              <section>
                <h2>Descripción</h2>
                <p>{videoSelected.description}</p>
              </section>
              <section>
                <h2>Comentarios</h2>
              </section>
            </div>
            <aside ref={viewsRef} className="Views">
              <h2>Visto por</h2>
            </aside>
          </div> :
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
      }
    </Fragment>
  );
}

export default VideoDetailsPage;
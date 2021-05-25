import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import VideoPlayer from '../components/VideoPlayer';
import Back from '../components/Back';

const VideoDetailsPage = () => {
  const { getAndObserveVideo, state: { videoSelected }, videoListenerRef } = useContext(VideoContext);
  const { id } = useParams();

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

  return (
    <>
      <Back urlBack="/admin/videos" />
      {
        videoSelected ?
          <div className="VideoLayout">
            <div>
              <h1>{videoSelected.title}</h1>
              <VideoPlayer url={videoSelected.url} />
              <section>
                <h2>Descripción</h2>
                <p>{videoSelected.description}</p>
              </section>
              <section>
                <h2>Comentarios</h2>
              </section>
            </div>
            <aside>
              <h2>Visto por</h2>
            </aside>
          </div> :
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
      }
    </>
  );
}

export default VideoDetailsPage;
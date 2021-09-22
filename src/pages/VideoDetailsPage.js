import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEye } from '@fortawesome/free-solid-svg-icons';
import { VideoContext } from '../contexts/VideoContext';
import swal from 'sweetalert';
import VideoPlayer from '../components/VideoPlayer';
import Back from '../components/Back';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import { AuthContext } from '../contexts/AuthContext';
import { createComment, onError, onSuccess } from '../utils';
import Watch from '../components/Watch';
import TextDescription from '../components/TextDescription';

const VideoDetailsPage = () => {
  const { getAndObserveVideo, state: { videoSelected }, videoListenerRef, addComment } = useContext(VideoContext);
  const { fetchUserData } = useContext(AuthContext);
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

  const submitVideoComment = ({comment}) => {
    const user = fetchUserData();
    const newComment = createComment(comment, user);
    addComment(videoSelected, newComment, {onSuccess, onError});
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
                <TextDescription text={videoSelected.description} />
              </section>
              <section>
                <h2>Comentarios</h2>
                <AddComment submitComment={submitVideoComment} />
                {
                  (videoSelected.comments && videoSelected.comments.length > 0) &&
                  videoSelected.comments.map((comment, idx) => <Comment {...comment} key={`video-comment: ${idx}`} />)
                }
              </section>
            </div>
            <aside ref={viewsRef} className="Views">
              <h2>Visto por</h2>
              {
                (
                  (videoSelected.views && videoSelected.views.length > 0) &&
                  videoSelected.views.map((view, idx) => <Watch {...view} key={`video-view: ${idx}`} />)
                )
              }
            </aside>
          </div> :
          <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
      }
    </Fragment>
  );
}

export default VideoDetailsPage;
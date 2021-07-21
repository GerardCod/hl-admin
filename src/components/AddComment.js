import React, { Fragment, useContext, useRef, useState } from 'react'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../contexts/AuthContext'
import { PodcastContext } from '../contexts/PodcastContext'
import { createComment, onError, onSuccess } from '../utils'

const AddComment = ({podcast}) => {
  const [data, setData] = useState({comment: ''}); 
  const { fetchUserData, state } = useContext(AuthContext);
  const { addComment } = useContext(PodcastContext);
  const formRef = useRef({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trimLeft(),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
    const comment = createComment(data.comment, state.user);
    addComment(podcast, comment, { onSuccess, onError });
    setData({comment: ''});
    formRef.current.reset();
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="comment" className="Text--bold">Agrega un comentario</label>
        <div className="grid AddComment AddComment--Round">
          <input type="text" name="comment" id="comment" value={data.comment} onChange={handleChange} />
          <button type="submit" className="Button--Primary" disabled={!data.comment}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default AddComment;
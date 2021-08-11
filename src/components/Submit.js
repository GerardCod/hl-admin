import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useContext } from 'react';
import { createComment } from '../utils';
import { AuthContext } from '../contexts/AuthContext';

import AddComment from './AddComment';
import SubmitItem from './SubmitItem';

const Submit = ({ submit, uploadComment }) => {
  const { fetchUserData } = useContext(AuthContext);

  const submitComment = ({ comment }) => {
    const newComment = createComment(comment, fetchUserData());
    uploadComment(newComment);
  }

  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <h4>{submit.user.name}</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex--column width--full">
            {
              (submit.submit.evidences && submit.submit.evidences.length > 0) &&
              submit.submit.evidences.map((e, idx) => <SubmitItem file={e} key={`evidence-file-${idx}`} />)
            }
            <AddComment submitComment={submitComment} />
          </div>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

export default Submit;
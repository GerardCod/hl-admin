import React, { Fragment } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const AssessmentSubmit = ({ submit, type }) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={ <ExpandMore /> }
        >
          <h4>{submit.user.name}</h4>
        </AccordionSummary>
        <AccordionDetails>
          {
            type === 'enlace' ?
            <article>
              <h5>Enlace de la evaluación</h5>
              <a href={submit.submit.link} target="_blank" rel="noreferrer">{submit.submit.link}</a>
            </article> :
            <article className="width--full flex f-justify--center f-align--center">
              <div className="width--full flex flex--column f-align--center f-justify--center">
                <h6 className="Text--center">Calificación obtenida</h6>
                <span className="Text--center AssessmentSubmit__Score">{submit.submit.score} / 10</span>
              </div>
            </article>
          }
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

export default AssessmentSubmit;
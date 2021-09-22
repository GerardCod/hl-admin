import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

export default function TextDescription({text}) {
  return (
    <Fragment>
      {
        `${text}`.split('\n').map((paragraph, index) => <p key={`p-description-id: ${index}`} className="mb-1rem align--justify">{parse(paragraph)}</p>)
      }
    </Fragment>
  );
}

TextDescription.propTypes = {
  text: PropTypes.string.isRequired
};
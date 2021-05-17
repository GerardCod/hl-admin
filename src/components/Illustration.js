import React from 'react';
import PropTypes from 'prop-types';

const Illustration = ({ illustration, message }) => {
  return (
    <div className="full-width flex flex--center flex--column">
      <figure className="Illustration">
        <img src={illustration} alt="illustration" />
      </figure>
      <p className="IllustrationDescription">{message}</p>
    </div>
  );
}

Illustration.propTypes = {
  illustration: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Illustration;
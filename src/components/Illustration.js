import React from 'react';
import PropTypes from 'prop-types';
import image from '../assets/empty.png';

const Illustration = ({ illustration = image, message }) => {
  return (
    <div className="width--full flex f-justify--center f-align--center flex--column">
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
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Loader = ({ text }) => {
  return (
    <div className="flex flex--column Loader">
      <FontAwesomeIcon icon={faCircleNotch} className="Loader__Icon Loading" />
      <span className="Loader__Text">{ text }</span>
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Loader;
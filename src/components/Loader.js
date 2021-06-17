import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Loader = ({ text, light }) => {
  return (
    <div className="flex flex--column Loader">
      <FontAwesomeIcon icon={faCircleNotch} className={`Loader__Icon Loading ${light ? "Icon--Light" : ""}`} />
      <span className={`Loader__Text ${light ? "Text--white" : ""}`}>{ text }</span>
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Loader;
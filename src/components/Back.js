import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Back = ({urlBack}) => (
  <Link to={urlBack} className="Link--Back">
    <FontAwesomeIcon icon={faChevronLeft} />
    <span>Regresar</span>
  </Link>
);

Back.propTypes = {
  urlBack: PropTypes.string.isRequired,
}

export default Back;
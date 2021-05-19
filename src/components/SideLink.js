import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideLink = ({ url, icon, text }) => {
  return (
    <Link to={url} className="Sidenav__SectionItem Text--white">
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </Link>
  );
}

export default SideLink;
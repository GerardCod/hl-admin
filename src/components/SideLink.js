import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideLink = ({ url, icon, text, onClick }) => {
  return (
    <Link to={url} className="Sidenav__SectionItem Text--white" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="Sidenav__SectionItemText">{text}</span>
    </Link>
  );
}

export default SideLink;
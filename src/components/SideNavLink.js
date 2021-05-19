import React from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNavLink = ({ url, icon, text }) => {
  console.log(url);
  return (
    <NavLink to={url} className="Sidenav__SectionItem Text--white" activeClassName="Sidenav__SectionItem--Active">
      <FontAwesomeIcon icon={icon} className="Sidenav__SectionItemIcon" />
      <span className="Sidenav__SectionItemText">{text}</span>
      <span className="Sidenav__SectionItemBg"></span>
    </NavLink>
  );
}

export default SideNavLink;
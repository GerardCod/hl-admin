import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SidenavAdmin = () => {
  return (
    <nav className="Sidenav flex flex--column">
      <figure className="AvatarWrapper">
        <img src="https://firebasestorage.googleapis.com/v0/b/homegrown-learning.appspot.com/o/avatar_katia.webp?alt=media&token=15295e33-bd7e-4948-90dd-cc60e6d5a2e2" alt="avatar" className="Avatar" />
        <figcaption className="Avatar__Description Text--white">Hola Katia</figcaption>
      </figure>
      <section className="Sidenav__Section">
        <h3 className="Sidenav__SectionTitle Text--white">Gestión</h3>
        <NavLink to="/videos" className="Sidenav__SectionItem Text--white">
          <FontAwesomeIcon icon={faVideo} />
          <span>Videos</span>
        </NavLink>
      </section>
      <section className="Sidenav__Section">
        <h3 className="Sidenav__SectionTitle Text--white">Configuración</h3>
        <Link to="/" className="Sidenav__SectionItem Text--white">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Salir</span>
        </Link>
      </section>
    </nav>
  );
}

export default SidenavAdmin;
import { faVideo, faSignOutAlt, faPodcast, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SideNavLink from './SideNavLink';
import SideLink from './SideLink';

const SidenavAdmin = () => {
  return (
    <nav className="Sidenav flex flex--column">
      <figure className="AvatarWrapper">
        <img src="https://firebasestorage.googleapis.com/v0/b/homegrown-learning.appspot.com/o/avatar_katia.webp?alt=media&token=15295e33-bd7e-4948-90dd-cc60e6d5a2e2" alt="avatar" className="Avatar" />
        <figcaption className="Avatar__Description Text--white">Hola Katia</figcaption>
      </figure>
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Gestión</h3>
        <SideNavLink url="/admin/accounts" icon={faUser} text="Usuarios" />
        <SideNavLink url="/admin/videos" icon={faVideo} text="Videos" />
        <SideNavLink url="/admin/podcasts" icon={faPodcast} text="Podcasts" />
      </section>
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Configuración</h3>
        <SideLink url="/" icon={faSignOutAlt} text="Salir" />
      </section>
    </nav>
  );
}

export default SidenavAdmin;
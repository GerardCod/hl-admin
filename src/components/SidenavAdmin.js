import { faVideo, faSignOutAlt, faPodcast, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import SideNavLink from './SideNavLink';
import SideLink from './SideLink';
import { AuthContext } from '../contexts/AuthContext';

const SidenavAdmin = () => {
  const {signOut, state} = useContext(AuthContext); 

  return (
    <nav className="Sidenav flex flex--column">
      <figure className="AvatarWrapper flex--center">
        <img src={state.user.avatar} alt="avatar" className="Avatar" />
        <figcaption className="Avatar__Description Text--white">Hola {state.user.name}</figcaption>
      </figure>
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Gestión</h3>
        <SideNavLink url="/admin/accounts" icon={faUser} text="Usuarios" />
        <SideNavLink url="/admin/videos" icon={faVideo} text="Videos" />
        <SideNavLink url="/admin/podcasts" icon={faPodcast} text="Podcasts" />
      </section>
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Configuración</h3>
        <SideLink url="/" icon={faSignOutAlt} text="Salir" onClick={() => { signOut(); }} />
      </section>
    </nav>
  );
}

export default SidenavAdmin;
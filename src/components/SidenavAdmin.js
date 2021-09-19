import { faVideo, faSignOutAlt, faPodcast, faUser, faFile, faBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import SideNavLink from './SideNavLink';
import SideLink from './SideLink';
import { AuthContext } from '../contexts/AuthContext';

const SidenavAdmin = () => {
  const { signOut, fetchUserData } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(fetchUserData());
  }, [fetchUserData]);

  console.log(user);

  return (
    <nav className="Sidenav flex flex--column">
      {
        user ?
          <figure className="AvatarWrapper flex--center">
            <img src={user.avatar} alt="avatar" className="Avatar" />
            <figcaption className="Avatar__Description Text--white">Hola {user.name}</figcaption>
          </figure> :
          <p>Cargando...</p>
      }
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Gestión</h3>
        <SideNavLink url="/admin/activities" icon={faFile} text="Actividades" />
        <SideNavLink url="/admin/assessments" icon={faClipboardList} text="Evaluaciones" />
        {
          (user && user.role.name === 'Administrador') && <SideNavLink url="/admin/accounts" icon={faUser} text="Usuarios" />
        }
        <SideNavLink url="/admin/videos" icon={faVideo} text="Videos" />
        <SideNavLink url="/admin/podcasts" icon={faPodcast} text="Audios" />
        <SideNavLink url="/admin/books" icon={faBook} text="Libros" />
      </section>
      <section className="Sidenav__Section flex flex--column">
        <h3 className="Sidenav__SectionTitle Text--white">Configuración</h3>
        <SideLink url="/" icon={faSignOutAlt} text="Salir" onClick={() => { signOut(); }} />
      </section>
    </nav>
  );
}

export default SidenavAdmin;
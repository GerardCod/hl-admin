import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useRef} from 'react';
import SidenavAdmin from '../components/SidenavAdmin';
import logo from '../assets/logo_full.svg';

const Admin = ({ children }) => {
  const sidenavRef = useRef({});

  const revealSideNav = () => {
    sidenavRef.current.classList.toggle('AdminLayout__Sidenav--Active');
    console.log(sidenavRef.current.classList);
  }

  return (
    <div className="AdminLayout">
      <header className="AdminLayout__Header position--relative">
        <div className="flex f-align--center">
          <figure className="AppIcon">
            <img src={logo} alt="app_icon" />
          </figure>
          <h3 className="AppName">Homegrown Learning</h3>
        </div>
        <button className="NavButton position--absolute right--0" onClick={revealSideNav}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>
      <aside className="AdminLayout__Sidenav" ref={sidenavRef}>
        <SidenavAdmin />
      </aside>
      <main className="AdminLayout__Content">
        {children}
      </main>
    </div>
  );
}

export default Admin;
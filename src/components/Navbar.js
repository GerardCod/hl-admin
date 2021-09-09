import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = function Component() {
  return (
    <Fragment>
      <nav className="flex width--full Navbar f-justify--around f-align--center">
        <figure className="Navbar__Logo flex f-align--center">
          <img src={logo} alt="logo_platform" />
          <h4 className="Navbar__Text">Homegrown Learning</h4>
        </figure>
        <Link to="/login" className="Navbar__Text">
          Iniciar sesión
        </Link>
      </nav>
    </Fragment>
  );
}

export default Navbar;
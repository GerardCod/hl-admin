import { faMailBulk, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';

const Footer = function Component() {
  return (
    <Fragment>
      <footer className="Footer">
        <article className="Footer__Content">
          <h3 className="Footer__Title Text--white">Contacto</h3>
          <div className="flex Text--white Contact">
            <FontAwesomeIcon icon={faUser} />
            <span className="Contact__Value">Katia Lizbeth Castro Rodríguez</span>
          </div>
          <div className="flex Text--white Contact">
            <FontAwesomeIcon icon={faPhone} />
            <span className="Contact__Value">2381199054</span>
          </div>
          <div className="flex Text--white Contact">
            <FontAwesomeIcon icon={faMailBulk} />
            <span className="Contact__Value">katiacastrorgz@gmail.com</span>
          </div>
        </article>
      </footer>
    </Fragment>
  );
}

export default Footer;
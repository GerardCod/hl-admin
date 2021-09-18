import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import teacher from '../assets/3.png';
import admin from '../assets/teacher.png';

export default function SignInPage() {
  return (
    <Fragment>
      <div className="HomeList flex flex--wrap">
        <h1 className="Text--white text--center title--main">Bienvenido a Homegrown Learning</h1>
        <div className="HomeList__item">
          <Link to="login/Docente" >
            <div className="card">
              <div className="HomeList__item__img">
                <img src={teacher} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Ingresar como docente</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="HomeList__item">
          <Link to="login/Administrador">
            <div className="card">
              <div className="HomeList__item__img">
                <img src={admin} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Ingresar como administrador</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
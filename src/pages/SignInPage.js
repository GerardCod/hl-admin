import React, { Fragment } from 'react';

export default function SignInPage() {
  return (
    <Fragment>
      <div className="HomeList flex flex--wrap">
        <h1 className="text--white text--center title--main">Bienvenido a Homegrown Learning</h1>
        <div className="HomeList__item">
          <Link to="login/Estudiante" >
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_kid} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Ingresar como docente</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="HomeList__item">
          <Link to="login/Invitado">
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_guest} alt="avatar" />
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
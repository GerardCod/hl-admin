import React, { useContext, useState } from 'react';
import logo from '../assets/logo.svg';
import { AuthContext } from '../contexts/AuthContext';
import { onError, onSuccess } from '../utils';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ChangePasswordForm = ({ code }) => {
  const [data, setData] = useState({});
  const { state, changePassword } = useContext(AuthContext);


  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    changePassword(code, data, { onSuccess, onError });
  }

  return (
    <form className="LoginForm flex flex--column f-justify--evenly" onSubmit={handleSubmit}>
      {
        state.password_changed && <Redirect to="/" />
      }
      <figure className="f-self-align--center Lady">
        <img src={logo} alt="platform_logo" />
        <figcaption>Cambio de contraseña</figcaption>
      </figure>
      <div className="flex flex--column">
        <p className="Textfield width--full">
          <label className="Textfield__Label" htmlFor="password">Nueva contraseña</label>
          <input className="Textfield__Input width--full" type="password" name="password" id="password" onChange={handleChange} placeholder="********" />
        </p>
        <p className="Textfield width--full">
          <label className="Textfield__Label" htmlFor="confirmPassword">Confirmar contraseña</label>
          <input className="Textfield__Input width--full" type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} placeholder="********" />
        </p>
        {
          state.loading ?
            <button type="button" className="Button Button--Primary Button--Icon width--full" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Cambiando la contraseña</span>
            </button> :
            <button type="submit" className="Button Button--Primary width--full" disabled={(!data.password || !data.confirmPassword)}>Cambiar de contraseña</button>
        }
      </div>
    </form>
  );
}

export default ChangePasswordForm;
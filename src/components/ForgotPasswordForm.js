import React, { useContext, useState } from 'react';
import logo from '../assets/logo.svg';
import { AuthContext } from '../contexts/AuthContext';
import { onError, onSuccess } from '../utils';
import Back from './Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordForm = () => {
  const [data, setData] = useState({});
  const { state, forgotPassword } = useContext(AuthContext);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    forgotPassword(data, { onSuccess, onError });
  }

  return (
    <form className="LoginForm flex flex--column f-justify--evenly position--relative" onSubmit={handleSubmit}>
      <div className="position--absolute z-index--1 top--5v">
        <Back urlBack="/" />
      </div>
      <figure className="Lady f-self-align--center">
        <img src={logo} alt="platform_logo" />
        <figcaption>Bienvenido a Homegrown Learning</figcaption>
      </figure>
      <div>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
          <input className="Textfield__Input" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@gmail.com" />
        </p>
        {
          state.loading ?
            <button type="button" className="Button Button--Primary Button--Icon" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Enviando correo</span>
            </button> :
            <button type="submit" className="Button Button--Primary width--full" disabled={!data.email}>Enviar correo</button>
        }
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
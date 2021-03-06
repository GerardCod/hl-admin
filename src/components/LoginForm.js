import React, { useContext, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { AuthContext } from '../contexts/AuthContext';
import { onError, onSuccess } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Back from '../components/Back';
import PasswordInput from './PasswordInput';

const LoginForm = () => {
  const { state, signin } = useContext(AuthContext);
  const { role } = useParams();
  const [data, setData] = useState({role})

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    signin(data, { onSuccess, onError });
  }

  return (
    <form className="LoginForm flex flex--column f-justify--evenly" onSubmit={handleSubmit}>
      <Back urlBack="/login" />

      {
        state.user && <Redirect to="/admin/activities" />
      }
      <figure className="f-self-align--center Lady">
        <img src={logo} alt="platform_logo" />
        <figcaption>Bienvenido a Homegrown Learning</figcaption>
      </figure>
      <div className="flex flex--column">
        <p className="Textfield width--full">
          <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
          <input className="Textfield__Input width--full" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@gmail.com" />
        </p>
        <PasswordInput label="Contraseña" onChange={handleChange} name="password" />
        <div className="f-self-align--end">
          <Link to="/forgot_password" className="Link--ForgotPassword">¿Olvidaste tu contraseña?</Link>
        </div>
        {
          state.loading ?
            <button type="button" className="Button Button--Primary Button--Icon width--full" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Iniciando sesión</span>
            </button> :
            <button type="submit" className="Button Button--Primary width--full" disabled={(!data.email || !data.password)}>Ingresar</button>
        }
      </div>
    </form>
  );
}

export default LoginForm;
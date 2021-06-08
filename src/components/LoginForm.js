import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import lady from '../assets/lady.svg';
import { AuthContext } from '../contexts/AuthContext';
import { onError, onSuccess } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const { state, signin } = useContext(AuthContext);
  const [data, setData] = useState({})

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
    <form className="Form flex flex--column" onSubmit={handleSubmit}>
      {
        state.user && <Redirect to="/admin/accounts" />
      }
      <object data={lady} width="175" height="275" aria-label="lady"></object>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
        <input className="Textfield__Input" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@gmail.com" />
      </p>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="password">Contraseña</label>
        <input className="Textfield__Input" type="password" name="password" id="password" onChange={handleChange} placeholder="********" />
        <Link to="/forgot_password" className="forgotPassword">¿Olvidaste su contraseña?</Link>
      </p>
      {
        state.loading ?
          <button type="button" className="SubmitButton AddVideo" disabled>
            <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
            <span>Iniciando sesión</span>
          </button> :
          <button type="submit" className="SubmitButton">Ingresar</button>
      }
    </form>
  );
}

export default LoginForm;
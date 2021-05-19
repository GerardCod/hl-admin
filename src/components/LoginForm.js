import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import lady from '../assets/lady.svg';

const LoginForm = () => {
  const [data, setData] = useState({})
  const [redirect, setRedirect] = useState(false);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setRedirect(true);
  }

  return (
    <form className="Form flex flex--column" onSubmit={handleSubmit}>
      {
        redirect && <Redirect to="/admin/videos" />
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
      <button type="submit" className="SubmitButton">Ingresar</button>
    </form>
  );
}

export default LoginForm;
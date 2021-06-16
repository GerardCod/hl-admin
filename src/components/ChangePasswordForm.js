import React, { useState } from 'react';
import logo from '../assets/logo.svg';

const ChangePasswordForm = () => {
  const [data, setData] = useState({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    delete data.confirmPassword;
    console.log('Submitting data');
  }

  return (
    <form className="LoginForm flex flex--column f-justify--evenly" onSubmit={handleSubmit}>
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
        <button type="submit" className="Button Button--Primary width--full" disabled={(!data.password || !data.confirmPassword)}>Cambiar de contraseña</button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
import React, { useState } from 'react';
import lady from '../assets/lady.svg';
import Back from './Back';

const ForgotPasswordForm = () => {
  const [data, setData] = useState({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
  } 

  return (
    <form className="Form flex flex--column" onSubmit={handleSubmit}>
      <Back urlBack="/" />     
      <object data={lady} width="175" height="275" aria-label="lady"></object>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
        <input className="Textfield__Input" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@gmail.com" />
      </p>
      <button type="submit" className="SubmitButton">Enviar correo</button>
    </form>
  );
}

export default ForgotPasswordForm;
import React, { useContext, useState } from 'react';
import lady from '../assets/lady.svg';
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
    <form className="Form flex flex--column" onSubmit={handleSubmit}>
      <Back urlBack="/" />
      <object data={lady} width="175" height="275" aria-label="lady"></object>
      <p className="Textfield">
        <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
        <input className="Textfield__Input" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@gmail.com" />
      </p>
      {
        state.loading ?
          <button type="button" className="SubmitButton AddVideo" disabled>
            <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
            <span>Enviando correo</span>
          </button> :
          <button type="submit" className="SubmitButton" disabled={!data.email}>Enviar correo</button>
      }
    </form>
  );
}

export default ForgotPasswordForm;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function PasswordInput({ label, onChange, name }) {
  const [type, setType] = useState('password');

  function changeType() {
    let newType = (type === 'password') ? 'text' : 'password';
    setType(newType);
  }

  return (
    <div className="Textfield width--full">
      <label className="Textfield__Label" htmlFor="password">{label}</label>
      <p className="Textfield__Input width--full grid PasswordField">
        <input type={type} name={name} id={name} onChange={onChange} placeholder="********" />
        <FontAwesomeIcon className="cursor--pointer" icon={(type === 'password') ? faEye : faEyeSlash} onClick={() => { changeType(); }} />
      </p>
    </div>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
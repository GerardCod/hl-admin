import React, { Fragment, useContext, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { onSuccess, onError, userRoles } from '../utils';
import { AccountContext } from '../contexts/AccountContext';
import AvatarSelector from './AvatarSelector';
import PasswordInput from './PasswordInput';

const CreateAccountForm = () => {
  const { state, createStudentAccount, createAccount } = useContext(AccountContext);
  const [data, setData] = useState({});
  const formRef = useRef({});

  function handleChange(e) {
    let value = (e.target.name === 'role') ? JSON.parse(e.target.value) : e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      onError('Las contraseñas no coinciden');
    } else {
      submitData(data);
    }
    formRef.current.reset();
    setData({});
  }

  const submitData = (data) => {
    if (data.role.name === userRoles[0].name) {
      createStudentAccount(data, { onSuccess, onError });
    } else {
      createAccount(data, { onSuccess, onError });
    }
  }

  return (
    <Fragment>
      <form ref={formRef} className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="name">Nombre completo del usuario</label>
          <input className="Textfield__Input Input--Full" type="text" name="name" id="name" onChange={handleChange} placeholder="Katia Rodríguez" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
          <input className="Textfield__Input Input--Full" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@ejemplo.com" required />
        </p>
        <PasswordInput label="Contraseña" onChange={handleChange} name="password" />
        <PasswordInput label="Confirmar contraseña" onChange={handleChange} name="confirmPassword" />
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="role">Rol</label>
          <select className="Textfield__Input Input--Full" name="role" defaultValue="" id="role" onChange={handleChange} required>
            <option value="">Elige un rol</option>
            {
              userRoles.map((role, idx) => <option key={`role-${idx}`} value={JSON.stringify(role)}>{role.name}</option>)
            }
          </select>
        </p>
        <AvatarSelector onChange={handleChange} value={data.avatar} />
        <br></br>
        {
          state.loading ?
            <button type="button" className="Button Button--Icon Button--Success width--full" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Creando cuenta</span>
            </button>
            :
            <button type="submit" className="Button Button--Icon Button--Success width--full" disabled={(!data.name || !data.email || !data.password || !data.role || !data.avatar)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
        }
      </form>
    </Fragment>
  );
}

export default CreateAccountForm;
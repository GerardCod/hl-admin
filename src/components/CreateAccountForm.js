import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { roles, onSuccess, onError } from '../utils';
import { AccountContext } from '../contexts/AccountContext';

const CreateAccountForm = () => {
  const { state, createStudentAccount, createAccount } = useContext(AccountContext);
  const [data, setData] = useState({});

  const handleChange = e => {
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
  }
  
  const submitData = (data) => {
    if (data.role.name === roles[0].name) {
      createStudentAccount(data, {onSuccess, onError});
    } else {
      createAccount(data, {onSuccess, onError});
    }
  }

  return (
    <>
      <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="name">Nombre completo del usuario</label>
          <input className="Textfield__Input Input--Full" type="text" name="name" id="name" onChange={handleChange} placeholder="Katia Rodríguez" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
          <input className="Textfield__Input Input--Full" type="email" name="email" id="email" onChange={handleChange} placeholder="ejemplo@ejemplo.com" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="password">Contraseña</label>
          <input className="Textfield__Input Input--Full" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$" 
            title="La contraseña debe tener al menos 8 caracteres y debe contener una letra minúscula. una letra mayúscula y un número" 
            type="password" name="password" id="password" 
            onChange={handleChange} placeholder="**************" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="password">Confirmar contraseña</label>
          <input className="Textfield__Input Input--Full" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
            title="La contraseña debe tener al menos 8 caracteres y debe contener una letra minúscula. una letra mayúscula y un número" 
            type="password" name="confirmPassword" id="confirmPassword" 
            onChange={handleChange} placeholder="**************" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="role">Rol</label>
          <select className="Textfield__Input Input--Full" name="role" defaultValue="" id="role" onChange={handleChange} required>
            <option value="">Elige un rol</option>
            {
              roles.map((role, idx) => <option key={`role-${idx}`} value={JSON.stringify(role)}>{role.name}</option>)
            }
          </select>
        </p>
        <br></br>
        {
          state.loading ?
            <button type="button" className="Button AddVideo Button--Success UploadButton" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Creando cuenta</span>
            </button>
            :
            <button type="submit" className="Button AddVideo Button--Success UploadButton" disabled={(!data.name || !data.email || !data.password || !data.role)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
        }
      </form>
    </>
  );
}

export default CreateAccountForm;
import React, { Fragment, useContext, useState } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { onError, onSuccess, roles } from '../utils';
import AvatarSelector from './AvatarSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const EditAccountForm = ({ account }) => {
  const [data, setData] = useState(account);
  const { state, editAccount } = useContext(AccountContext);

  const handleChange = e => {
    const value = (e.target.name === 'role') ? JSON.parse(e.target.value) : e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    editAccount(account.id, data, {onSuccess, onError});
  }

  return (
    <Fragment>
      <form className="Form--Upload flex flex--column" onSubmit={handleSubmit}>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="name">Nombre completo del usuario</label>
          <input className="Textfield__Input Input--Full" defaultValue={data.name} type="text" name="name" id="name" onChange={handleChange} placeholder="Katia Rodríguez" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="email">Correo electrónico</label>
          <input className="Textfield__Input Input--Full" type="email" defaultValue={data.email} name="email" id="email" onChange={handleChange} placeholder="ejemplo@ejemplo.com" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="password">Contraseña</label>
          <input className="Textfield__Input Input--Full" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
            title="La contraseña debe tener al menos 8 caracteres y debe contener una letra minúscula. una letra mayúscula y un número"
            type="password" name="password" id="password"
            defaultValue={data.password}
            onChange={handleChange} placeholder="**************" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="password">Confirmar contraseña</label>
          <input className="Textfield__Input Input--Full" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
            title="La contraseña debe tener al menos 8 caracteres y debe contener una letra minúscula. una letra mayúscula y un número"
            type="password" name="confirmPassword" id="confirmPassword"
            defaultValue={data.confirmPassword}
            onChange={handleChange} placeholder="**************" required />
        </p>
        <p className="Textfield">
          <label className="Textfield__Label" htmlFor="role">Rol</label>
          <select className="Textfield__Input Input--Full" name="role" defaultValue={JSON.stringify(data.role)} id="role" onChange={handleChange} required>
            <option value="">Elige un rol</option>
            {
              roles.map((role, idx) => <option key={`role-${idx}`} value={JSON.stringify(role)}>{role.name}</option>)
            }
          </select>
        </p>
        <AvatarSelector onChange={handleChange} value={data.avatar} />
        <br></br>
        {
          state.loading ?
            <button type="button" className="Button Button--Success Button--Icon" disabled>
              <FontAwesomeIcon icon={faCircleNotch} className="Loading" />
              <span>Modificando cuenta</span>
            </button>
            :
            <button type="submit" className="Button Button--Success Button--Icon" disabled={(!data.name || !data.email || !data.password || !data.role || !data.avatar)}>
              <FontAwesomeIcon icon={faSave} />
              <span>Guardar cambios</span>
            </button>
        }
      </form>
    </Fragment>
  );
}

export default EditAccountForm;
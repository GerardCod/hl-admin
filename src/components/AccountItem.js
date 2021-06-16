import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { AccountContext } from '../contexts/AccountContext';
import { onError, onSuccess } from '../utils';

const AccountItem = ({ avatar, name, role, id, email, password }) => {
  const { path } = useRouteMatch();
  const { deleteAccount } = useContext(AccountContext);

  const handleDelete = () => {
    swal({
      title: '¿Realmente deseas eliminar este usuario?',
      text: 'Luego de eliminarlo, el usuario no volverá a estar disponible en la plataforma',
      buttons: ['Cancelar', 'Eliminar'],
      icon: 'warning',
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteAccount({email, password}, { onSuccess, onError })
      }
    });
  }

  return (
    <Fragment>

      <tr className="AccountItem">
        <td>
          <figure className="AccountItem__Avatar">
            <img src={avatar} alt="avatar" />
          </figure>
        </td>
        <td>
          <p>{name}</p>
        </td>
        <td>
          <p>{role.name}</p>
        </td>
        <td className="AccountItem__Actions">
          <Link to={`${path}/${id}`}>
            <FontAwesomeIcon className="Icon Icon--Blue" icon={faEye} />
          </Link>
          <Link to={`${path}/${id}/edit`}>
            <FontAwesomeIcon className="Icon Icon--Purple" icon={faEdit} />
          </Link>
          <FontAwesomeIcon className="Icon Icon--Red cursor--pointer" icon={faTrash} onClick={handleDelete} />
        </td>
      </tr>
    </Fragment>
  );
}

export default AccountItem;
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AccountItem = ({avatar, name, role, id}) => {
  const {path} = useRouteMatch();

  return (
    <>
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
            <FontAwesomeIcon className="Icon--Blue" icon={faEye} />
          </Link>
          <FontAwesomeIcon className="Icon--Purple" icon={faEdit} />
          <FontAwesomeIcon className="Icon--Red" icon={faTrash} />
        </td>
      </tr>
    </>
  );
}

export default AccountItem;
import React from 'react';
import AccountItem from './AccountItem';

const AccountsTable = ({accounts}) => {
  return (
    <table className="AccountsTable">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          accounts.map(account => <AccountItem {...account} key={`account-${account.id}`}/>)
        }
      </tbody>
    </table>
  );
}

export default AccountsTable;
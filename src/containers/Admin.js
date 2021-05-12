import React from 'react';
 import SidenavAdmin from '../components/SidenavAdmin';

const Admin = ({children}) => {
  return (
    <div className="AdminLayout">
      <SidenavAdmin className="AdminLayout__Sidenav" />
      <main className="AdminLayout__Content">
        { children }
      </main>
    </div>
  );
}

export default Admin;
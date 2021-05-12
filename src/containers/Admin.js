import React from 'react';
 import SidenavAdmin from '../components/SidenavAdmin';

const Admin = ({children}) => {
  return (
    <div className="AdminLayout">
      <aside className="AdminLayout__Sidenav">
        <SidenavAdmin />
      </aside>
      <main className="AdminLayout__Content">
        { children }
      </main>
    </div>
  );
}

export default Admin;
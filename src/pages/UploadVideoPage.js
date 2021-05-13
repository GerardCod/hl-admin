import React from 'react';
import { useLocation } from 'react-router';
import Admin from '../containers/Admin';

const UploadVideoPage = () => {
  const location = useLocation();

  return (
    <Admin>
      <h1>{location.pathname}</h1>    
    </Admin>
  );
}

export default UploadVideoPage;
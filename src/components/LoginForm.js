import React from 'react';
import lady from '../lady.svg';

const LoginForm = () => {
  return (
    <form className="Form flex flex--column">
      <object data={lady} width="250" height="350"></object>
    </form>
  );
}

export default LoginForm;
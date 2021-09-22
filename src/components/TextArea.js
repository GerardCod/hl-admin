import React from 'react';
import PropTypes from 'prop-types';

export default function TextArea({label, name, onChange, placeholder, defaultValue}) {
  return (
    <p className="Textfield">
        <label className="Textfield__Label" htmlFor={name}>{label}</label>
        <textarea columns="80" rows="10" name={name} id={name} className="Textfield__Input Input--Full" 
          onChange={onChange} placeholder={placeholder || 'Un poco de texto'} required defaultValue={defaultValue || ''} />
      </p>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
}
// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ label, name, icon: Icon, ...rest }) => {
  return (
    <div className="input-block">
      {Icon && <Icon size={20} />}
      <label htmlFor={name}>{label}</label>
      <input type="text" id="name" {...rest} />
    </div>
  );
};

export default Input;

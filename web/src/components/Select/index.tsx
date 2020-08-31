import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { SelectBlock } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
const Select: React.FC<SelectProps> = ({ options, label, name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <SelectBlock className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id="name" {...rest} ref={inputRef} defaultValue={defaultValue}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <span>{error}</span>
    </SelectBlock>
  );
};

export default Select;

import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import './styles.css';
import { useField } from '@unform/core';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea
        id="name"
        {...rest}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      <span>{error}</span>
    </div>
  );
};

export default Textarea;

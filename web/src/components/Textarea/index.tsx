import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import { Container } from './styles';

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
    <Container className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea
        id="name"
        {...rest}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      <span>{error}</span>
    </Container>
  );
};

export default Textarea;

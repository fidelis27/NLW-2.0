import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, InputLabel, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
}
// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ label, name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <InputLabel>
        {Icon && <Icon size={20} />}
        <label htmlFor={name}>{label}</label>
      </InputLabel>
      <input
        defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </Container>
  );
};

export default Input;

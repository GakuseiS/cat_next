'use client';
import classNames from 'classnames';
import React, { ChangeEventHandler, FocusEventHandler, forwardRef, useState } from 'react';
import styles from './input.module.scss';

interface InputProps {
  name?: string;
  placeholder?: string;
  type?: 'password' | 'email' | 'text' | 'number';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  id?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [value, setValue] = useState('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    let value = evt.target.value;
    if (props.type === 'number') {
      value = value.replace(/\D/g, '');
    }
    setValue(value);
    props.onChange?.({ ...evt, target: Object.assign(evt.target, { value }) });
  };

  return (
    <input
      ref={ref}
      onChange={onInputChange}
      value={value}
      onBlur={props.onBlur}
      id={props.id}
      className={classNames(styles.input, props.className, props.error && styles.error)}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type === 'number' ? 'text' : props.type}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
    />
  );
});

Input.displayName = 'Input';

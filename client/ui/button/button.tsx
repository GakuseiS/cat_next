import classNames from 'classnames';
import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  size?: string;
  color?: string;
  page?: string;
  children?: React.ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { page, type, disabled, onClick, className, children, size = 'medium', color = 'green' } = props;
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[size], styles[color], page && styles[page], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

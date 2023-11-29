import classNames from 'classnames';
import React from 'react';
import './button.scss';

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
  const classes = classNames({
    button: true,
    [`${className}`]: !!className,
    [`button-${size}`]: size,
    [`button-${color}`]: color,
    [`button-${page}`]: page,
  });
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

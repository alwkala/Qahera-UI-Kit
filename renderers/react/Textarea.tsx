import React from 'react';
import { QaheraSize } from './types';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: QaheraSize;
  error?: boolean | string;
}

export const Textarea: React.FC<TextareaProps> = ({
  size = 'md',
  error = false,
  className = '',
  disabled,
  ...props
}) => {
  const hasError = Boolean(error);

  const classes = [
    'qhr-textarea',
    `qhr-textarea--${size}`,
    hasError ? 'is-invalid' : '',
    disabled ? 'is-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <textarea
      className={classes}
      disabled={disabled}
      aria-invalid={hasError}
      {...props}
    />
  );
};

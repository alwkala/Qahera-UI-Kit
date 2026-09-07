'use client';

import React from 'react';
import { QaheraSize } from './types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: QaheraSize;
  error?: boolean | string;
  options?: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  size = 'md',
  error = false,
  options,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const hasError = Boolean(error);

  const classes = [
    'qhr-select',
    `qhr-select--${size}`,
    hasError ? 'is-invalid' : '',
    disabled ? 'is-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`qhr-select-wrapper qhr-select-wrapper--${size}`}>
      <select
        className={classes}
        disabled={disabled}
        aria-invalid={hasError}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
    </div>
  );
};

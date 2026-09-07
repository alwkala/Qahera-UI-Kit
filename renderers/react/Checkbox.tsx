import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <label className={`qhr-checkbox ${disabled ? 'is-disabled' : ''} ${className}`.trim()}>
      <input type="checkbox" disabled={disabled} {...props} />
      {(label || description) && (
        <span className="qhr-checkbox-content">
          {label && <span className="qhr-checkbox-label">{label}</span>}
          {description && <span className="qhr-checkbox-desc">{description}</span>}
        </span>
      )}
    </label>
  );
};

import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  description,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <label className={`qhr-radio ${disabled ? 'is-disabled' : ''} ${className}`.trim()}>
      <input type="radio" disabled={disabled} {...props} />
      {(label || description) && (
        <span className="qhr-radio-content">
          {label && <span className="qhr-radio-label">{label}</span>}
          {description && <span className="qhr-radio-desc">{description}</span>}
        </span>
      )}
    </label>
  );
};

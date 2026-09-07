import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  const generatedId = id || `qhr-switch-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label htmlFor={generatedId} className={`qhr-switch ${className}`} style={{ opacity: disabled ? 0.5 : 1 }}>
      <input
        type="checkbox"
        role="switch"
        id={generatedId}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        className="qhr-switch-input"
        {...props}
      />
      <span className="qhr-switch-track" aria-hidden="true">
        <span className="qhr-switch-thumb" />
      </span>
      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          {label && <strong style={{ fontSize: '14px', lineHeight: 1.4 }}>{label}</strong>}
          {description && <span style={{ fontSize: '12px', color: 'var(--qhr-text-muted, #94a3b8)' }}>{description}</span>}
        </span>
      )}
    </label>
  );
};

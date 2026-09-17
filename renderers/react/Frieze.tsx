import React from 'react';

export interface FriezeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Frieze: React.FC<FriezeProps> = ({
  children,
  variant = 'subtle',
  size = 'md',
  label,
  className = '',
  ...props
}) => {
  const classes = [
    'qhr-frieze',
    `qhr-frieze--${variant}`,
    `qhr-frieze--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="separator" {...props}>
      <div className="qhr-frieze__track">
        <span className="qhr-frieze__motif">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v2H2V6zm2 4h3v4H4v-4zm5 0h3v4H9v-4zm5 0h3v4h-3v-4zm5 0h2v4h-2v-4zM2 16h20v2H2v-2z"/></svg>
        </span>
        {label && <span className="qhr-frieze__label">{label}</span>}
        {children}
        <span className="qhr-frieze__motif">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v2H2V6zm2 4h3v4H4v-4zm5 0h3v4H9v-4zm5 0h3v4h-3v-4zm5 0h2v4h-2v-4zM2 16h20v2H2v-2z"/></svg>
        </span>
      </div>
    </div>
  );
};

import React from 'react';

export interface DividerProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dashed' | 'strong';
}

export const Divider: React.FC<DividerProps> = ({
  children,
  orientation = 'horizontal',
  variant = 'default'
}) => {
  return (
    <div
      className={`qhr-divider ${orientation === 'vertical' ? 'qhr-divider--vertical' : ''} ${variant !== 'default' ? `qhr-divider--${variant}` : ''}`}
      role="separator"
      aria-orientation={orientation}
    >
      {children && <span>{children}</span>}
    </div>
  );
};

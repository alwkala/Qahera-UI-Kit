import React from 'react';

export interface KbdProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Kbd: React.FC<KbdProps> = ({
  children,
  size = 'md'
}) => {
  return (
    <kbd className={`qhr-kbd qhr-kbd--${size}`}>
      {children}
    </kbd>
  );
};

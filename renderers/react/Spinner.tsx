import React from 'react';
import { QaheraSize, QaheraTone } from './types';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: QaheraSize | 'xs' | 'xl';
  tone?: QaheraTone;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tone = 'primary',
  label = 'جاري التحميل...',
  className = '',
  ...props
}) => {
  const classes = [
    'qhr-spinner',
    `qhr-spinner--${size}`,
    `qhr-spinner--${tone}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span role="status" aria-label={label} className={classes} {...props}>
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
        {label}
      </span>
    </span>
  );
};

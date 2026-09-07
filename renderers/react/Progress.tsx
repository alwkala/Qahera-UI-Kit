import React from 'react';
import { QaheraTone, QaheraSize } from './types';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  max?: number;
  tone?: QaheraTone | 'primary' | 'luxury' | 'secondary' | 'purple';
  size?: QaheraSize | 'xxs' | 'xl';
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  vertical?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  showValue?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  tone = 'primary',
  size = 'md',
  striped = false,
  animated = false,
  indeterminate = false,
  vertical = false,
  orientation = 'horizontal',
  label,
  showValue = false,
  className = '',
  ...props
}) => {
  const isVertical = vertical || orientation === 'vertical';
  const percentage = indeterminate ? 0 : Math.min(Math.max(0, (value / max) * 100), 100);

  const classes = [
    'qhr-progress',
    `qhr-progress--${size}`,
    isVertical ? 'qhr-progress--vertical' : '',
    tone !== 'primary' ? `qhr-progress--${tone}` : '',
    striped ? 'qhr-progress--striped' : '',
    animated ? 'qhr-progress--animated' : '',
    indeterminate ? 'qhr-progress--indeterminate' : '',
    className,
  ].filter(Boolean).join(' ');

  const barStyle = indeterminate
    ? undefined
    : isVertical
    ? { height: `${percentage}%` }
    : { width: `${percentage}%` };

  const bar = (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      className={classes}
      {...props}
    >
      <div className="qhr-progress-bar" style={barStyle}>
        {!isVertical && size === 'xl' && showValue && `${Math.round(percentage)}%`}
      </div>
    </div>
  );

  if (label || (showValue && size !== 'xl' && !isVertical)) {
    return (
      <div className="qhr-progress-wrapper">
        <div className="qhr-progress-header">
          {label && <span className="qhr-progress-title">{label}</span>}
          {showValue && !indeterminate && (
            <span className="qhr-progress-val">{Math.round(percentage)}%</span>
          )}
        </div>
        {bar}
      </div>
    );
  }

  return bar;
};

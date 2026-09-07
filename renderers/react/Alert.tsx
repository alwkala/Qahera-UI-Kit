import React from 'react';
import { QaheraTone, QaheraIconName } from './types';
import { Icon } from './Icon';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: QaheraTone;
  title?: React.ReactNode;
  icon?: QaheraIconName;
  onDismiss?: () => void;
}

const DEFAULT_TONE_ICONS: Record<QaheraTone, QaheraIconName> = {
  info: 'info',
  success: 'check',
  warning: 'alert-circle',
  danger: 'x-circle',
  neutral: 'info',
};

export const Alert: React.FC<AlertProps> = ({
  children,
  tone = 'info',
  title,
  icon,
  onDismiss,
  className = '',
  ...props
}) => {
  const iconName = icon || DEFAULT_TONE_ICONS[tone as QaheraTone] || 'info';

  const classes = [
    'qhr-alert',
    `qhr-alert--${tone}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="alert" aria-live="polite" {...props}>
      <div className="qhr-alert-icon">
        <Icon name={iconName} size={20} />
      </div>
      <div className="qhr-alert-content">
        {title && <div className="qhr-alert-title">{title}</div>}
        <div className="qhr-alert-message">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="qhr-alert-dismiss"
          onClick={onDismiss}
          aria-label="إغلاق التنبيه"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};

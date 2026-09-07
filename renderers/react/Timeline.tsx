import React from 'react';

export interface TimelineItemProps {
  title: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  horizontal?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ title, time, icon, children }) => {
  return (
    <li className="qhr-timeline-item">
      <div className="qhr-timeline-dot">
        {icon || <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }} />}
      </div>
      <div className="qhr-timeline-content">
        <div className="qhr-timeline-title">{title}</div>
        {time && <div className="qhr-timeline-time">{time}</div>}
        {children && <div style={{ marginTop: '6px' }}>{children}</div>}
      </div>
    </li>
  );
};

export const Timeline: React.FC<TimelineProps> = ({
  horizontal = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'qhr-timeline',
    horizontal ? 'qhr-timeline--horizontal' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <ul className={classes} {...props}>
      {children}
    </ul>
  );
};

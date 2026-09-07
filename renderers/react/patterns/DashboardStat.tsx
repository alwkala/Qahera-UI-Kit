import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { QaheraIconName } from '../types';

export interface DashboardStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: QaheraIconName;
  context?: string;
}

export const DashboardStat: React.FC<DashboardStatProps> = ({
  title,
  value,
  delta,
  trend = 'up',
  icon = 'folder',
  context,
  className = '',
  ...props
}) => {
  const badgeTone = trend === 'up' ? 'success' : trend === 'down' ? 'danger' : 'neutral';

  return (
    <Card
      role="region"
      aria-label={`${title}: ${value}`}
      className={`qhr-dashboard-stat ${className}`.trim()}
      style={{
        padding: 'var(--qhr-space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--qhr-space-3)',
      }}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 'var(--qhr-text-sm)',
            fontWeight: 500,
            color: 'var(--qhr-color-neutral-600)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: 'inline-flex',
            padding: 'var(--qhr-space-2)',
            background: 'var(--qhr-color-neutral-100)',
            borderRadius: 'var(--qhr-radius-md)',
            color: 'var(--qhr-color-neutral-700)',
          }}
        >
          <Icon name={icon} size={18} />
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--qhr-space-2)',
        }}
      >
        <div
          style={{
            fontSize: 'var(--qhr-text-2xl)',
            fontWeight: 700,
            color: 'var(--qhr-color-neutral-900)',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>

        {delta && (
          <Badge tone={badgeTone} size="sm">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              {trend === 'up' && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              )}
              {trend === 'down' && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
              <span>{delta}</span>
            </span>
          </Badge>
        )}
      </div>

      {context && (
        <div style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
          {context}
        </div>
      )}
    </Card>
  );
};

import React from 'react';
import { Card } from '../Card';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface UserMetric {
  label: string;
  value: string | number;
}

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
  metrics?: UserMetric[];
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function UserCard({
  name,
  title,
  bio,
  avatarUrl,
  metrics = [],
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  className = '',
  ...props
}: UserCardProps) {
  return (
    <Card
      role="region"
      aria-label={name}
      className={`qhr-user-card ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'var(--qhr-space-6)',
        gap: 'var(--qhr-space-4)',
        textAlign: 'center',
        maxWidth: '380px',
      }}
      {...props}
    >
      <Avatar size="lg" src={avatarUrl} alt={name} />

      <div>
        <h3
          style={{
            fontSize: 'var(--qhr-text-lg)',
            fontWeight: 700,
            color: 'var(--qhr-color-neutral-900)',
            margin: '0 0 var(--qhr-space-1) 0',
          }}
        >
          {name}
        </h3>
        {title && (
          <Badge tone="neutral" size="sm">
            {title}
          </Badge>
        )}
      </div>

      {bio && (
        <p
          style={{
            fontSize: 'var(--qhr-text-sm)',
            color: 'var(--qhr-color-neutral-600)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {bio}
        </p>
      )}

      {metrics.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--qhr-space-5)',
            padding: 'var(--qhr-space-3) 0',
            borderBlock: '1px solid var(--qhr-border-subtle)',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {metrics.map((m) => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--qhr-text-lg)', fontWeight: 700, color: 'var(--qhr-color-neutral-900)' }}>
                {m.value}
              </div>
              <div style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 'var(--qhr-space-3)', width: '100%', justifyContent: 'center' }}>
        {actionLabel && (
          <Button variant="primary" size="sm" onClick={onAction}>
            <Icon name="user" size={16} />
            <span>{actionLabel}</span>
          </Button>
        )}
        {secondaryLabel && (
          <Button variant="outline" size="sm" onClick={onSecondary}>
            <span>{secondaryLabel}</span>
          </Button>
        )}
      </div>
    </Card>
  );
}

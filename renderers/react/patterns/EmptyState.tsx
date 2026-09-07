import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { QaheraIconName } from '../types';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: QaheraIconName;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'لا توجد عناصر لعرضها',
  description = 'لم يتم العثور على أي سجلات في هذا القسم حالياً. يمكنك البدء بإضافة عنصر جديد.',
  icon = 'folder',
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  className = '',
  ...props
}) => {
  return (
    <div
      role="status"
      className={`qhr-empty-state ${className}`.trim()}
      style={{
        padding: 'var(--qhr-space-12) var(--qhr-space-6)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed var(--qhr-border-subtle)',
        borderRadius: 'var(--qhr-radius-lg)',
        background: 'var(--qhr-surface-base)',
      }}
      {...props}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--qhr-radius-full)',
          background: 'var(--qhr-color-neutral-100)',
          color: 'var(--qhr-color-neutral-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--qhr-space-4)',
        }}
      >
        <Icon name={icon} size={28} />
      </div>

      <h3
        style={{
          fontSize: 'var(--qhr-text-lg)',
          fontWeight: 600,
          color: 'var(--qhr-color-neutral-900)',
          margin: '0 0 var(--qhr-space-2) 0',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 'var(--qhr-text-sm)',
          color: 'var(--qhr-color-neutral-600)',
          maxWidth: '420px',
          margin: '0 0 var(--qhr-space-6) 0',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--qhr-space-3)',
        }}
      >
        {actionLabel && (
          <Button type="button" variant="primary" onClick={onAction}>
            <Icon name="plus" size={18} />
            <span>{actionLabel}</span>
          </Button>
        )}

        {secondaryLabel && (
          <Button type="button" variant="ghost" onClick={onSecondaryAction}>
            <span>{secondaryLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

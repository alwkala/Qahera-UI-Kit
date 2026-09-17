import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export interface SortableItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export interface SortableListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SortableItem[];
  onReorder?: (items: SortableItem[]) => void;
  onItemClick?: (item: SortableItem) => void;
}

export function SortableList({
  items,
  onReorder,
  onItemClick,
  className = '',
  ...props
}: SortableListProps) {
  const handleMoveUp = (index: number) => {
    if (index <= 0 || !onReorder) return;
    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onReorder(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= items.length - 1 || !onReorder) return;
    const updated = [...items];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onReorder(updated);
  };

  return (
    <div
      role="list"
      aria-label="قائمة قابلة للترتيب"
      className={`qhr-sortable-list ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--qhr-space-3)',
      }}
      {...props}
    >
      {items.map((item, index) => (
        <Card
          key={item.id}
          role="listitem"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--qhr-space-3)',
            padding: 'var(--qhr-space-3) var(--qhr-space-4)',
          }}
        >
          {/* Drag Handle */}
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              cursor: 'grab',
              color: 'var(--qhr-color-neutral-400)',
            }}
          >
            <Icon name="menu" size={16} />
          </span>

          {/* Content */}
          <div
            style={{ flex: 1, cursor: 'pointer' }}
            onClick={() => onItemClick?.(item)}
            role="button"
            tabIndex={0}
          >
            <div style={{ fontSize: 'var(--qhr-text-sm)', fontWeight: 500, color: 'var(--qhr-color-neutral-800)' }}>
              {item.title}
            </div>
            {item.subtitle && (
              <div style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
                {item.subtitle}
              </div>
            )}
          </div>

          {item.badge && <Badge tone="neutral" size="sm">{item.badge}</Badge>}

          {/* Reorder Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
              aria-label="نقل لأعلى"
            >
              <Icon name="chevron-up" size={12} />
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleMoveDown(index)}
              disabled={index === items.length - 1}
              aria-label="نقل لأسفل"
            >
              <Icon name="chevron-down" size={12} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

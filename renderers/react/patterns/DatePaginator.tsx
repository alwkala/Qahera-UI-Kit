import React from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export interface DateCell {
  date: string;
  dayName: string;
  dayNumber: number;
  isActive?: boolean;
  hasBadge?: boolean;
}

export interface DatePaginatorProps extends React.HTMLAttributes<HTMLDivElement> {
  dates: DateCell[];
  onDateSelect?: (date: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function DatePaginator({
  dates,
  onDateSelect,
  onPrev,
  onNext,
  className = '',
  ...props
}: DatePaginatorProps) {
  return (
    <div
      role="tablist"
      aria-label="التنقل بين التواريخ"
      className={`qhr-date-paginator ${className}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--qhr-space-3)',
        padding: 'var(--qhr-space-3)',
        borderRadius: 'var(--qhr-radius-lg)',
        border: '1px solid var(--qhr-border-subtle)',
        background: 'var(--qhr-surface-base)',
        overflowX: 'auto',
      }}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        aria-label="الفترة السابقة"
      >
        <Icon name="chevron-right" size={16} />
      </Button>

      <div
        style={{
          display: 'flex',
          gap: 'var(--qhr-space-2)',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {dates.map((cell) => (
          <button
            key={cell.date}
            role="tab"
            aria-selected={cell.isActive}
            onClick={() => onDateSelect?.(cell.date)}
            className="qhr-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--qhr-space-1)',
              padding: 'var(--qhr-space-2) var(--qhr-space-3)',
              borderRadius: 'var(--qhr-radius-md)',
              border: 'none',
              cursor: 'pointer',
              minWidth: '52px',
              background: cell.isActive
                ? 'var(--qhr-color-primary-600)'
                : 'transparent',
              color: cell.isActive
                ? 'var(--qhr-color-primary-foreground)'
                : 'var(--qhr-color-neutral-700)',
              transition: 'all var(--qhr-transition-fast)',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 'var(--qhr-text-xs)', fontWeight: 500 }}>
              {cell.dayName}
            </span>
            <span style={{ fontSize: 'var(--qhr-text-lg)', fontWeight: 700 }}>
              {cell.dayNumber}
            </span>
            {cell.hasBadge && (
              <span
                style={{
                  position: 'absolute',
                  insetBlockStart: '2px',
                  insetInlineEnd: '2px',
                  width: '6px',
                  height: '6px',
                  borderRadius: 'var(--qhr-radius-full)',
                  background: 'var(--qhr-color-danger-500)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        aria-label="الفترة التالية"
      >
        <Icon name="chevron-left" size={16} />
      </Button>
    </div>
  );
}

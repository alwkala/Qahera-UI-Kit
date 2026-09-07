import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface FilterItem {
  key: string;
  label: string;
  count?: number;
  active?: boolean;
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterItem[];
  onToggleFilter?: (key: string) => void;
  onFilterChange?: (key: string) => void;
  onClearAll?: () => void;
  clearLabel?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onToggleFilter,
  onFilterChange,
  onClearAll,
  clearLabel = 'مسح الكل',
  className = '',
  ...props
}) => {
  const hasActive = filters.some((f) => f.active);

  return (
    <div
      role="group"
      aria-label="تصفية النتائج"
      className={`qhr-filter-bar ${className}`.trim()}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--qhr-space-2)',
        padding: 'var(--qhr-space-2) 0',
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--qhr-space-2)',
          flex: 1,
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => (onFilterChange || onToggleFilter)?.(filter.key)}
            className={`qhr-filter-chip ${filter.active ? 'is-active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--qhr-space-2)',
              padding: 'var(--qhr-space-1-5) var(--qhr-space-3)',
              borderRadius: 'var(--qhr-radius-full)',
              fontSize: 'var(--qhr-text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
              border: `1px solid ${filter.active ? 'var(--qhr-color-primary-600)' : 'var(--qhr-border-subtle)'}`,
              background: filter.active ? 'var(--qhr-color-primary-50)' : 'var(--qhr-surface-base)',
              color: filter.active ? 'var(--qhr-color-primary-700)' : 'var(--qhr-color-neutral-700)',
              transition: 'all var(--qhr-duration-fast)',
            }}
            aria-pressed={filter.active}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  padding: '1px 6px',
                  borderRadius: 'var(--qhr-radius-full)',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: filter.active
                    ? 'var(--qhr-color-primary-200)'
                    : 'var(--qhr-color-neutral-200)',
                  color: filter.active
                    ? 'var(--qhr-color-primary-800)'
                    : 'var(--qhr-color-neutral-800)',
                }}
              >
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {hasActive && onClearAll && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={onClearAll}
          style={{ color: 'var(--qhr-color-danger-600)', whiteSpace: 'nowrap' }}
        >
          <Icon name="close" size={12} />
          <span>{clearLabel}</span>
        </Button>
      )}
    </div>
  );
};

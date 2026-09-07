import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export interface BulkAction {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  selectedCount?: number;
  bulkActions?: BulkAction[];
  onCreate?: () => void;
  createLabel?: string;
  onExport?: () => void;
}

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'بحث وتصفية الجدول...',
  selectedCount = 0,
  bulkActions = [],
  onCreate,
  createLabel = 'إضافة سجل جديد',
  onExport,
  className = '',
  ...props
}) => {
  return (
    <div
      role="toolbar"
      aria-label="أدوات إدارة الجدول"
      className={`qhr-data-table-toolbar ${className}`.trim()}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--qhr-space-3)',
        paddingBottom: 'var(--qhr-space-4)',
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--qhr-space-3)',
          flex: 1,
        }}
      >
        <div style={{ minWidth: '240px' }}>
          <Input
            type="search"
            size="sm"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            startAdornment={<Icon name="search" size={16} />}
            aria-label={searchPlaceholder}
          />
        </div>

        {selectedCount > 0 && bulkActions.length > 0 && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--qhr-space-2)',
              background: 'var(--qhr-color-primary-50)',
              padding: 'var(--qhr-space-1) var(--qhr-space-3)',
              borderRadius: 'var(--qhr-radius-md)',
            }}
          >
            <Badge tone="primary" size="sm">
              {selectedCount} محدد
            </Badge>
            {bulkActions.map((act, idx) => (
              <Button
                key={idx}
                type="button"
                variant={act.destructive ? 'destructive' : 'secondary'}
                size="xs"
                onClick={act.onClick}
              >
                {act.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--qhr-space-2)' }}>
        {onExport && (
          <Button type="button" variant="secondary" size="sm" onClick={onExport}>
            <Icon name="download" size={16} />
            <span>تصدير</span>
          </Button>
        )}

        {onCreate && (
          <Button type="button" variant="primary" size="sm" onClick={onCreate}>
            <Icon name="plus" size={16} />
            <span>{createLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

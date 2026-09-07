import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export interface SearchToolbarProps extends React.FormHTMLAttributes<HTMLFormElement> {
  query?: string;
  onQueryChange?: (value: string) => void;
  placeholder?: string;
  categories?: Array<{ value: string; label: string }>;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  buttonLabel?: string;
}

export const SearchToolbar: React.FC<SearchToolbarProps> = ({
  query = '',
  onQueryChange,
  placeholder = 'ابحث في السجلات...',
  categories = [],
  selectedCategory = '',
  onCategoryChange,
  activeFilters = [],
  onRemoveFilter,
  buttonLabel = 'بحث',
  className = '',
  onSubmit,
  ...props
}) => {
  return (
    <form
      role="search"
      className={`qhr-search-toolbar ${className}`.trim()}
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--qhr-space-3)',
      }}
      {...props}
    >
      {categories.length > 0 && (
        <div style={{ minWidth: '140px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="qhr-select qhr-select--md"
            aria-label="تحديد تصنيف البحث"
          >
            <option value="">كافة التصنيفات</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ flex: 1, minWidth: '220px' }}>
        <Input
          type="search"
          name="q"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder={placeholder}
          startAdornment={<Icon name="search" size={18} />}
          style={{ width: '100%' }}
          aria-label={placeholder}
        />
      </div>

      <Button type="submit" variant="primary">
        {buttonLabel}
      </Button>

      {activeFilters.length > 0 && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--qhr-space-2)',
            marginTop: 'var(--qhr-space-1)',
          }}
        >
          <span style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
            الفلاتر النشطة:
          </span>
          {activeFilters.map((filter) => (
            <Badge key={filter} tone="neutral" size="sm">
              <span>{filter}</span>
              {onRemoveFilter && (
                <button
                  type="button"
                  onClick={() => onRemoveFilter(filter)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginInlineStart: 'var(--qhr-space-1)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                  }}
                  aria-label={`إزالة ${filter}`}
                >
                  <Icon name="close" size={12} />
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}
    </form>
  );
};

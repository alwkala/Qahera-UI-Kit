import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
  className = '',
  ...props
}) => {
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <nav
      role="navigation"
      aria-label="تنقل الصفحات"
      className={`qhr-pagination ${className}`.trim()}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--qhr-space-3)',
        padding: 'var(--qhr-space-4) 0',
      }}
      {...props}
    >
      {totalItems !== undefined && (
        <div style={{ fontSize: 'var(--qhr-text-sm)', color: 'var(--qhr-color-neutral-600)' }}>
          عرض <strong>{(currentPage - 1) * pageSize + 1}</strong> إلى{' '}
          <strong>{Math.min(totalItems, currentPage * pageSize)}</strong> من أصل{' '}
          <strong>{totalItems}</strong> سجل
        </div>
      )}

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--qhr-space-1)' }}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="الصفحة السابقة"
        >
          <Icon name="chevron-right" size={16} />
          <span>السابق</span>
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            type="button"
            variant={p === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            style={{ minWidth: '36px', padding: '0 var(--qhr-space-2)' }}
          >
            {p}
          </Button>
        ))}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="الصفحة التالية"
        >
          <span>التالي</span>
          <Icon name="chevron-left" size={16} />
        </Button>
      </div>
    </nav>
  );
};

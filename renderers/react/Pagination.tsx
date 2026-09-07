import React from 'react';

/* ── 1. Types & Interfaces ─────────────────────────────────────────── */

export type PaginationVariant = 'default' | 'outline' | 'ghost' | 'pills' | 'segmented' | 'compact' | 'icons-only';
export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  startIndex?: number;
  endIndex?: number;
  pageSize?: number | string;
  pageSizeOptions?: number[];
  variant?: PaginationVariant;
  size?: PaginationSize;
  showSummary?: boolean;
  showSizePicker?: boolean;
  showFirstLast?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number | string) => void;
}

/* ── 2. Composable Subcomponents (shadcn/ui style) ─────────────────── */

export const PaginationContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`qhr-pagination__controls ${className}`.trim()} {...props}>
    {children}
  </div>
);

export const PaginationItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`qhr-pagination__item ${className}`.trim()} {...props}>
    {children}
  </div>
);

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  asAnchor?: boolean;
  href?: string;
}

export const PaginationLink: React.FC<PaginationLinkProps> = ({
  isActive = false,
  asAnchor = false,
  href,
  className = '',
  children,
  ...props
}) => {
  const classes = `qhr-pagination__page ${isActive ? 'is-active' : ''} ${className}`.trim();

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export const PaginationPrevious: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`qhr-pagination__btn ${className}`.trim()}
    aria-label="الصفحة السابقة"
    {...props}
  >
    <svg
      className="qhr-pagination__icon-prev"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
    {children ?? <span>السابق</span>}
  </button>
);

export const PaginationNext: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`qhr-pagination__btn ${className}`.trim()}
    aria-label="الصفحة التالية"
    {...props}
  >
    {children ?? <span>التالي</span>}
    <svg
      className="qhr-pagination__icon-next"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

export const PaginationFirst: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`qhr-pagination__btn ${className}`.trim()}
    aria-label="الصفحة الأولى"
    {...props}
  >
    <svg
      className="qhr-pagination__icon-first"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
    {children}
  </button>
);

export const PaginationLast: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`qhr-pagination__btn ${className}`.trim()}
    aria-label="الصفحة الأخيرة"
    {...props}
  >
    {children}
    <svg
      className="qhr-pagination__icon-last"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  </button>
);

export const PaginationEllipsis: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className = '',
  ...props
}) => (
  <span
    className={`qhr-pagination__ellipsis ${className}`.trim()}
    aria-hidden="true"
    {...props}
  >
    &hellip;
  </span>
);

export interface PaginationSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  start: number;
  end: number;
  total?: number;
}

export const PaginationSummary: React.FC<PaginationSummaryProps> = ({
  start,
  end,
  total,
  className = '',
  ...props
}) => (
  <div className={`qhr-pagination__summary ${className}`.trim()} {...props}>
    <span>عرض</span>
    <strong>{start} إلى {end}</strong>
    {total !== undefined && (
      <>
        <span>من أصل</span>
        <strong className="qhr-pagination__summary-accent">{total}</strong>
        <span>عنصراً</span>
      </>
    )}
  </div>
);

/* ── 3. High-Level All-in-One Component ────────────────────────────── */

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  totalItems,
  startIndex,
  endIndex,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50],
  variant = 'default',
  size = 'md',
  showSummary = true,
  showSizePicker = false,
  showFirstLast = false,
  onPageChange,
  onPageSizeChange,
  className = '',
  children,
  ...props
}) => {
  // If consumer passes children, render as headless composable shell
  if (children) {
    const rootClasses = [
      'qhr-pagination',
      variant !== 'default' ? `qhr-pagination--${variant}` : '',
      size !== 'md' ? `qhr-pagination--${size}` : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <nav className={rootClasses} role="navigation" aria-label="ترقيم الصفحات" {...props}>
        {children}
      </nav>
    );
  }

  // Automatic calculation
  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPages();
  const calculatedStart = startIndex ?? ((currentPage - 1) * Number(pageSize) + 1);
  const calculatedEnd = endIndex ?? Math.min(currentPage * Number(pageSize), totalItems ?? totalPages * Number(pageSize));

  const rootClasses = [
    'qhr-pagination',
    variant !== 'default' ? `qhr-pagination--${variant}` : '',
    size !== 'md' ? `qhr-pagination--${size}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={rootClasses} role="navigation" aria-label="ترقيم وتصفح السجل" {...props}>
      {showSummary && (
        <PaginationSummary start={calculatedStart} end={calculatedEnd} total={totalItems} />
      )}

      <PaginationContent>
        {showFirstLast && (
          <PaginationFirst
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(1)}
          />
        )}

        <PaginationPrevious
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          {variant === 'icons-only' ? null : <span>السابق</span>}
        </PaginationPrevious>

        <div className="qhr-pagination__pages">
          {pages.map((p, idx) => {
            if (p === '...') {
              return <PaginationEllipsis key={`ellipsis-${idx}`} />;
            }

            const pageNum = Number(p);
            const isActive = pageNum === currentPage;

            return (
              <PaginationLink
                key={`page-${pageNum}`}
                isActive={isActive}
                onClick={() => onPageChange?.(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            );
          })}
        </div>

        <PaginationNext
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          {variant === 'icons-only' ? null : <span>التالي</span>}
        </PaginationNext>

        {showFirstLast && (
          <PaginationLast
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(totalPages)}
          />
        )}
      </PaginationContent>

      {showSizePicker && (
        <div className="qhr-pagination__size">
          <label htmlFor="qhrPageSizeSelect">عناصر الصفحة:</label>
          <select
            id="qhrPageSizeSelect"
            className="qhr-pagination__select"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(e.target.value)}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} عنصر
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

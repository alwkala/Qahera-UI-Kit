import React from 'react';
import { QaheraSize } from './types';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  size?: QaheraSize;
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  size = 'md',
  separator = '/',
  className = '',
  ...props
}) => {
  return (
    <nav aria-label="breadcrumb" className={`qhr-breadcrumb ${className}`} {...props}>
      <ol className="qhr-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = item.current || index === items.length - 1;
          return (
            <li key={index} className="qhr-breadcrumb-item">
              {isLast ? (
                <span className="qhr-breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href || '#'} className="qhr-breadcrumb-link">
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="qhr-breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

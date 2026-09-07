import React from 'react';
import { QaheraSize, QaheraVariant } from './types';

export interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  items?: MenuItem[];
}

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuItem[];
  variant?: 'vertical' | 'horizontal' | 'compact' | 'bordered' | 'pills' | 'khedivial' | 'brutalist';
  size?: QaheraSize;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  variant = 'vertical',
  size = 'md',
  className = '',
  ...props
}) => {
  const variantClass = variant ? `qhr-menu--${variant}` : '';
  const sizeClass = size ? `qhr-menu--${size}` : '';

  return (
    <ul className={`qhr-menu ${variantClass} ${sizeClass} ${className}`.trim()} role="menu" {...props}>
      {items.map((item, idx) => (
        <li key={idx} className="qhr-menu-item" role="none">
          <a
            href={item.href || '#'}
            className={`qhr-menu-link ${item.active ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`}
            aria-current={item.active ? 'page' : undefined}
            role="menuitem"
          >
            {item.icon && <span className="qhr-menu-icon" aria-hidden="true">{item.icon}</span>}
            <span className="qhr-menu-label">{item.label}</span>
            {item.badge && <span className="qhr-menu-badge">{item.badge}</span>}
          </a>
          {item.items && item.items.length > 0 && (
            <ul className="qhr-menu-sub" role="menu">
              {item.items.map((sub, sIdx) => (
                <li key={sIdx} className="qhr-menu-item" role="none">
                  <a
                    href={sub.href || '#'}
                    className={`qhr-menu-link ${sub.active ? 'is-active' : ''}`}
                    aria-current={sub.active ? 'page' : undefined}
                    role="menuitem"
                  >
                    <span className="qhr-menu-label">{sub.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

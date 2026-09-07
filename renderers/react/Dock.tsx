import React from 'react';
import { QaheraSize } from './types';

export interface DockItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

export interface DockProps extends React.HTMLAttributes<HTMLElement> {
  items: DockItem[];
  variant?: 'fixed' | 'floating' | 'rounded' | 'pills' | 'glass' | 'luxury-gold';
  size?: QaheraSize;
  centerAction?: React.ReactNode;
}

export const Dock: React.FC<DockProps> = ({
  items,
  variant = 'fixed',
  size = 'md',
  centerAction,
  className = '',
  ...props
}) => {
  const variantClass = variant ? `qhr-dock--${variant}` : '';
  const sizeClass = size ? `qhr-dock--${size}` : '';

  return (
    <nav
      className={`qhr-dock ${variantClass} ${sizeClass} ${className}`.trim()}
      aria-label="Bottom Navigation Dock"
      {...props}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {centerAction && idx === Math.floor(items.length / 2) && (
            <div className="qhr-dock-fab-wrap">{centerAction}</div>
          )}
          <a
            href={item.href || '#'}
            className={`qhr-dock-item ${item.active ? 'is-active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            <div className="qhr-dock-icon-wrap">
              {item.icon}
              {item.badge !== undefined && (
                <span className="qhr-dock-badge">{item.badge}</span>
              )}
            </div>
            <span className="qhr-dock-label">{item.label}</span>
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
};

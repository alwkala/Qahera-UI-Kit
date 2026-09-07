import React from 'react';

export interface MegamenuLink {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MegamenuColumn {
  title: string;
  links: MegamenuLink[];
}

export interface MegamenuProps extends React.HTMLAttributes<HTMLElement> {
  columns: MegamenuColumn[];
  variant?: '2-cols' | '3-cols' | '4-cols' | 'with-featured' | 'full-width' | 'glass';
  featured?: React.ReactNode;
  isOpen?: boolean;
}

export const Megamenu: React.FC<MegamenuProps> = ({
  columns,
  variant = '3-cols',
  featured,
  isOpen = false,
  className = '',
  ...props
}) => {
  const variantClass = variant ? `qhr-megamenu--${variant}` : '';
  const openClass = isOpen ? 'is-open' : '';

  return (
    <nav
      className={`qhr-megamenu ${variantClass} ${openClass} ${className}`.trim()}
      aria-label="Megamenu Navigation"
      {...props}
    >
      <div className="qhr-megamenu-grid">
        {columns.map((col, idx) => (
          <div key={idx} className="qhr-megamenu-col">
            <div className="qhr-megamenu-col-header">
              <h3 className="qhr-megamenu-col-title">{col.title}</h3>
            </div>
            <ul className="qhr-megamenu-list">
              {col.links.map((link, lIdx) => (
                <li key={lIdx} className="qhr-megamenu-item">
                  <a href={link.href || '#'} className="qhr-megamenu-link">
                    {link.icon && <span className="qhr-megamenu-icon">{link.icon}</span>}
                    <div className="qhr-megamenu-content">
                      <span className="qhr-megamenu-label">{link.label}</span>
                      {link.description && <span className="qhr-megamenu-desc">{link.description}</span>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featured && <div className="qhr-megamenu-featured">{featured}</div>}
      </div>
    </nav>
  );
};

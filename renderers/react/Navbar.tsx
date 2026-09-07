import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'transparent';
  children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'qhr-navbar',
    variant === 'transparent' ? 'qhr-navbar--transparent' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={classes} role="banner" {...props}>
      <div className="qhr-navbar-container">{children}</div>
    </header>
  );
};

export const NavbarBrand: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <a className={`qhr-navbar-brand ${className}`.trim()} {...props}>
    {children}
  </a>
);

export const NavbarLinks: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <ul className={`qhr-navbar-links ${className}`.trim()} role="navigation" {...props}>
    {children}
  </ul>
);

export const NavbarLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
> = ({ children, active = false, className = '', ...props }) => (
  <li>
    <a
      className={`qhr-navbar-link ${active ? 'is-active' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  </li>
);

export const NavbarActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`qhr-navbar-actions ${className}`.trim()} {...props}>
    {children}
  </div>
);

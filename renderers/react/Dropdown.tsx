'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

interface DropdownContextType {
  open: boolean;
  dropup: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export interface DropdownProps {
  children: React.ReactNode;
  dropup?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  dropup = false,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const classes = [
    'qhr-dropdown',
    dropup && 'qhr-dropdown--dropup dropup',
    className,
  ].filter(Boolean).join(' ');

  return (
    <DropdownContext.Provider value={{ open, dropup, toggle, close }}>
      <div ref={dropdownRef} className={classes}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export interface DropdownTriggerProps {
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
    'aria-haspopup'?: string;
    'aria-expanded'?: boolean;
    className?: string;
  }>;
  noCaret?: boolean;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, noCaret = false }) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('DropdownTrigger must be used inside Dropdown');

  const existingClass = children.props.className || '';
  const triggerClass = [existingClass, noCaret && 'qhr-dropdown-toggle--no-caret no-caret'].filter(Boolean).join(' ');

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.toggle();
    },
    className: triggerClass,
    'aria-haspopup': 'menu',
    'aria-expanded': ctx.open,
  });
};

export interface DropdownMenuProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  align = 'start',
  className = '',
}) => {
  const ctx = useContext(DropdownContext);
  if (!ctx || !ctx.open) return null;

  const classes = [
    'qhr-dropdown-menu',
    align === 'end' && 'qhr-dropdown-menu--end dropdown-menu-end',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="menu">
      {children}
    </div>
  );
};

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  inset?: boolean;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  destructive = false,
  disabled = false,
  active = false,
  icon,
  badge,
  inset = false,
  className = '',
}) => {
  const ctx = useContext(DropdownContext);

  const classes = [
    'qhr-dropdown-item',
    destructive && 'qhr-dropdown-item--destructive',
    disabled && 'is-disabled disabled',
    active && 'is-active active',
    inset && 'qhr-dropdown-item--inset',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onClick?.();
        ctx?.close();
      }}
    >
      {icon && <span className="qhr-dropdown-item-icon">{icon}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {badge && <span className="qhr-dropdown-item-badge">{badge}</span>}
    </button>
  );
};

export const DropdownHeader: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string }> = ({
  children,
  inset = false,
  className = '',
}) => (
  <div className={`qhr-dropdown-header ${inset ? 'qhr-dropdown-header--inset' : ''} ${className}`.trim()}>
    {children}
  </div>
);

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`qhr-dropdown-separator ${className}`.trim()} role="separator" />
);

export const DropdownDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`qhr-dropdown-divider ${className}`.trim()} role="separator" />
);

export const DropdownShortcut: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span className={`qhr-dropdown-shortcut ${className}`.trim()}>
    {children}
  </span>
);

export interface DropdownCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const DropdownCheckboxItem: React.FC<DropdownCheckboxItemProps> = ({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  className = '',
}) => {
  const classes = [
    'qhr-dropdown-item',
    'qhr-dropdown-item--checkbox',
    disabled && 'is-disabled disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      disabled={disabled}
      className={classes}
      onClick={() => {
        if (disabled) return;
        onCheckedChange?.(!checked);
      }}
    >
      {checked && (
        <span className="qhr-dropdown-item-indicator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

interface DropdownRadioContextType {
  value?: string;
  onValueChange?: (val: string) => void;
}
const DropdownRadioContext = createContext<DropdownRadioContextType | null>(null);

export const DropdownRadioGroup: React.FC<{
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ value, onValueChange, children, className = '' }) => (
  <DropdownRadioContext.Provider value={{ value, onValueChange }}>
    <div role="group" className={className}>
      {children}
    </div>
  </DropdownRadioContext.Provider>
);

export interface DropdownRadioItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const DropdownRadioItem: React.FC<DropdownRadioItemProps> = ({
  value,
  children,
  disabled = false,
  className = '',
}) => {
  const groupCtx = useContext(DropdownRadioContext);
  const checked = groupCtx?.value === value;
  const classes = [
    'qhr-dropdown-item',
    'qhr-dropdown-item--radio',
    disabled && 'is-disabled disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      disabled={disabled}
      className={classes}
      onClick={() => {
        if (disabled) return;
        groupCtx?.onValueChange?.(value);
      }}
    >
      {checked && (
        <span className="qhr-dropdown-item-indicator">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="12"></circle>
          </svg>
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

export const DropdownSub: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const [subOpen, setSubOpen] = useState(false);
  return (
    <div
      className={`qhr-dropdown-sub ${className}`.trim()}
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { subOpen, setSubOpen });
        }
        return child;
      })}
    </div>
  );
};

export const DropdownSubTrigger: React.FC<{
  children: React.ReactNode;
  icon?: React.ReactNode;
  inset?: boolean;
  className?: string;
  subOpen?: boolean;
  setSubOpen?: (open: boolean) => void;
}> = ({ children, icon, inset = false, className = '', subOpen = false, setSubOpen }) => {
  const classes = [
    'qhr-dropdown-item',
    inset && 'qhr-dropdown-item--inset',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-haspopup="menu"
      aria-expanded={subOpen}
      onClick={() => setSubOpen?.(!subOpen)}
    >
      {icon && <span className="qhr-dropdown-item-icon">{icon}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      <span className="qhr-dropdown-sub-caret">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
    </button>
  );
};

export const DropdownSubContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  subOpen?: boolean;
}> = ({ children, className = '', subOpen = false }) => {
  if (!subOpen) return null;
  return (
    <div className={`qhr-dropdown-menu qhr-dropdown-sub-menu ${className}`.trim()} role="menu">
      {children}
    </div>
  );
};

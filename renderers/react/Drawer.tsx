'use client';

import React from 'react';

export interface DrawerProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  position?: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  id = 'qhr-drawer',
  isOpen,
  onClose,
  title,
  position = 'start',
  size = 'md',
  children,
  footer
}) => {
  return (
    <>
      <div 
        className="qhr-drawer-backdrop" 
        data-state={isOpen ? 'open' : 'closed'} 
        onClick={onClose} 
      />
      <aside
        id={id}
        className={`qhr-drawer qhr-drawer--${position} qhr-drawer--${size}`}
        data-state={isOpen ? 'open' : 'closed'}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
      >
        <div className="qhr-drawer-header">
          <h3 className="qhr-drawer-title" id={`${id}-title`}>{title}</h3>
          <button 
            type="button" 
            className="qhr-btn qhr-btn--ghost qhr-btn--sm" 
            aria-label="إغلاق" 
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="qhr-drawer-body">
          {children}
        </div>
        {footer && (
          <div className="qhr-drawer-footer">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

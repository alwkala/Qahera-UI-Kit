'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

export interface BackToTopProps {
  threshold?: number;
  variant?: 'default' | 'luxury';
  className?: string;
}

export function BackToTop({
  threshold = 350,
  variant = 'luxury',
  className = '',
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  const isLuxury = variant === 'luxury';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`qhr-back-to-top qhr-back-to-top--${variant} ${className}`}
      aria-label="العودة لأعلى الصفحة"
      style={{
        position: 'fixed',
        insetInlineEnd: '24px',
        bottom: '24px',
        zIndex: 900,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: isLuxury ? '#17120F' : 'var(--qhr-color-surface-elevated, #17120F)',
        border: isLuxury ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--qhr-color-border)',
        color: isLuxury ? '#D4AF37' : 'var(--qhr-color-text)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <Icon name="chevron-up" size={20} />
    </button>
  );
}

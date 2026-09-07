'use client';

import React, { useState, useEffect } from 'react';

export interface PreloaderProps {
  logoText?: string;
  logoSubtext?: string;
  variant?: 'default' | 'luxury';
  speed?: number;
  onDismissed?: () => void;
  className?: string;
}

export function Preloader({
  logoText = 'قاهرة',
  logoSubtext = 'QAHERA DESIGN SYSTEM',
  variant = 'luxury',
  speed = 25,
  onDismissed,
  className = '',
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + Math.floor(Math.random() * 8) + 3;
        }
        return 90;
      });
    }, speed);

    const onComplete = () => {
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        onDismissed?.();
      }, 400);
    };

    if (document.readyState === 'complete') {
      onComplete();
    } else {
      window.addEventListener('load', onComplete);
      const fallback = setTimeout(onComplete, 3000);
      return () => {
        clearInterval(timer);
        clearTimeout(fallback);
        window.removeEventListener('load', onComplete);
      };
    }
  }, [speed, onDismissed]);

  if (!visible) return null;

  return (
    <div 
      className={`qhr-preloader qhr-preloader--${variant} ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0F0B09',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ textAlign: 'center', width: '280px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            fontFamily: 'var(--qhr-font-family-display, serif)', 
            fontSize: '42px', 
            fontWeight: 700, 
            color: 'var(--qhr-color-gold, #D4AF37)' 
          }}>
            {logoText}
          </div>
          <div style={{ 
            fontSize: '12px', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            color: 'var(--qhr-color-text-secondary, #B9A896)', 
            marginTop: '4px' 
          }}>
            {logoSubtext}
          </div>
        </div>

        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          marginBottom: '12px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: 'var(--qhr-color-gold, #D4AF37)',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 10px #F2C94C',
          }} />
        </div>

        <div style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'var(--qhr-color-gold, #D4AF37)',
          fontWeight: 700,
        }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}

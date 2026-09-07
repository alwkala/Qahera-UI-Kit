'use client';

import React, { useState, createContext, useContext, useCallback } from 'react';
import { QaheraTone, QaheraIconName } from './types';
import { Icon } from './Icon';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  tone?: QaheraTone;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const DEFAULT_TOAST_ICONS: Record<QaheraTone, QaheraIconName> = {
  info: 'info',
  success: 'check',
  warning: 'alert-circle',
  danger: 'x-circle',
  neutral: 'info',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      const duration = toast.duration ?? 4000;
      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="qhr-toast-container" aria-live="assertive">
        {toasts.map((t) => {
          const tone: QaheraTone = t.tone || 'info';
          const iconName = DEFAULT_TOAST_ICONS[tone] || 'info';

          return (
            <div key={t.id} className={`qhr-toast qhr-toast--${tone}`} role="status">
              <span className="qhr-toast-icon">
                <Icon name={iconName} size={18} />
              </span>
              <div className="qhr-toast-body">
                <div className="qhr-toast-title">{t.title}</div>
                {t.message && <div className="qhr-toast-msg">{t.message}</div>}
              </div>
              <button
                type="button"
                className="qhr-toast-close"
                onClick={() => dismissToast(t.id)}
                aria-label="إغلاق الإشعار"
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';

type ErrorCode = '404' | '500' | 'maintenance';

export function ErrorPage({ initialCode = '404' }: { initialCode?: ErrorCode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<ErrorCode>(initialCode);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
    localStorage.setItem('qhr-theme', nextTheme);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--err-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--err-text-primary, var(--qhr-text-primary, #FBF8F3))',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Suite Bar */}
      <header
        style={{
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))',
          backgroundColor: 'var(--err-surface-overlay, rgba(10, 8, 6, 0.9))',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--err-accent, #D4AF37)',
              color: '#0A0806',
              fontWeight: 800,
              fontFamily: '"El Messiri", serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ق
          </div>
          <span style={{ fontFamily: '"El Messiri", serif', fontSize: '16px', fontWeight: 700 }}>
            منظومة حالات النظام
          </span>
        </div>

        {/* View Switcher Pills */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--err-surface-subtle, rgba(255, 255, 255, 0.05))',
            border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            onClick={() => setView('404')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: view === '404' ? 'var(--err-accent, #D4AF37)' : 'transparent',
              color: view === '404' ? '#0A0806' : 'inherit',
              fontWeight: view === '404' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            404 مفقودة
          </button>
          <button
            type="button"
            onClick={() => setView('500')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: view === '500' ? 'var(--err-accent, #D4AF37)' : 'transparent',
              color: view === '500' ? '#0A0806' : 'inherit',
              fontWeight: view === '500' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            500 تعطل الخادم
          </button>
          <button
            type="button"
            onClick={() => setView('maintenance')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: view === 'maintenance' ? 'var(--err-accent, #D4AF37)' : 'transparent',
              color: view === 'maintenance' ? '#0A0806' : 'inherit',
              fontWeight: view === 'maintenance' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            أعمال الصيانة
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--err-surface-subtle, transparent)',
            border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))',
            color: 'inherit',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="sm" />
        </button>
      </header>

      {/* Main Error Stage */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            background: 'var(--err-surface-card, #17120F)',
            border: '1px solid var(--err-border-strong, rgba(212, 175, 55, 0.35))',
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.7)',
            position: 'relative',
          }}
        >
          {/* 404 VIEW */}
          {view === '404' && (
            <div>
              <div
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '96px',
                  fontWeight: 800,
                  color: 'var(--err-accent, #D4AF37)',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}
              >
                404
              </div>
              <h1
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '26px',
                  fontWeight: 700,
                  margin: '0 0 12px 0',
                }}
              >
                الصفحة أو المقتنى المطلوب غير موجود
              </h1>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--err-text-secondary, #D4C9BC)',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  margin: '0 auto 28px',
                }}
              >
                عذراً، تعذر الوصول إلى المسار أو السجل الذي تبحث عنه. قد يكون الرابط خاطئاً، أو تم نقل الصفحة ضمن التحديثات الهندسية.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Button variant="primary" size="lg" onClick={() => triggerToast('جاري التوجيه للرئيسية...')}>
                  العودة للرئيسية
                </Button>
                <Button variant="secondary" size="lg" onClick={() => triggerToast('تم تسجيل تقرير الرابط المعطل.')}>
                  الإبلاغ عن رابط
                </Button>
              </div>
            </div>
          )}

          {/* 500 VIEW */}
          {view === '500' && (
            <div>
              <div
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '96px',
                  fontWeight: 800,
                  color: 'var(--qhr-color-danger-500, #ef4444)',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}
              >
                500
              </div>
              <h1
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '26px',
                  fontWeight: 700,
                  margin: '0 0 12px 0',
                }}
              >
                تعطل غير متوقع في معالجة استجابة الخادم
              </h1>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--err-text-secondary, #D4C9BC)',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  margin: '0 auto 24px',
                }}
              >
                نواجه صعوبة فنية مؤقتة. تم تسجيل هذا الاستثناء برمز تتبع تلقائي، ويعمل فريق النظم على استعادة الاستقرار.
              </p>

              {/* Telemetry Trace Box */}
              <div
                style={{
                  background: 'var(--err-surface-subtle, rgba(255, 255, 255, 0.04))',
                  border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '28px',
                  textAlign: 'start',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--err-text-muted, #9E9081)' }}>معرف التتبع:</span>
                  <code style={{ color: 'var(--err-accent, #D4AF37)', fontWeight: 700 }}>qhr-trace-cairo-89b42e</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--err-text-muted, #9E9081)' }}>عنقود الخدمة:</span>
                  <span>eg-cairo-primary-cluster-02</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Button variant="primary" size="lg" onClick={() => triggerToast('جاري إعادة إرسال الطلب للخادم...')}>
                  إعادة المحاولة
                </Button>
                <Button variant="outline" size="lg" onClick={() => triggerToast('فتح لوحة حالة الخدمات...')}>
                  لوحة حالة الخوادم
                </Button>
              </div>
            </div>
          )}

          {/* MAINTENANCE VIEW */}
          {view === 'maintenance' && (
            <div>
              <Badge tone="primary" style={{ marginBottom: '16px' }}>
                أعمال صيانة دورية مجدولة
              </Badge>
              <h1
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  margin: '0 0 12px 0',
                }}
              >
                المنظومة تخضع للترقية والتحسين المجدول
              </h1>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--err-text-secondary, #D4C9BC)',
                  lineHeight: 1.8,
                  maxWidth: '520px',
                  margin: '0 auto 28px',
                }}
              >
                نقوم حالياً بترقية خوادم قواعد البيانات ونشر الإصدار الجديد لضمان سرعة فائقة. سنعود للعمل بكامل طاقتنا قريباً.
              </p>

              {/* Countdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  maxWidth: '360px',
                  margin: '0 auto 28px',
                }}
              >
                <div style={{ background: 'var(--err-surface-subtle, rgba(255, 255, 255, 0.04))', border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: 'var(--err-accent, #D4AF37)' }}>02</div>
                  <span style={{ fontSize: '11px', color: 'var(--err-text-muted, #9E9081)' }}>ساعات</span>
                </div>
                <div style={{ background: 'var(--err-surface-subtle, rgba(255, 255, 255, 0.04))', border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: 'var(--err-accent, #D4AF37)' }}>45</div>
                  <span style={{ fontSize: '11px', color: 'var(--err-text-muted, #9E9081)' }}>دقائق</span>
                </div>
                <div style={{ background: 'var(--err-surface-subtle, rgba(255, 255, 255, 0.04))', border: '1px solid var(--err-border, rgba(212, 175, 55, 0.2))', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: 'var(--err-accent, #D4AF37)' }}>18</div>
                  <span style={{ fontSize: '11px', color: 'var(--err-text-muted, #9E9081)' }}>ثواني</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--err-text-muted, #9E9081)' }}>
                كافة سجلات وبيانات الحسابات مشفرة ومؤمنة بنسبة 100%
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--err-surface-card, #17120F)',
            border: '1px solid var(--err-accent, #D4AF37)',
            color: 'var(--err-text-primary, #FBF8F3)',
            padding: '12px 24px',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
            zIndex: 2000,
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

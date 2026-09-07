'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarActions } from '../../renderers/react/Navbar';

export type EmailTemplateKey =
  | 'welcome'
  | 'verify'
  | 'password'
  | 'update'
  | 'expired-card'
  | 'closed-account';

export function EmailsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTemplate, setActiveTemplate] = useState<EmailTemplateKey>('welcome');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
    localStorage.setItem('qhr-theme', next);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--eml-bg, var(--qhr-surface-page, #070503))',
        color: 'var(--eml-text-primary, var(--qhr-text-primary, #FBF8F3))',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      {/* Navbar */}
      <Navbar>
        <NavbarBrand href="#">
          <span style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #D4AF37, #92400E)',
            color: '#0A0806',
            fontWeight: 800,
            fontFamily: '"El Messiri", serif',
            fontSize: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            ق
          </span>
          <span style={{ marginInlineStart: '12px', fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700 }}>
            قاهرة لرسائل البريد المعاملاتية
          </span>
        </NavbarBrand>

        <NavbarActions>
          <Button variant="secondary" size="xs" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />
            <span>{theme === 'dark' ? 'فاتح' : 'داكن'}</span>
          </Button>
        </NavbarActions>
      </Navbar>

      <main style={{ maxWidth: '1400px', marginInline: 'auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Sidebar */}
        <aside style={{
          backgroundColor: 'var(--eml-surface-card, #14100C)',
          border: '1px solid var(--eml-border, rgba(212,175,55,0.18))',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700, color: '#D4AF37' }}>
            القوالب المعاملاتية
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { key: 'welcome', label: 'الترحيب (Welcome)' },
              { key: 'verify', label: 'تأكيد البريد (Verify OTP)' },
              { key: 'password', label: 'تغيير كلمة المرور' },
              { key: 'update', label: 'تحديث البيانات' },
              { key: 'expired-card', label: 'انتهاء البطاقة' },
              { key: 'closed-account', label: 'إغلاق الحساب' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTemplate(item.key as EmailTemplateKey)}
                style={{
                  textAlign: 'start',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: activeTemplate === item.key ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                  background: activeTemplate === item.key ? 'rgba(212,175,55,0.12)' : 'transparent',
                  color: activeTemplate === item.key ? '#D4AF37' : 'inherit',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(212,175,55,0.18)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button variant="primary" size="sm" onClick={handleCopy}>
              <Icon name="copy" size="xs" />
              <span>{copied ? 'تم النسخ!' : 'نسخ كود البريد'}</span>
            </Button>
          </div>
        </aside>

        {/* Preview Frame */}
        <div style={{
          backgroundColor: 'var(--eml-surface-card, #14100C)',
          border: '1px solid var(--eml-border, rgba(212,175,55,0.18))',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            padding: '12px 20px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid var(--eml-border, rgba(212,175,55,0.18))',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <strong style={{ fontSize: '14px' }}>معاينة البريد الإلكتروني</strong>
            <div style={{ display: 'inline-flex', gap: '6px' }}>
              <Button
                variant={viewport === 'desktop' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setViewport('desktop')}
              >
                سطح المكتب (600px)
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setViewport('mobile')}
              >
                الهاتف (375px)
              </Button>
            </div>
          </div>

          <div style={{
            padding: '40px 16px',
            backgroundColor: 'var(--eml-email-canvas, #0D0A07)',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '100%',
              maxWidth: viewport === 'desktop' ? '600px' : '375px',
              backgroundColor: 'var(--eml-surface-card, #15110C)',
              border: '1px solid var(--eml-border, rgba(212,175,55,0.2))',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              transition: 'max-width 250ms ease',
            }}>
              {/* Email Inner Header */}
              <div style={{ padding: '24px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                <span style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #D4AF37, #92400E)',
                  color: '#0A0806',
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}>
                  ق
                </span>
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700 }}>
                  منظومة قاهرة المعمارية
                </div>
              </div>

              {/* Email Body */}
              <div style={{ padding: '32px 28px' }}>
                {activeTemplate === 'welcome' && (
                  <div>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      أهلاً بك في منظومة قاهرة الفاخرة!
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)', lineHeight: 1.7 }}>
                      يسعدنا انضمامك إلى منصتنا المعمارية الموحدة. يمكنك الآن الوصول إلى الكتالوج الكامل والبدء في بناء مشاريعك.
                    </p>
                    <div style={{ textAlign: 'center', margin: '28px 0' }}>
                      <Button variant="primary" size="md">الدخول إلى لوحة القيادة</Button>
                    </div>
                  </div>
                )}

                {activeTemplate === 'verify' && (
                  <div>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      رمز التحقق اللحظي (OTP)
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)' }}>
                      أدخل الرمز السداسي التالي لإتمام توثيق بريدك الإلكتروني:
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '24px 0', direction: 'ltr' }}>
                      {['8', '4', '2', '9', '1', '6'].map((d, i) => (
                        <span key={i} style={{
                          width: '42px',
                          height: '48px',
                          borderRadius: '8px',
                          border: '1.5px solid #D4AF37',
                          color: '#D4AF37',
                          fontSize: '22px',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTemplate === 'password' && (
                  <div>
                    <Badge tone="warning" size="xs" style={{ marginBottom: '8px' }}>تنبيه أمان</Badge>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      تم تحديث كلمة المرور لحسابك
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)' }}>
                      إذا قمت أنت بهذا الإجراء فلا داعي للقلق. أما إذا لم تكن أنت، يرجى تأمين حسابك فوراً.
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                      <Button variant="destructive" size="sm">تأمين الحساب فوراً</Button>
                    </div>
                  </div>
                )}

                {activeTemplate === 'update' && (
                  <div>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      تم تعديل بيانات ملفك الشخصي
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)' }}>
                      نحيطك علماً بأنه قد تم تحديث رقم الهاتف ووسائل التوثيق الثنائية المرتبطة بالحساب.
                    </p>
                  </div>
                )}

                {activeTemplate === 'expired-card' && (
                  <div>
                    <Badge tone="danger" size="xs" style={{ marginBottom: '8px' }}>تنبيه فواتير</Badge>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      بطاقة الدفع قاربت على الانتهاء
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)' }}>
                      بطاقتك المسجلة المنتهية برقم 4289 تنتهي بنهاية الشهر الحالي. يرجى تحديثها لتفادي تعليق الخدمة.
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                      <Button variant="primary" size="md">تحديث وسيلة الدفع</Button>
                    </div>
                  </div>
                )}

                {activeTemplate === 'closed-account' && (
                  <div>
                    <Badge tone="neutral" size="xs" style={{ marginBottom: '8px' }}>تأكيد الإغلاق</Badge>
                    <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', color: '#D4AF37', margin: '0 0 8px' }}>
                      تم إغلاق حسابك في قاهرة
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--eml-text-secondary, #D5C9BC)' }}>
                      تم تعطيل الحساب بنجاح. بياناتك محفوظة لمدة 30 يوماً ويمكنك استعادتها خلال هذه المهلة.
                    </p>
                  </div>
                )}
              </div>

              {/* Email Footer */}
              <div style={{ padding: '20px', borderTop: '1px solid rgba(212,175,55,0.15)', textAlign: 'center', fontSize: '11px', color: 'var(--eml-text-muted, #9E9081)' }}>
                جميع الحقوق محفوظة © استوديو الوكالة · القاهرة
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

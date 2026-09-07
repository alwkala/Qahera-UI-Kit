'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarActions } from '../../renderers/react/Navbar';

export function BoxCardsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [collapsed, setCollapsed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState(false);

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

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bc-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--bc-text-primary, var(--qhr-text-primary, #FBF8F3))',
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
            قاهرة للصناديق والبطاقات
          </span>
        </NavbarBrand>

        <NavbarActions>
          <Button variant="secondary" size="xs" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />
            <span>{theme === 'dark' ? 'فاتح' : 'داكن'}</span>
          </Button>
        </NavbarActions>
      </Navbar>

      <main style={{ maxWidth: '1360px', marginInline: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Header Hero */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bc-surface-card, #17120E), var(--bc-surface-subtle, #1F1913))',
          border: '1px solid var(--bc-border, rgba(212,175,55,0.18))',
          borderRadius: '20px',
          padding: '28px',
        }}>
          <h1 style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#D4AF37' }}>
            معمارية الصناديق والبطاقات (Qahera Box Cards)
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--bc-text-secondary, #D5C9BC)', margin: 0 }}>
            أنماط Basic Box القياسية، الصناديق التفاعلية المتقدمة Advanced Box، الحاويات الدلالية الملونة Box Color، والمجموعات المتصلة Group Box.
          </p>
        </div>

        {/* 1. Advanced Box Section */}
        <section id="advanced-box">
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, margin: '0 0 16px' }}>
            الصناديق التفاعلية المتقدمة (Advanced Box)
          </h2>
          
          {!closed && (
            <div
              className={`qhr-box qhr-box--md ${collapsed ? 'is-collapsed' : ''} ${fullscreen ? 'is-fullscreen' : ''}`}
              style={{
                position: fullscreen ? 'fixed' : 'relative',
                inset: fullscreen ? 0 : 'auto',
                zIndex: fullscreen ? 2500 : 'auto',
              }}
            >
              {/* Loader */}
              {loading && (
                <div className="qhr-card-loader">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D4AF37', fontWeight: 700 }}>
                    <Icon name="spinner" size="md" />
                    <span>جاري تحديث البيانات...</span>
                  </div>
                </div>
              )}

              <div className="qhr-box-header">
                <div className="qhr-box-header-main">
                  <h3 className="qhr-box-title">وحدة المراقبة التفاعلية</h3>
                  <p className="qhr-box-subtitle">تدعم الطي، ملء الشاشة، التحديث الحي، والإغلاق</p>
                </div>
                
                <div className="qhr-box-tools">
                  <Button variant="ghost" size="xs" onClick={handleRefresh} title="تحديث">
                    <Icon name="refresh" size="xs" />
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => setCollapsed(!collapsed)} title="طي/توسيع">
                    <Icon name={collapsed ? 'chevron-down' : 'chevron-up'} size="xs" />
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => setFullscreen(!fullscreen)} title="ملء الشاشة">
                    <Icon name="arrow-end" size="xs" />
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => setClosed(true)} title="إغلاق">
                    <Icon name="close" size="xs" />
                  </Button>
                </div>
              </div>

              {!collapsed && (
                <>
                  <div className="qhr-box-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--bc-text-muted, #9E9081)' }}>استهلاك الموارد الحالي</span>
                      <Badge tone="success" size="sm">مستقر</Badge>
                    </div>
                    <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: '#D4AF37' }}>
                      ٣٨.٤٪
                    </div>
                  </div>

                  <div className="qhr-box-footer">
                    <span style={{ fontSize: '12px', color: 'var(--bc-text-muted, #9E9081)' }}>الحالة: نشط</span>
                    <Button variant="ghost" size="xs" onClick={handleRefresh}>تحديث فوري</Button>
                  </div>
                </>
              )}
            </div>
          )}

          {closed && (
            <div style={{ padding: '16px', borderRadius: '12px', border: '1px dashed rgba(212,175,55,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>تم إغلاق الصندوق التفاعلي.</span>
              <Button variant="secondary" size="xs" onClick={() => setClosed(false)}>استعادة الصندوق</Button>
            </div>
          )}
        </section>

        {/* 2. Box Color Section */}
        <section id="box-color">
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, margin: '0 0 16px' }}>
            الصناديق الدلالية الملونة (Box Color)
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="qhr-box qhr-box--color-primary qhr-box--accent-top qhr-box--md">
              <div className="qhr-box-header">
                <h3 className="qhr-box-title" style={{ color: '#D4AF37' }}>صندوق ملكي (Primary)</h3>
                <Badge tone="primary" size="xs">Gold</Badge>
              </div>
              <div className="qhr-box-body">
                <p style={{ margin: 0, fontSize: '14px' }}>شريط علوي بارز بلون الذهب الملكي للتفرد والأهمية.</p>
              </div>
            </div>

            <div className="qhr-box qhr-box--color-success qhr-box--accent-top qhr-box--md">
              <div className="qhr-box-header">
                <h3 className="qhr-box-title" style={{ color: '#10B981' }}>صندوق الاعتماد (Success)</h3>
                <Badge tone="success" size="xs">Valid</Badge>
              </div>
              <div className="qhr-box-body">
                <p style={{ margin: 0, fontSize: '14px' }}>تأكيد اكتمال المعاملات وفحوصات الأمان بنجاح.</p>
              </div>
            </div>

            <div className="qhr-box qhr-box--color-danger qhr-box--accent-top qhr-box--md">
              <div className="qhr-box-header">
                <h3 className="qhr-box-title" style={{ color: '#EF4444' }}>صندوق الخطر (Danger)</h3>
                <Badge tone="danger" size="xs">Alert</Badge>
              </div>
              <div className="qhr-box-body">
                <p style={{ margin: 0, fontSize: '14px' }}>مخصص للإجراءات الحرجة والتنبيهات ذات الأولوية القصوى.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Group Box Section */}
        <section id="group-box">
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, margin: '0 0 16px' }}>
            مجموعات الصناديق المتصلة (Group Box)
          </h2>
          
          <div className="qhr-box-group">
            <div className="qhr-box qhr-box--md">
              <div className="qhr-box-header">
                <span style={{ fontSize: '12px', color: 'var(--bc-text-muted, #9E9081)' }}>المبيعات</span>
                <Badge tone="primary" size="xs">+١٤٪</Badge>
              </div>
              <div className="qhr-box-body">
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 800, color: '#D4AF37' }}>
                  ١٨٤,٢٠٠ ر.س
                </div>
              </div>
            </div>

            <div className="qhr-box qhr-box--md">
              <div className="qhr-box-header">
                <span style={{ fontSize: '12px', color: 'var(--bc-text-muted, #9E9081)' }}>الطلبات المؤكدة</span>
                <Badge tone="success" size="xs">+٩٪</Badge>
              </div>
              <div className="qhr-box-body">
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 800, color: '#D4AF37' }}>
                  ١,٤٢٨ طلب
                </div>
              </div>
            </div>

            <div className="qhr-box qhr-box--md">
              <div className="qhr-box-header">
                <span style={{ fontSize: '12px', color: 'var(--bc-text-muted, #9E9081)' }}>نسبة الرضا</span>
                <Badge tone="primary" size="xs">٩٩٪</Badge>
              </div>
              <div className="qhr-box-body">
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 800, color: '#D4AF37' }}>
                  ممتاز
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

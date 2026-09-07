'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions } from '../../renderers/react/Navbar';
import { BackToTop } from '../../renderers/react/BackToTop';

export function ChartsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ch-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--ch-text-primary, var(--qhr-text-primary, #FBF8F3))',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      {/* Navbar */}
      <Navbar>
        <NavbarBrand href="#">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--ch-accent, #D4AF37)',
            color: '#0A0806',
            fontWeight: 800,
            fontFamily: '"El Messiri", serif',
            fontSize: '18px',
          }}>
            ق
          </span>
          <span style={{ marginInlineStart: '12px', fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700 }}>
            قاهرة للتحليلات البيانية
          </span>
        </NavbarBrand>

        <NavbarLinks>
          <NavbarLink href="#chartjs" active>Chart.js</NavbarLink>
          <NavbarLink href="#morris">Morris</NavbarLink>
          <NavbarLink href="#flot">Flot Telemetry</NavbarLink>
          <NavbarLink href="#inline">Inline Sparklines</NavbarLink>
          <NavbarLink href="#peity">Peity</NavbarLink>
        </NavbarLinks>

        <NavbarActions>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--ch-border, rgba(212, 175, 55, 0.2))',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="sm" />
          </button>
        </NavbarActions>
      </Navbar>

      <main style={{ maxWidth: '1440px', marginInline: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* KPI Tiles with Sparklines */}
        <section id="inline">
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
            الرسوم المضمنة ومؤشرات النبض (Inline Sparklines)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            
            {/* Tile 1 */}
            <div style={{
              background: 'var(--ch-surface-card, #17120F)',
              border: '1px solid var(--ch-border, rgba(212, 175, 55, 0.2))',
              borderRadius: '16px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--ch-text-muted, #9E9081)' }}>إجمالي الإيرادات</span>
                <Badge tone="primary">+١٤.٢٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: 'var(--ch-accent, #D4AF37)', margin: '8px 0 12px' }}>
                ١٨٤,٢٠٠ ر.س
              </div>
              <svg width="100%" height="28" viewBox="0 0 120 28">
                <path d="M0,24 L20,18 L40,20 L60,10 L80,14 L100,4 L120,2" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Tile 2 */}
            <div style={{
              background: 'var(--ch-surface-card, #17120F)',
              border: '1px solid var(--ch-border, rgba(212, 175, 55, 0.2))',
              borderRadius: '16px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--ch-text-muted, #9E9081)' }}>المعاملات الناجحة</span>
                <Badge tone="primary">+٩.٦٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: 'var(--ch-accent, #D4AF37)', margin: '8px 0 12px' }}>
                ١,٤٢٨ معاملة
              </div>
              <svg width="100%" height="28" viewBox="0 0 120 28">
                <rect x="0" y="12" width="10" height="16" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="18" y="6" width="10" height="22" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="36" y="14" width="10" height="14" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="54" y="4" width="10" height="24" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="72" y="8" width="10" height="20" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="90" y="2" width="10" height="26" rx="2" fill="var(--ch-accent, #D4AF37)" />
                <rect x="108" y="5" width="10" height="23" rx="2" fill="var(--ch-accent, #D4AF37)" />
              </svg>
            </div>

          </div>
        </section>

        {/* Peity Micro Charts */}
        <section id="peity">
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
            المصغرات الرشيقة (Peity Micro-Charts)
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--ch-surface-card, #17120F)',
              border: '1px solid var(--ch-border, rgba(212, 175, 55, 0.2))',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '13px' }}>إنجاز الربع (١/٤):</span>
              <svg width="24" height="24" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="transparent" stroke="var(--ch-border, rgba(212, 175, 55, 0.2))" strokeWidth="2" />
                <path d="M16,16 L16,2 A14,14 0 0,1 30,16 Z" fill="var(--ch-accent, #D4AF37)" />
              </svg>
            </div>

            <div style={{
              background: 'var(--ch-surface-card, #17120F)',
              border: '1px solid var(--ch-border, rgba(212, 175, 55, 0.2))',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '13px' }}>جاهزية المنظومة (٨٥٪):</span>
              <svg width="24" height="24" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="64 75.4" />
              </svg>
            </div>
          </div>
        </section>

      </main>

      <BackToTop variant="luxury" />
    </div>
  );
}

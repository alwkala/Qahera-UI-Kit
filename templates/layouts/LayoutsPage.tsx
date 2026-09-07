'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarActions } from '../../renderers/react/Navbar';

export type LayoutMode = 'boxed' | 'fluid';
export type ScrollMode = 'fixed' | 'static';
export type SidebarState = 'expanded' | 'collapsed';

export function LayoutsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('boxed');
  const [scrollMode, setScrollMode] = useState<ScrollMode>('fixed');
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');
  const [activeNav, setActiveNav] = useState('overview');

  useEffect(() => {
    const savedTheme = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);

    const savedLayout = localStorage.getItem('qhr-layout-mode') as LayoutMode | null;
    if (savedLayout) setLayoutMode(savedLayout);

    const savedScroll = localStorage.getItem('qhr-scroll-mode') as ScrollMode | null;
    if (savedScroll) setScrollMode(savedScroll);

    const savedSidebar = localStorage.getItem('qhr-sidebar-state') as SidebarState | null;
    if (savedSidebar) setSidebarState(savedSidebar);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
    localStorage.setItem('qhr-theme', next);
  };

  const handleLayoutMode = (mode: LayoutMode) => {
    setLayoutMode(mode);
    localStorage.setItem('qhr-layout-mode', mode);
  };

  const handleScrollMode = (mode: ScrollMode) => {
    setScrollMode(mode);
    localStorage.setItem('qhr-scroll-mode', mode);
  };

  const handleSidebarState = (state: SidebarState) => {
    setSidebarState(state);
    localStorage.setItem('qhr-sidebar-state', state);
  };

  const toggleSidebar = () => {
    handleSidebarState(sidebarState === 'expanded' ? 'collapsed' : 'expanded');
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ly-bg-outer, #070503)',
        color: 'var(--ly-text-primary, #FBF8F3)',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      {/* 1. HUD Switcher Toolbar */}
      <aside
        style={{
          position: 'sticky',
          insetBlockStart: 0,
          insetInline: 0,
          zIndex: 1200,
          backgroundColor: 'var(--ly-surface-subtle, #1C1610)',
          borderBlockEnd: '1px solid var(--ly-border, rgba(212,175,55,0.18))',
          paddingBlock: '8px',
          paddingInline: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '13px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ly-accent, #D4AF37)', fontWeight: 700 }}>
          <Icon name="settings" size="sm" />
          <span>متحكم بنية التخطيط (Layout Engine)</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          {/* Boxed vs Fluid */}
          <div style={{ display: 'inline-flex', background: 'var(--ly-surface-card, #15110C)', border: '1px solid var(--ly-border, rgba(212,175,55,0.18))', borderRadius: '8px', padding: '2px' }}>
            <Button
              variant={layoutMode === 'boxed' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleLayoutMode('boxed')}
            >
              مؤطر (Boxed)
            </Button>
            <Button
              variant={layoutMode === 'fluid' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleLayoutMode('fluid')}
            >
              حر (Fluid)
            </Button>
          </div>

          {/* Fixed vs Static */}
          <div style={{ display: 'inline-flex', background: 'var(--ly-surface-card, #15110C)', border: '1px solid var(--ly-border, rgba(212,175,55,0.18))', borderRadius: '8px', padding: '2px' }}>
            <Button
              variant={scrollMode === 'fixed' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleScrollMode('fixed')}
            >
              تثبيت (Fixed)
            </Button>
            <Button
              variant={scrollMode === 'static' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleScrollMode('static')}
            >
              متحرك (Static)
            </Button>
          </div>

          {/* Sidebar Expanded vs Collapsed */}
          <div style={{ display: 'inline-flex', background: 'var(--ly-surface-card, #15110C)', border: '1px solid var(--ly-border, rgba(212,175,55,0.18))', borderRadius: '8px', padding: '2px' }}>
            <Button
              variant={sidebarState === 'expanded' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleSidebarState('expanded')}
            >
              موسع
            </Button>
            <Button
              variant={sidebarState === 'collapsed' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleSidebarState('collapsed')}
            >
              مطوي (Rail)
            </Button>
          </div>

          <Button variant="secondary" size="xs" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />
            <span>{theme === 'dark' ? 'فاتح' : 'داكن'}</span>
          </Button>
        </div>
      </aside>

      {/* 2. Application Shell Container */}
      <div
        style={{
          maxWidth: layoutMode === 'boxed' ? '1380px' : '100%',
          marginInline: 'auto',
          backgroundColor: 'var(--ly-bg-shell, #0E0B08)',
          minHeight: 'calc(100vh - 49px)',
          boxShadow: layoutMode === 'boxed' ? '0 24px 70px rgba(0,0,0,0.85)' : 'none',
          borderInline: layoutMode === 'boxed' ? '1px solid var(--ly-border, rgba(212,175,55,0.18))' : 'none',
          transition: 'max-width 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Navbar */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'var(--ly-surface-header, rgba(14,11,8,0.94))',
            backdropFilter: 'blur(14px)',
            borderBlockEnd: '1px solid var(--ly-border, rgba(212,175,55,0.18))',
            paddingInline: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: scrollMode === 'fixed' ? 'sticky' : 'relative',
            insetBlockStart: scrollMode === 'fixed' ? '49px' : 'auto',
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={toggleSidebar}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid var(--ly-border, rgba(212,175,55,0.18))',
                background: 'var(--ly-surface-subtle, #1C1610)',
                color: 'var(--ly-text-primary, #FBF8F3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="menu" size="sm" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #D4AF37, #92400E)',
                color: '#0A0806',
                fontFamily: '"El Messiri", serif',
                fontSize: '20px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                ق
              </span>
              <div>
                <strong style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', display: 'block' }}>قاهرة لهيكلة النظم</strong>
                <span style={{ fontSize: '11px', color: 'var(--ly-text-muted, #9E9081)' }}>Enterprise Layout Architecture</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge tone="primary" size="sm">
              {layoutMode.toUpperCase()} · {scrollMode.toUpperCase()} · {sidebarState.toUpperCase()}
            </Badge>
          </div>
        </header>

        {/* Layout Grid (Sidebar + Main) */}
        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
          
          {/* Sidebar Rail */}
          <aside
            style={{
              width: sidebarState === 'expanded' ? '260px' : '74px',
              backgroundColor: 'var(--ly-sidebar-bg, #110D09)',
              borderInlineEnd: '1px solid var(--ly-border, rgba(212,175,55,0.18))',
              transition: 'width 280ms cubic-bezier(0.4, 0, 0.2, 1)',
              position: scrollMode === 'fixed' ? 'sticky' : 'relative',
              insetBlockStart: scrollMode === 'fixed' ? 'calc(49px + 70px)' : 'auto',
              height: scrollMode === 'fixed' ? 'calc(100vh - 49px - 70px)' : 'auto',
              overflowY: scrollMode === 'fixed' ? 'auto' : 'visible',
              overflowX: 'hidden',
              flexShrink: 0,
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <Icon name="folder" size="sm" />
                {sidebarState === 'expanded' && <span>نظرة عامة</span>}
              </li>
              <li style={{ padding: '10px 12px', borderRadius: '10px', color: 'var(--ly-text-secondary, #D5C9BC)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleLayoutMode('boxed')}>
                <Icon name="folder" size="sm" />
                {sidebarState === 'expanded' && <span>نمط Boxed المؤطر</span>}
              </li>
              <li style={{ padding: '10px 12px', borderRadius: '10px', color: 'var(--ly-text-secondary, #D5C9BC)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleScrollMode('fixed')}>
                <Icon name="check" size="sm" />
                {sidebarState === 'expanded' && <span>نمط Fixed المثبت</span>}
              </li>
              <li style={{ padding: '10px 12px', borderRadius: '10px', color: 'var(--ly-text-secondary, #D5C9BC)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={toggleSidebar}>
                <Icon name="menu" size="sm" />
                {sidebarState === 'expanded' && <span>طي الشريط الجانبي</span>}
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main
            style={{
              flex: 1,
              minWidth: 0,
              padding: '28px',
              height: scrollMode === 'fixed' ? 'calc(100vh - 49px - 70px)' : 'auto',
              overflowY: scrollMode === 'fixed' ? 'auto' : 'visible',
            }}
          >
            {/* Status Banner */}
            <div style={{
              background: 'linear-gradient(135deg, var(--ly-surface-card, #15110C), var(--ly-surface-subtle, #1C1610))',
              border: '1px solid var(--ly-border, rgba(212,175,55,0.18))',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
            }}>
              <h1 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 800, margin: '0 0 8px', color: 'var(--ly-text-primary, #FBF8F3)' }}>
                أنماط التخطيط والهيكلة المعمارية (Qahera Layouts)
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--ly-text-secondary, #D5C9BC)', margin: 0 }}>
                معاينة متكاملة للتخطيط المؤطر (Boxed Layout)، التثبيت التام للرأس والشريط الجانبي (Fixed Layout)، ونمط الشريط المصغر المطوي (Sidebar Collapsed).
              </p>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <Card style={{ padding: '20px' }}>
                <span style={{ fontSize: '13px', color: 'var(--ly-text-muted, #9E9081)' }}>عرض الحاوية</span>
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: '#D4AF37', margin: '4px 0' }}>
                  {layoutMode === 'boxed' ? '1380px' : '100% Fluid'}
                </div>
              </Card>
              <Card style={{ padding: '20px' }}>
                <span style={{ fontSize: '13px', color: 'var(--ly-text-muted, #9E9081)' }}>عرض الشريط الجانبي</span>
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: '#D4AF37', margin: '4px 0' }}>
                  {sidebarState === 'expanded' ? '260px' : '74px'}
                </div>
              </Card>
              <Card style={{ padding: '20px' }}>
                <span style={{ fontSize: '13px', color: 'var(--ly-text-muted, #9E9081)' }}>سلوك التمرير</span>
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: '#D4AF37', margin: '4px 0' }}>
                  {scrollMode === 'fixed' ? 'مستقل (Fixed)' : 'شامل (Static)'}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

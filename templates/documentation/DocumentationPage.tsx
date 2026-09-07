'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
} from '../../renderers/react/Navbar';
import { SearchToolbar } from '../../renderers/react/patterns/SearchToolbar';
import { Card } from '../../renderers/react/Card';
import { Badge } from '../../renderers/react/Badge';
import { Button } from '../../renderers/react/Button';
import { Alert } from '../../renderers/react/Alert';
import { BackToTop } from '../../renderers/react/BackToTop';
import { Icon } from '../../renderers/react/Icon';

export function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('tokens-architecture');
  const [copied, setCopied] = useState(false);

  const navigationSections = [
    {
      title: 'البداية السريعة',
      items: [
        { id: 'intro', label: 'مقدمة عن نظام قاهرة' },
        { id: 'installation', label: 'التثبيت والإعداد' },
        { id: 'cli', label: 'أداة سطر الأوامر CLI' },
      ],
    },
    {
      title: 'الرموز التصميمية (Tokens)',
      items: [
        { id: 'tokens-architecture', label: 'المعمارية والهيكلة' },
        { id: 'tokens-colors', label: 'لوحة الألوان والخامات' },
        { id: 'tokens-typography', label: 'الخطوط والطباعة العربية' },
        { id: 'tokens-motion', label: 'منحنيات الحركة الفيزيائية' },
      ],
    },
    {
      title: 'عقود المكونات (Contracts)',
      items: [
        { id: 'contract-button', label: 'الزر (Button)' },
        { id: 'contract-card', label: 'البطاقة (Card)' },
        { id: 'contract-modal', label: 'النافذة المشروطة (Modal)' },
        { id: 'contract-preloader', label: 'شاشة التحميل (Preloader)' },
      ],
    },
    {
      title: 'بيئات التشغيل (Renderers)',
      items: [
        { id: 'renderer-react', label: 'React 19 / Next.js 16' },
        { id: 'renderer-php', label: 'PHP 8 Plates' },
        { id: 'renderer-htmx', label: 'HTMX Hypermedia' },
        { id: 'renderer-html', label: 'HTML Native' },
      ],
    },
  ];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleTokenCode = `// tokens/themes/luxury-gold.yaml
theme: luxury-gold
version: 1.0.0
tokens:
  color:
    obsidian:
      surface: "#0F0B09"
      card: "#17120F"
    gold:
      primary: "#D4AF37"
      accent: "#F2C94C"
  motion:
    luxury: "cubic-bezier(0.25, 0.8, 0.25, 1)"`;

  return (
    <div
      dir="rtl"
      style={{
        backgroundColor: 'var(--qhr-surface-page, #0A0A0A)',
        color: 'var(--qhr-text-primary, #FFFFFF)',
        minHeight: '100vh',
        fontFamily: 'var(--qhr-font-family-primary, "Cairo", sans-serif)',
      }}
    >
      {/* Top Header Navbar */}
      <Navbar>
        <NavbarBrand>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--qhr-space-3, 0.75rem)',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--qhr-radius-md, 8px)',
                background: 'linear-gradient(135deg, var(--qhr-color-primary-500, #C7A35A), var(--qhr-color-primary-700, #8A6D3B))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Icon name="file" size="sm" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>
              توثيق قاهرة المعماري
            </span>
            <Badge tone="success">v1.0.0 · معتمد</Badge>
          </div>
        </NavbarBrand>
        <NavbarLinks>
          <NavbarLink href="#docs" active>المعايير والتوثيق</NavbarLink>
          <NavbarLink href="#recipes">الوصفات (Recipes)</NavbarLink>
          <NavbarLink href="#patterns">الأنماط المركبة</NavbarLink>
          <NavbarLink href="#blueprints">القوالب الجاهزة</NavbarLink>
        </NavbarLinks>
        <NavbarActions>
          <Button variant="ghost" size="sm" iconStart={<Icon name="external-link" size="xs" />}>
            مستودع GitHub
          </Button>
          <Button variant="primary" size="sm">
            بدء التثبيت
          </Button>
        </NavbarActions>
      </Navbar>

      {/* Main Documentation Shell: 3 Column Layout */}
      <div
        style={{
          maxWidth: '1440px',
          marginInline: 'auto',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 220px',
          gap: 'var(--qhr-space-8, 2rem)',
          paddingInline: 'var(--qhr-space-6, 1.5rem)',
          paddingBlock: 'var(--qhr-space-6, 1.5rem)',
        }}
      >
        {/* 1. Sticky Navigation Sidebar */}
        <aside
          style={{
            position: 'sticky',
            top: '80px',
            height: 'calc(100vh - 100px)',
            overflowY: 'auto',
            paddingInlineEnd: 'var(--qhr-space-4, 1rem)',
            borderInlineEnd: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
          }}
        >
          <div style={{ marginBottom: 'var(--qhr-space-4, 1rem)' }}>
            <SearchToolbar placeholder="بحث في المعايير..." />
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--qhr-space-6, 1.5rem)' }}>
            {navigationSections.map((sec, sIdx) => (
              <div key={sIdx}>
                <h4
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--qhr-text-muted, #9E9E9E)',
                    margin: '0 0 var(--qhr-space-2, 0.5rem)',
                  }}
                >
                  {sec.title}
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {sec.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveSection(item.id)}
                          style={{
                            width: '100%',
                            textAlign: 'start',
                            padding: '6px 12px',
                            borderRadius: 'var(--qhr-radius-md, 6px)',
                            border: 'none',
                            background: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                            color: isActive ? 'var(--qhr-color-primary-400, #D4AF37)' : 'var(--qhr-text-secondary, #BDBDBD)',
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span>{item.label}</span>
                          {isActive && <Icon name="arrow-end" size="xs" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* 2. Main Center Content */}
        <main style={{ minWidth: 0, paddingInline: 'var(--qhr-space-4, 1rem)' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--qhr-space-2, 0.5rem)',
              fontSize: '0.875rem',
              color: 'var(--qhr-text-muted, #9E9E9E)',
              marginBottom: 'var(--qhr-space-4, 1rem)',
            }}
          >
            <span>التوثيق</span>
            <span>/</span>
            <span>الرموز التصميمية</span>
            <span>/</span>
            <span style={{ color: 'var(--qhr-color-primary-400, #D4AF37)' }}>المعمارية والهيكلة</span>
          </div>

          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 var(--qhr-space-3, 0.75rem)',
              color: 'var(--qhr-text-primary, #FFFFFF)',
            }}
          >
            معمارية الرموز التصميمية (Design Tokens Architecture)
          </h1>

          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--qhr-text-secondary, #BDBDBD)',
              margin: '0 0 var(--qhr-space-6, 1.5rem)',
            }}
          >
            تعد الرموز التصميمية (Tokens) في نظام قاهرة مصدر الحقيقة الأوحد لكافة المتغيرات البصرية. 
            تُصاغ الرموز بصيغة YAML وتُترجم تلقائياً إلى متغيرات CSS رسمية بالبادئة <code>--qhr-*</code> مع ضمان التوافق الكامل بين اليمين واليسار (RTL/LTR).
          </p>

          <Alert
            tone="info"
            title="القاعدة المعمارية الثالثة"
          >
            الرموز تسبق التنسيق: يُحظر نهائياً استخدام أكواد الألوان المباشرة (Hex) أو الأبعاد الصلبة بدون الرجوع إلى سجل متغيرات --qhr-*.
          </Alert>

          {/* Code Block Showcase */}
          <div style={{ marginTop: 'var(--qhr-space-6, 1.5rem)', marginBottom: 'var(--qhr-space-6, 1.5rem)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1E1915',
                border: '1px solid rgba(255,255,255,0.08)',
                borderBottom: 'none',
                borderRadius: '8px 8px 0 0',
                padding: '8px 16px',
              }}
            >
              <span style={{ fontSize: '0.8125rem', color: 'var(--qhr-text-muted, #9E9E9E)', direction: 'ltr', fontFamily: 'monospace' }}>
                tokens/themes/luxury-gold.yaml
              </span>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleCopy}
                iconStart={<Icon name={copied ? 'check' : 'copy'} size="xs" />}
              >
                {copied ? 'تم النسخ' : 'نسخ'}
              </Button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '16px',
                backgroundColor: '#14100D',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0 0 8px 8px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: '#E0E0E0',
                direction: 'ltr',
                overflowX: 'auto',
              }}
            >
              <code>{sampleTokenCode}</code>
            </pre>
          </div>

          {/* Tokens Specification Table */}
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 'var(--qhr-space-8, 2rem) 0 var(--qhr-space-4, 1rem)' }}>
            قائمة الرموز الأساسية المعتمدة
          </h2>

          <Card style={{ overflow: 'hidden' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'start',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>اسم المتغير (CSS Custom Property)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>القيمة المرجعية</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>الوصف والاستخدام</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr', color: 'var(--qhr-color-primary-400, #D4AF37)' }}>--qhr-surface-page</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr' }}>#0A0A0A</td>
                  <td style={{ padding: '12px 16px', color: 'var(--qhr-text-secondary, #BDBDBD)' }}>الخلفية العميقة لصفحات النظام</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr', color: 'var(--qhr-color-primary-400, #D4AF37)' }}>--qhr-surface-card</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr' }}>#141414</td>
                  <td style={{ padding: '12px 16px', color: 'var(--qhr-text-secondary, #BDBDBD)' }}>أسطح البطاقات والحاويات التفاعلية</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr', color: 'var(--qhr-color-primary-400, #D4AF37)' }}>--qhr-color-primary-500</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr' }}>#C7A35A</td>
                  <td style={{ padding: '12px 16px', color: 'var(--qhr-text-secondary, #BDBDBD)' }}>لون الهوية الأساسي (الذهب الإمبراطوري)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr', color: 'var(--qhr-color-primary-400, #D4AF37)' }}>--qhr-font-family-primary</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', direction: 'ltr' }}>'Cairo', sans-serif</td>
                  <td style={{ padding: '12px 16px', color: 'var(--qhr-text-secondary, #BDBDBD)' }}>الخط العربي المعياري لواجهات النظام</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Bottom Navigation */}
          <div
            style={{
              marginTop: 'var(--qhr-space-10, 2.5rem)',
              paddingTop: 'var(--qhr-space-6, 1.5rem)',
              borderTop: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--qhr-text-muted, #9E9E9E)' }}>الصفحة السابقة</span>
              <p style={{ margin: '2px 0 0', fontWeight: 700, color: 'var(--qhr-text-primary, #FFFFFF)' }}>
                أداة سطر الأوامر CLI
              </p>
            </div>
            <div style={{ textAlign: 'end' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--qhr-text-muted, #9E9E9E)' }}>الصفحة التالية</span>
              <p style={{ margin: '2px 0 0', fontWeight: 700, color: 'var(--qhr-color-primary-400, #D4AF37)' }}>
                لوحة الألوان والخامات
              </p>
            </div>
          </div>
        </main>

        {/* 3. On-Page Table of Contents (TOC) */}
        <aside
          style={{
            position: 'sticky',
            top: '80px',
            height: 'calc(100vh - 100px)',
            overflowY: 'auto',
            paddingInlineStart: 'var(--qhr-space-4, 1rem)',
            borderInlineStart: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
          }}
        >
          <h4
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--qhr-text-muted, #9E9E9E)',
              margin: '0 0 var(--qhr-space-3, 0.75rem)',
            }}
          >
            في هذه الصفحة
          </h4>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--qhr-space-2, 0.5rem)',
              fontSize: '0.8125rem',
              color: 'var(--qhr-text-secondary, #BDBDBD)',
            }}
          >
            <li style={{ color: 'var(--qhr-color-primary-400, #D4AF37)', fontWeight: 600 }}>نظرة عامة</li>
            <li>القاعدة المعمارية الثالثة</li>
            <li>نموذج ملف YAML</li>
            <li>جدول الرموز المعتمدة</li>
            <li>التوافق مع بيئات التشغيل</li>
          </ul>
        </aside>
      </div>

      <BackToTop />
    </div>
  );
}
export default DocumentationPage;

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../renderers/react/Card';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Avatar } from '../../renderers/react/Avatar';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarActions } from '../../renderers/react/Navbar';

interface WeatherData {
  name: string;
  region: string;
  temp: string;
  high: string;
  low: string;
  desc: string;
  humidity: string;
  wind: string;
  pressure: string;
  forecast: Array<{ day: string; temp: string; condition: string }>;
}

interface TaskItem {
  id: number;
  text: string;
  priority: 'urgent' | 'normal' | 'low';
  priorityLabel: string;
  done: boolean;
}

export function WidgetsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedCity, setSelectedCity] = useState<'cairo' | 'alex' | 'aswan'>('cairo');
  const [newTaskText, setNewTaskText] = useState('');
  
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: 'مراجعة عقود التوريد الذهبية للربع الثالث', priority: 'urgent', priorityLabel: 'عاجل', done: false },
    { id: 2, text: 'تحديث مؤشرات التفاعل في لوحة تحكم المستثمرين', priority: 'normal', priorityLabel: 'معتاد', done: true },
    { id: 3, text: 'اعتماد التصاميم المعمارية لفرع القاهرة الجديدة', priority: 'urgent', priorityLabel: 'عاجل', done: false },
    { id: 4, text: 'جدولة نشر المقال الافتتاحي عن تراث المشربيات', priority: 'low', priorityLabel: 'منخفض', done: true },
  ]);

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

  const weatherCities: Record<'cairo' | 'alex' | 'aswan', WeatherData> = {
    cairo: {
      name: 'القاهرة، مصر',
      region: 'العاصمة الكبرى',
      temp: '31°',
      high: '34°',
      low: '22°',
      desc: 'مشمس وصافٍ بوجه عام',
      humidity: '46%',
      wind: '18 كم/س',
      pressure: '1014 hPa',
      forecast: [
        { day: 'الأحد', temp: '32°', condition: 'مشمس' },
        { day: 'الإثنين', temp: '30°', condition: 'معتدل' },
        { day: 'الثلاثاء', temp: '31°', condition: 'صافٍ' },
        { day: 'الأربعاء', temp: '29°', condition: 'غائم جزئياً' },
      ],
    },
    alex: {
      name: 'الإسكندرية، مصر',
      region: 'عروس البحر المتوسط',
      temp: '27°',
      high: '29°',
      low: '21°',
      desc: 'نسيم بحري معتدل وسحب متفرقة',
      humidity: '68%',
      wind: '24 كم/س',
      pressure: '1016 hPa',
      forecast: [
        { day: 'الأحد', temp: '28°', condition: 'صافٍ' },
        { day: 'الإثنين', temp: '27°', condition: 'رياح معتدلة' },
        { day: 'الثلاثاء', temp: '26°', condition: 'غائم' },
        { day: 'الأربعاء', temp: '27°', condition: 'نسيم بحري' },
      ],
    },
    aswan: {
      name: 'أسوان، مصر',
      region: 'بوابة الجنوب والتاريخ',
      temp: '38°',
      high: '41°',
      low: '28°',
      desc: 'شديد الحرارة وأجواء جافة ومشرقة',
      humidity: '18%',
      wind: '12 كم/س',
      pressure: '1010 hPa',
      forecast: [
        { day: 'الأحد', temp: '39°', condition: 'شديد الحرارة' },
        { day: 'الإثنين', temp: '40°', condition: 'مشمس' },
        { day: 'الثلاثاء', temp: '38°', condition: 'صافٍ' },
        { day: 'الأربعاء', temp: '39°', condition: 'مشمس' },
      ],
    },
  };

  const currentW = weatherCities[selectedCity];

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTaskText.trim(),
        priority: 'normal',
        priorityLabel: 'معتاد',
        done: false,
      },
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const completedCount = tasks.filter((t) => t.done).length;

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#17120E' : '#FFFFFF',
    border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.18)' : '#E7E5E4'}`,
    borderRadius: '20px',
    padding: '24px',
    boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.6)' : '0 8px 24px rgba(28,25,23,0.06)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#070503' : '#FAF8F5',
        color: theme === 'dark' ? '#FBF8F3' : '#1C1917',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      {/* ── Top Navbar ────────────────────────────────────────────── */}
      <Navbar>
        <NavbarBrand href="#">
          <span
            style={{
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
            }}
          >
            ق
          </span>
          <span
            style={{
              marginInlineStart: '12px',
              fontFamily: '"El Messiri", serif',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            منظومة الودجات والبطاقات المعيارية (Widgets Suite)
          </span>
        </NavbarBrand>

        <NavbarActions>
          <Button variant="secondary" size="xs" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />
            <span>{theme === 'dark' ? 'المظهر الفاتح' : 'المظهر الداكن'}</span>
          </Button>
        </NavbarActions>
      </Navbar>

      {/* ── Main Container ────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: '1400px',
          marginInline: 'auto',
          padding: '36px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {/* Hero Header */}
        <div
          style={{
            background:
              theme === 'dark'
                ? 'linear-gradient(135deg, #1A140E 0%, #130F0B 100%)'
                : 'linear-gradient(135deg, #F5F0E6 0%, #FFFFFF 100%)',
            border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.28)' : 'rgba(180, 83, 9, 0.2)'}`,
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: '"El Messiri", serif',
                fontSize: '28px',
                fontWeight: 800,
                color: theme === 'dark' ? '#D4AF37' : '#B45309',
                margin: '0 0 8px',
              }}
            >
              مكتبة الودجات المتكاملة للوحات التحكم
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: theme === 'dark' ? '#D5C9BC' : '#44403C',
                margin: 0,
                maxWidth: '720px',
              }}
            >
              تشكيلة شاملة تضم الودجات الإحصائية، الرسوم البيانية المصغرة، ودجات التواصل الاجتماعي، الطقس الحي، المحتوى التحريري، وقوائم الأنشطة المباشرة المصممة وفق لغة قاهرة السيادية.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Badge tone="primary" size="md">٦ عائلات ودجات</Badge>
            <Badge tone="neutral" size="md">مبنية بـ React 19</Badge>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            1. STATISTIC WIDGETS
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>1. الودجات الإحصائية ومؤشرات الأداء (Statistic Widgets)</span>
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                بطاقات استعراض مؤشرات الأداء الحيوية (KPIs) ونسب التغير ومسارات الإنجاز
              </span>
            </div>
            <Badge tone="primary" size="sm">KPI Metrics</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Stat 1: Revenue */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C', fontWeight: 600 }}>إجمالي الإيرادات</span>
                <Badge tone="primary" size="xs">+١٤.٢٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>
                ١٨٤,٢٠٠ ر.س
              </div>
              <div style={{ fontSize: '12px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', marginTop: '6px' }}>
                مقارنة بالشهر السابق (+٢٢,٤٠٠ ر.س)
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: theme === 'dark' ? '#1F1913' : '#F5F1E9', marginTop: '14px', overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: theme === 'dark' ? '#D4AF37' : '#B45309', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Stat 2: Active Users */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C', fontWeight: 600 }}>المستخدمين النشطين</span>
                <Badge tone="success" size="xs">+٨.٤٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                ٤٢,٨٥٠ عضو
              </div>
              <div style={{ fontSize: '12px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', marginTop: '6px' }}>
                متواجدون حالياً: <strong>١,٢40 متصل</strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: theme === 'dark' ? '#1F1913' : '#F5F1E9', marginTop: '14px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#10B981', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Stat 3: Conversion Rate */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C', fontWeight: 600 }}>معدل التحويل الملكي</span>
                <Badge tone="primary" size="xs">+٣.١٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>
                ٤.٨٢٪
              </div>
              <div style={{ fontSize: '12px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', marginTop: '6px' }}>
                الهدف الفصلي: <strong>٥.٠٪</strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: theme === 'dark' ? '#1F1913' : '#F5F1E9', marginTop: '14px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: theme === 'dark' ? '#D4AF37' : '#B45309', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Stat 4: Average Order */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C', fontWeight: 600 }}>متوسط قيمة السلة</span>
                <Badge tone="warning" size="xs">+٢.٥٪</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '28px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                ١,٦٢٠ ر.س
              </div>
              <div style={{ fontSize: '12px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', marginTop: '6px' }}>
                طلبات الذهب المعتمد عيار 18
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: theme === 'dark' ? '#1F1913' : '#F5F1E9', marginTop: '14px', overflow: 'hidden' }}>
                <div style={{ width: '84%', height: '100%', background: '#F59E0B', borderRadius: '999px' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. CHART WIDGETS
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                2. ودجات الرسوم البيانية والمخططات (Chart Widgets)
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                رسوم مصغرة تعتمد متجهات SVG عالية الدقة لتحليل الاتجاهات وتوزيع الأنشطة
              </span>
            </div>
            <Badge tone="neutral" size="sm">Micro Charts</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Chart 1: Sparkline Trend */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>مسار التدفق الأسبوعي</span>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 800, color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>
                    ٧٤,٥٠٠ ر.س
                  </div>
                </div>
                <Badge tone="primary" size="xs">+١٨.٥٪</Badge>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="reactGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme === 'dark' ? '#D4AF37' : '#B45309'} stopOpacity="0.35" />
                      <stop offset="100%" stopColor={theme === 'dark' ? '#D4AF37' : '#B45309'} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,60 C40,55 80,30 130,45 C180,60 220,15 280,20 L280,80 L0,80 Z" fill="url(#reactGrad1)" />
                  <path d="M0,60 C40,55 80,30 130,45 C180,60 220,15 280,20" fill="none" stroke={theme === 'dark' ? '#D4AF37' : '#B45309'} strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', paddingTop: '4px' }}>
                  <span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Activity Bars */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>كثافة الطلبات اليومية</span>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                    ١,٤٢٨ طلب
                  </div>
                </div>
                <Badge tone="success" size="xs">الذروة: الإثنين</Badge>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <svg width="100%" height="80" viewBox="0 0 280 80">
                  <rect x="15" y="35" width="20" height="45" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                  <rect x="55" y="20" width="20" height="60" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                  <rect x="95" y="8" width="20" height="72" rx="4" fill={theme === 'dark' ? '#D4AF37' : '#B45309'} />
                  <rect x="135" y="30" width="20" height="50" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                  <rect x="175" y="15" width="20" height="65" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                  <rect x="215" y="40" width="20" height="40" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                  <rect x="250" y="25" width="20" height="55" rx="4" fill={theme === 'dark' ? '#1F1913' : '#F5F1E9'} />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', paddingTop: '4px' }}>
                  <span>سبت</span><span>أحد</span><span>إثنين</span><span>ثلاثاء</span><span>أربعاء</span><span>خميس</span><span>جمعة</span>
                </div>
              </div>
            </div>

            {/* Chart 3: Ring Progress */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>اكتمال الحصة الربعية</span>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 800, color: '#10B981' }}>
                    ٨٨.٤٪
                  </div>
                </div>
                <Badge tone="primary" size="xs">Milestone Q3</Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: 'auto' }}>
                <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                  <svg width="70" height="70" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={theme === 'dark' ? '#1F1913' : '#F5F1E9'}
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={theme === 'dark' ? '#D4AF37' : '#B45309'}
                      strokeWidth="4"
                      strokeDasharray="88, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    88%
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: theme === 'dark' ? '#D5C9BC' : '#44403C' }}>
                  متبقي <strong>١١.٦٪</strong> لتحقيق المستهدف التوريدي السنوي للاستوديو.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. SOCIAL WIDGETS
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                3. ودجات التواصل الاجتماعي والمنصات (Social Widgets)
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                متابعة أعداد المتابعين ومعدلات التفاعل ومعدلات النمو عبر المنصات الرقمية
              </span>
            </div>
            <Badge tone="primary" size="sm">Social Channels</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Social 1: Twitter / X */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" shape="circle" style={{ background: theme === 'dark' ? '#1F1913' : '#F5F1E9', color: theme === 'dark' ? '#D4AF37' : '#B45309', fontWeight: 800 }}>
                    𝕏
                  </Avatar>
                  <strong style={{ fontSize: '14px' }}>منصة إكس (Twitter)</strong>
                </div>
                <Badge tone="primary" size="xs">نشط</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                ١٤٢,٥٠٠
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C', marginTop: '4px' }}>
                <span>متابع حقيقي</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>+١,٤٢٠ هذا الأسبوع</span>
              </div>
              <div style={{ marginTop: '14px' }}>
                <Button variant="secondary" size="xs" style={{ width: '100%' }}>متابعة الحساب</Button>
              </div>
            </div>

            {/* Social 2: LinkedIn */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" shape="circle" style={{ background: '#0A66C2', color: '#FFFFFF', fontWeight: 800 }}>
                    in
                  </Avatar>
                  <strong style={{ fontSize: '14px' }}>لينكد إن (LinkedIn)</strong>
                </div>
                <Badge tone="neutral" size="xs">مهني</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                ٨٨,٢٠٠
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C', marginTop: '4px' }}>
                <span>متخصص ومعماري</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>+٩٦٠ هذا الأسبوع</span>
              </div>
              <div style={{ marginTop: '14px' }}>
                <Button variant="secondary" size="xs" style={{ width: '100%' }}>انضم للشبكة</Button>
              </div>
            </div>

            {/* Social 3: Instagram */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" shape="circle" style={{ background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)', color: '#FFFFFF', fontWeight: 800 }}>
                    IG
                  </Avatar>
                  <strong style={{ fontSize: '14px' }}>إنستغرام (Instagram)</strong>
                </div>
                <Badge tone="primary" size="xs">بصري</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>
                ٢١٠,٤٠٠
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C', marginTop: '4px' }}>
                <span>معجب بالمقتنيات</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>+٣,١٠٠ تفاعل</span>
              </div>
              <div style={{ marginTop: '14px' }}>
                <Button variant="secondary" size="xs" style={{ width: '100%' }}>معرض الصور</Button>
              </div>
            </div>

            {/* Social 4: YouTube */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" shape="circle" style={{ background: '#FF0000', color: '#FFFFFF', fontWeight: 800 }}>
                    ▶
                  </Avatar>
                  <strong style={{ fontSize: '14px' }}>يوتيوب (YouTube)</strong>
                </div>
                <Badge tone="neutral" size="xs">فيديو</Badge>
              </div>
              <div style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, color: theme === 'dark' ? '#FBF8F3' : '#1C1917' }}>
                ٩٥,٨٠٠
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C', marginTop: '4px' }}>
                <span>مشترك بالقناة</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>+١٢٤ ألف دقيقة</span>
              </div>
              <div style={{ marginTop: '14px' }}>
                <Button variant="secondary" size="xs" style={{ width: '100%' }}>مشاهدة الأفلام</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. WEATHER WIDGET
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                4. ودجة الأرصاد الجوية والطقس (Weather Widget)
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                بيانات لحظية لحالة الطقس ودرجات الحرارة مع توقعات ٤ أيام قادمة وتبديل فوري للمدن
              </span>
            </div>

            {/* City Switcher */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: theme === 'dark' ? '#17120E' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.18)' : '#E7E5E4'}`,
                borderRadius: '8px',
                padding: '2px',
              }}
            >
              <button
                type="button"
                className={`qhr-btn qhr-btn--xs ${selectedCity === 'cairo' ? 'qhr-btn--primary' : 'qhr-btn--ghost'}`}
                onClick={() => setSelectedCity('cairo')}
              >
                القاهرة
              </button>
              <button
                type="button"
                className={`qhr-btn qhr-btn--xs ${selectedCity === 'alex' ? 'qhr-btn--primary' : 'qhr-btn--ghost'}`}
                onClick={() => setSelectedCity('alex')}
              >
                الإسكندرية
              </button>
              <button
                type="button"
                className={`qhr-btn qhr-btn--xs ${selectedCity === 'aswan' ? 'qhr-btn--primary' : 'qhr-btn--ghost'}`}
                onClick={() => setSelectedCity('aswan')}
              >
                أسوان
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Main Weather Card */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Badge tone="primary" size="xs">{currentW.region}</Badge>
                  <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, margin: '6px 0 0' }}>
                    {currentW.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                    {currentW.desc}
                  </span>
                </div>

                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme === 'dark' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(180, 83, 9, 0.08)',
                    borderRadius: '50%',
                    color: theme === 'dark' ? '#D4AF37' : '#B45309',
                  }}
                >
                  <Icon name="sun" size="md" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', margin: '20px 0 10px' }}>
                <div style={{ fontFamily: '"El Messiri", serif', fontSize: '54px', fontWeight: 800, color: theme === 'dark' ? '#D4AF37' : '#B45309', lineHeight: 1 }}>
                  {currentW.temp}
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#D5C9BC' : '#44403C' }}>
                  <div>العظمى: <strong>{currentW.high}</strong> · الصغرى: <strong>{currentW.low}</strong></div>
                  <div>مؤشر الأشعة فوق البنفسجية: <strong>معتدل (UV 5)</strong></div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: '14px',
                  paddingTop: '14px',
                  borderTop: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
                  fontSize: '12px',
                }}
              >
                <div>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>الرطوبة الجوية</span>
                  <strong style={{ fontSize: '14px' }}>{currentW.humidity}</strong>
                </div>
                <div>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>سرعة الرياح</span>
                  <strong style={{ fontSize: '14px' }}>{currentW.wind}</strong>
                </div>
                <div>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>الضغط الجوي</span>
                  <strong style={{ fontSize: '14px' }}>{currentW.pressure}</strong>
                </div>
              </div>

              {/* 4-Day Forecast */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
                  textAlign: 'center',
                }}
              >
                {currentW.forecast.map((f, i) => (
                  <div key={i}>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>{f.day}</span>
                    <div style={{ fontWeight: 700, margin: '4px 0' }}>{f.temp}</div>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>{f.condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental & Solar Energy Telemetry */}
            <div style={{ ...cardStyle, justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                    كفاءة مزارع الطاقة الشمسية التابعة
                  </h3>
                  <Badge tone="success" size="xs">توليد مستمر</Badge>
                </div>
                <p style={{ fontSize: '13px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', margin: '0 0 16px' }}>
                  متابعة توليد الطاقة النظيفة لمراكز بيانات القاهرة استناداً إلى ساعات السطوع الشمسي المباشر.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ fontFamily: '"El Messiri", serif', fontSize: '34px', fontWeight: 800, color: '#10B981' }}>
                    ٩٤.٢٪
                  </div>
                  <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                    نسبة الاكتفاء الذاتي اليومية
                  </span>
                </div>

                <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: theme === 'dark' ? '#1F1913' : '#F5F1E9', marginBottom: '20px', overflow: 'hidden' }}>
                  <div style={{ width: '94.2%', height: '100%', background: 'linear-gradient(90deg, #10B981, #D4AF37)', borderRadius: '999px' }}></div>
                </div>

                <div
                  style={{
                    background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '12px',
                    color: theme === 'dark' ? '#D5C9BC' : '#44403C',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>شروق الشمس اليوم:</span>
                    <strong>05:42 ص</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>غروب الشمس المتوقع:</span>
                    <strong>06:14 م</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>إجمالي الطاقة المنتجة:</span>
                    <strong style={{ color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٤٢٨ كيلوواط/ساعة</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outline" size="sm">عرض تقرير الاستدامة</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            5. BLOG & EDITORIAL WIDGETS
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                5. ودجات التدوين والمحتوى التحريري (Blog Widgets)
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                بطاقات إبراز المقالات المعمارية، ملخصات أحدث الدراسات، وبطاقة الكاتب التحريرية
              </span>
            </div>
            <Badge tone="primary" size="sm">Editorial Cards</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Featured Post */}
            <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <Badge tone="primary" size="xs">دراسة معمارية خاصة</Badge>
                <span style={{ fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>وقت القراءة: ٦ دقائق</span>
              </div>

              <h3
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 800,
                  margin: '0 0 12px',
                  color: theme === 'dark' ? '#FBF8F3' : '#1C1917',
                  lineHeight: 1.4,
                }}
              >
                تأثير العمارة الفاطمية ونقوش المشربيات في تصميم واجهات الويب وأنظمة التصميم الحديثة
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#D5C9BC' : '#44403C',
                  lineHeight: 1.7,
                  margin: '0 0 20px',
                }}
              >
                كيف استلهمت منظومة قاهرة للتصميم لغة التناسب الذهبي والشبكات الهندسية الإسلامية لإنتاج واجهات برمجية صارمة تحقق أعلى معايير التوافقية وسهولة القراءة للعين العربية.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" shape="circle" style={{ background: theme === 'dark' ? '#D4AF37' : '#B45309', color: '#0A0806', fontWeight: 700 }}>
                    أ.ر
                  </Avatar>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>د. أحمد رضوان</strong>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>كبير باحثي التراث المعماري</span>
                  </div>
                </div>

                <Button variant="secondary" size="sm">قراءة المقال بالكامل</Button>
              </div>
            </div>

            {/* Author Spotlight */}
            <div style={{ ...cardStyle, textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4AF37, #92400E)',
                  color: '#0A0806',
                  fontFamily: '"El Messiri", serif',
                  fontSize: '32px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                ق
              </div>
              <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>
                فريق استوديو الوكالة
              </h3>
              <span style={{ fontSize: '12px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                Alwkala Editorial Team
              </span>

              <p style={{ fontSize: '13px', color: theme === 'dark' ? '#D5C9BC' : '#44403C', margin: '12px 0 16px' }}>
                فريق متخصص في بناء الهياكل المعمارية وحلول الأنظمة التقنية السيادية في الشرق الأوسط ومصر.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '100%',
                  padding: '12px 0',
                  borderTop: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
                  borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
                  marginBottom: '16px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <strong style={{ fontSize: '16px', display: 'block', color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٤٨</strong>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C' }}>مقالة</span>
                </div>
                <div>
                  <strong style={{ fontSize: '16px', display: 'block', color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>١٢</strong>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C' }}>دراسة</span>
                </div>
                <div>
                  <strong style={{ fontSize: '16px', display: 'block', color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٣٤ ألف</strong>
                  <span style={{ color: theme === 'dark' ? '#9E9081' : '#78716C' }}>قارئ</span>
                </div>
              </div>

              <Button variant="outline" size="sm" style={{ width: '100%' }}>متابعة الكاتب</Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            6. LIST WIDGETS
            ══════════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(212,175,55,0.18)' : '#E7E5E4'}`,
              paddingBottom: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                6. ودجات القوائم والمهام الحية (List Widgets)
              </h2>
              <span style={{ fontSize: '13px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                قوائم تفاعلية لإدارة المهام السريعة، خط زمني لتدفق العمليات، وترتيب المنتجات الأكثر مبيعاً
              </span>
            </div>
            <Badge tone="primary" size="sm">Interactive Feeds</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* List 1: Interactive To-Do */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '17px', fontWeight: 700, margin: 0 }}>
                    قائمة المهام السريعة
                  </h3>
                  <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                    إنجاز المهام اليومية
                  </span>
                </div>
                <Badge tone="primary" size="xs">
                  {completedCount} من {tasks.length} منجز
                </Badge>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleTask(t.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span
                      style={{
                        fontSize: '13px',
                        flex: 1,
                        textDecoration: t.done ? 'line-through' : 'none',
                        opacity: t.done ? 0.5 : 1,
                      }}
                    >
                      {t.text}
                    </span>
                    <Badge tone={t.priority === 'urgent' ? 'danger' : 'neutral'} size="xs">
                      {t.priorityLabel}
                    </Badge>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddTask} style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="إضافة مهمة جديدة..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  style={{
                    height: '34px',
                    fontSize: '12px',
                    flex: 1,
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.18)' : '#E7E5E4'}`,
                    backgroundColor: theme === 'dark' ? '#130F0B' : '#FFFFFF',
                    color: theme === 'dark' ? '#FBF8F3' : '#1C1917',
                    outline: 'none',
                  }}
                />
                <Button variant="primary" size="xs" type="submit">إضافة</Button>
              </form>
            </div>

            {/* List 2: Activity Timeline */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '17px', fontWeight: 700, margin: 0 }}>
                    تدفق الأنشطة اللحظي
                  </h3>
                  <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                    سجل العمليات المباشر
                  </span>
                </div>
                <Badge tone="success" size="xs">مباشر</Badge>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                      border: '1px solid #10B981',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="check" size="xs" />
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    <strong>اعتماد عقد التوريد الملكي #8812</strong>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                      بواسطة د. أحمد رضوان · منذ 5 دقائق
                    </span>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                      border: `1px solid ${theme === 'dark' ? '#D4AF37' : '#B45309'}`,
                      color: theme === 'dark' ? '#D4AF37' : '#B45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="plus" size="xs" />
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    <strong>سداد دفعة أولى بمبلغ ٤٥,٠٠٠ ر.س</strong>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                      عبر بوابة الدفع الموحدة · منذ 32 دقيقة
                    </span>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                      border: '1px solid #3B82F6',
                      color: '#3B82F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="search" size="xs" />
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    <strong>انضمام عضو جديد: م. سارة إبراهيم</strong>
                    <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                      فريق التوثيق المعماري · منذ ساعتين
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* List 3: Top Selling Catalog Items */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '17px', fontWeight: 700, margin: 0 }}>
                    المقتنيات الأكثر طلباً
                  </h3>
                  <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C' }}>
                    ترتيب مبيعات الشهر الحالي
                  </span>
                </div>
                <Badge tone="primary" size="xs">الذهب الخالص</Badge>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: theme === 'dark' ? '#D4AF37' : '#B45309',
                        color: '#0A0806',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      ١
                    </span>
                    <div>
                      <strong>خاتم الأفق الملكي عيار 18</strong>
                      <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                        ١٢٨ عملية شراء
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٧٤,٢٠٠ ر.س</strong>
                </li>

                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                        border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.18)' : '#E7E5E4'}`,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      ٢
                    </span>
                    <div>
                      <strong>سوار النيل المنقوش</strong>
                      <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                        ٩٤ عملية شراء
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٥٨,١٠٠ ر.س</strong>
                </li>

                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: theme === 'dark' ? '#1F1913' : '#F5F1E9',
                        border: `1px solid ${theme === 'dark' ? 'rgba(212, 175, 55, 0.18)' : '#E7E5E4'}`,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      ٣
                    </span>
                    <div>
                      <strong>قلادة الفيروز السينائية</strong>
                      <span style={{ fontSize: '11px', color: theme === 'dark' ? '#9E9081' : '#78716C', display: 'block' }}>
                        ٧٦ عملية شراء
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: theme === 'dark' ? '#D4AF37' : '#B45309' }}>٤١,٥٠٠ ر.س</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

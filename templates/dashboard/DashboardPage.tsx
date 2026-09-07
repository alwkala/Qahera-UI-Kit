'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
} from '../../renderers/react/Navbar';
import { DashboardStat } from '../../renderers/react/patterns/DashboardStat';
import { Card } from '../../renderers/react/Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../renderers/react/Table';
import { Badge } from '../../renderers/react/Badge';
import { Button } from '../../renderers/react/Button';
import { Icon } from '../../renderers/react/Icon';

const STATS_DATA = [
  {
    title: 'إجمالي الإيرادات الشهرية',
    value: '١٢٨,٤٥٠ ر.س',
    delta: '+١٢.٥٪',
    trend: 'up' as const,
    icon: 'calendar' as const,
    context: 'مقارنة بالشهر السابق',
  },
  {
    title: 'المستخدمين النشطين',
    value: '١٤,٢٩٠',
    delta: '+٨.٢٪',
    trend: 'up' as const,
    icon: 'users' as const,
    context: 'آخر ٣٠ يوماً',
  },
  {
    title: 'العمليات المكتملة',
    value: '٣٨,٩٢٠',
    delta: '-١.٤٪',
    trend: 'down' as const,
    icon: 'check' as const,
    context: 'معدل نجاح ٩٩.٤٪',
  },
  {
    title: 'زمن استجابة النظام',
    value: '١٤٢ مل/ث',
    delta: '+١٨.٠٪',
    trend: 'up' as const,
    icon: 'clock' as const,
    context: 'تحسن في زمن التحميل',
  },
];

const RECENT_ACTIVITIES = [
  { id: 'ACT-901', user: 'أحمد محمود', action: 'إنشاء عقد معايير جديد', status: 'success', time: 'منذ ٥ دقائق' },
  { id: 'ACT-902', user: 'سارة خالد', action: 'تعديل الصلاحيات الإدارية', status: 'info', time: 'منذ ١٢ دقيقة' },
  { id: 'ACT-903', user: 'كريم إبراهيم', action: 'تصدير تقرير الإيرادات السنوي', status: 'success', time: 'منذ ساعة' },
  { id: 'ACT-904', user: 'منى حسن', action: 'محاولة تسجيل دخول غير مصرح بها', status: 'danger', time: 'منذ ساعتين' },
  { id: 'ACT-905', user: 'نظام المزامنة', action: 'توليد الرموز والقوالب المعيارية', status: 'success', time: 'منذ ٣ ساعات' },
];

export const DashboardPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
  };

  return (
    <div
      className="qhr-dashboard-page"
      dir="rtl"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--qhr-surface-page, #020617)',
        color: 'var(--qhr-text-primary, #f8fafc)',
      }}
    >
      <Navbar>
        <NavbarBrand href="#">
          <span className="qhr-avatar qhr-avatar--rounded qhr-avatar--sm">ق</span>
          <span>لوحة القيادة · قاهرة</span>
        </NavbarBrand>
        <NavbarLinks>
          <NavbarLink href="#" active>
            نظرة عامة
          </NavbarLink>
          <NavbarLink href="#">التقارير</NavbarLink>
          <NavbarLink href="#">العمليات</NavbarLink>
          <NavbarLink href="#">الإعدادات</NavbarLink>
        </NavbarLinks>
        <NavbarActions>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleTheme}
            iconStart={<Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />}
          >
            {theme === 'dark' ? 'النمط الفاتح' : 'النمط الداكن'}
          </Button>
          <Button variant="secondary" size="sm">
            <Icon name="bell" size={16} />
          </Button>
          <Button variant="primary" size="sm">
            <Icon name="plus" size={16} />
            <span>تقرير جديد</span>
          </Button>
        </NavbarActions>
      </Navbar>

      <main style={{ padding: 'var(--qhr-space-8)', maxWidth: '1200px', margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--qhr-space-4)',
            marginBottom: 'var(--qhr-space-8)',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'var(--qhr-text-2xl)',
                fontWeight: 700,
                color: 'var(--qhr-color-neutral-900)',
                margin: '0 0 var(--qhr-space-1) 0',
              }}
            >
              مؤشرات الأداء التشغيلية
            </h1>
            <p style={{ fontSize: 'var(--qhr-text-sm)', color: 'var(--qhr-color-neutral-600)', margin: 0 }}>
              متابعة مباشرة ومحدثة لحركة النظام والعمليات ومؤشرات النمو.
            </p>
          </div>
          <div style={{ display: 'inline-flex', gap: 'var(--qhr-space-2)' }}>
            <Button variant="secondary" size="sm">
              <Icon name="download" size={16} />
              <span>تصدير البيانات</span>
            </Button>
            <Button variant="secondary" size="sm">
              <Icon name="refresh" size={16} />
              <span>تحديث حي</span>
            </Button>
          </div>
        </header>

        {/* 4 KPI Cards Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--qhr-space-5)',
            marginBottom: 'var(--qhr-space-8)',
          }}
        >
          {STATS_DATA.map((stat, idx) => (
            <DashboardStat
              key={idx}
              title={stat.title}
              value={stat.value}
              delta={stat.delta}
              trend={stat.trend}
              icon={stat.icon}
              context={stat.context}
            />
          ))}
        </section>

        {/* Recent Activity Table */}
        <Card style={{ padding: 'var(--qhr-space-6)', background: 'var(--qhr-surface-base)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--qhr-space-4)',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'var(--qhr-text-lg)',
                  fontWeight: 600,
                  color: 'var(--qhr-color-neutral-900)',
                  margin: '0 0 var(--qhr-space-1) 0',
                }}
              >
                العمليات وسجلات النشاط الأخيرة
              </h2>
              <p style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)', margin: 0 }}>
                آخر الأحداث المسجلة في بيئة التشغيل المعيارية.
              </p>
            </div>
            <Button variant="ghost" size="xs">
              <span>عرض كافة السجلات</span>
              <Icon name="arrow-end" size={14} />
            </Button>
          </div>

          <Table striped>
            <TableHeader>
              <TableRow>
                <TableHead>معرف الحدث</TableHead>
                <TableHead>المستخدم / المصدر</TableHead>
                <TableHead>الإجراء المنفذ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead style={{ textAlign: 'end' }}>الوقت المنقضي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ACTIVITIES.map((act) => {
                const tone = act.status as 'success' | 'info' | 'danger';
                const label = act.status === 'success' ? 'مكتمل' : act.status === 'danger' ? 'فشل' : 'معلومة';

                return (
                  <TableRow key={act.id}>
                    <TableCell>
                      <code>{act.id}</code>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600 }}>{act.user}</TableCell>
                    <TableCell>{act.action}</TableCell>
                    <TableCell>
                      <Badge tone={tone} size="sm">
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ textAlign: 'end', fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
                      {act.time}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

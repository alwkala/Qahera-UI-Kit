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
import { FilterBar } from '../../renderers/react/patterns/FilterBar';
import { Tabs, TabList, Tab } from '../../renderers/react/Tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../renderers/react/Accordion';
import { Card, CardHeader, CardBody, CardFooter } from '../../renderers/react/Card';
import { Badge } from '../../renderers/react/Badge';
import { Button } from '../../renderers/react/Button';
import { BackToTop } from '../../renderers/react/BackToTop';
import { Icon } from '../../renderers/react/Icon';
import { QaheraIconName } from '../../renderers/react/types';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  level: string;
}

export function EducationPage() {
  const [activeTab, setActiveTab] = useState('active');

  const stats: Array<{
    title: string;
    value: string;
    delta: string;
    trend: 'up' | 'down';
    icon: QaheraIconName;
  }> = [
    {
      title: 'الدورات المسجلة',
      value: '6 دورات',
      delta: '+2 هذا الشهر',
      trend: 'up',
      icon: 'folder',
    },
    {
      title: 'ساعات التعلم',
      value: '42.5 ساعة',
      delta: '+14% نشاط إضافي',
      trend: 'up',
      icon: 'clock',
    },
    {
      title: 'الشهادات المكتسبة',
      value: '3 شهادات',
      delta: 'شهادة جديدة جاهزة',
      trend: 'up',
      icon: 'check',
    },
    {
      title: 'معدل الإنجاز العام',
      value: '78%',
      delta: 'متقدم على الجدول',
      trend: 'up',
      icon: 'arrow-end',
    },
  ];

  const courses: Course[] = [
    {
      id: 'course-1',
      title: 'هندسة نظم التصميم المعمارية للذكاء الاصطناعي',
      instructor: 'م. أحمد الشناوي',
      category: 'نظم التصميم',
      progress: 85,
      totalLessons: 24,
      completedLessons: 20,
      duration: '18 ساعة',
      level: 'متقدم',
    },
    {
      id: 'course-2',
      title: 'تطوير تطبيقات الويب فائقة الأداء بـ React 19 و Next.js 16',
      instructor: 'سارة عبد الله',
      category: 'تطوير الواجهات',
      progress: 60,
      totalLessons: 32,
      completedLessons: 19,
      duration: '26 ساعة',
      level: 'متوسط',
    },
    {
      id: 'course-3',
      title: 'بناء النوى البرمجية الآمنة وقواعد الحوكمة الرقمية بـ PHP 8',
      instructor: 'د. طارق مراد',
      category: 'الأنظمة الخلفية',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      duration: '14 ساعة',
      level: 'متقدم',
    },
  ];

  const syllabus = [
    {
      id: 'mod-1',
      title: 'الوحدة 1: الأساسيات المعمارية ونظام الرموز التصميمية (Tokens)',
      lessons: [
        { name: 'مقدمة في فلسفة الرموز المستقلة عن الإطار', duration: '18 دقيقة', done: true },
        { name: 'هيكلة متغيرات CSS والطبقات المنطقية RTL', duration: '25 دقيقة', done: true },
        { name: 'إدارة ألوان الواجهات وأطياف التباين العالي', duration: '30 دقيقة', done: true },
      ],
    },
    {
      id: 'mod-2',
      title: 'الوحدة 2: العقود التجريدية وحوكمة المكونات متعددة الأهداف',
      lessons: [
        { name: 'صياغة عقود المكونات بلغة YAML المعيارية', duration: '22 دقيقة', done: true },
        { name: 'الربط التبادلي بين React و PHP Plates و HTMX', duration: '40 دقيقة', done: false },
        { name: 'بناء المترجم المعياري وفحص سلامة المخططات', duration: '35 دقيقة', done: false },
      ],
    },
    {
      id: 'mod-3',
      title: 'الوحدة 3: الاختبارات الشاملة وحظر الانجراف المعجمي',
      lessons: [
        { name: 'قواعد مكافحة التلوث البصري والإيموجي', duration: '15 دقيقة', done: false },
        { name: 'أتمتة الفحص في بيئات الإنتاج المستمر', duration: '28 دقيقة', done: false },
      ],
    },
  ];

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
      {/* Navbar */}
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
                width: '36px',
                height: '36px',
                borderRadius: 'var(--qhr-radius-md, 8px)',
                background: 'linear-gradient(135deg, var(--qhr-color-primary-500, #C7A35A), var(--qhr-color-primary-700, #8A6D3B))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Icon name="folder" size="sm" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              أكاديمية قاهرة
            </span>
          </div>
        </NavbarBrand>
        <NavbarLinks>
          <NavbarLink href="#courses" active>دوراتي</NavbarLink>
          <NavbarLink href="#catalog">دليل المقررات</NavbarLink>
          <NavbarLink href="#progress">سجل الإنجاز</NavbarLink>
          <NavbarLink href="#certificates">الشهادات</NavbarLink>
        </NavbarLinks>
        <NavbarActions>
          <Button variant="ghost" size="sm" iconStart={<Icon name="search" size="sm" />}>
            بحث
          </Button>
          <Button variant="primary" size="sm">
            استكشف الدورات
          </Button>
        </NavbarActions>
      </Navbar>

      {/* Main Container */}
      <main
        style={{
          maxWidth: '1280px',
          marginInline: 'auto',
          paddingInline: 'var(--qhr-space-6, 1.5rem)',
          paddingBlock: 'var(--qhr-space-8, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--qhr-space-8, 2rem)',
        }}
      >
        {/* Welcome Header */}
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--qhr-space-4, 1rem)',
            paddingBottom: 'var(--qhr-space-6, 1.5rem)',
            borderBottom: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                margin: 0,
                color: 'var(--qhr-text-primary, #FFFFFF)',
              }}
            >
              مرحباً بك، مهندس عبد الرحمن
            </h1>
            <p
              style={{
                margin: 'var(--qhr-space-2, 0.5rem) 0 0',
                color: 'var(--qhr-text-muted, #9E9E9E)',
                fontSize: '1rem',
              }}
            >
              واصل مسار تعلمك في هندسة النظم وتطوير الواجهات المتقدمة.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--qhr-space-3, 0.75rem)' }}>
            <Button variant="outline" size="md" iconStart={<Icon name="download" size="sm" />}>
              تحميل السجل الأكاديمي
            </Button>
            <Button variant="primary" size="md" iconStart={<Icon name="arrow-end" size="sm" />}>
              متابعة آخر درس
            </Button>
          </div>
        </header>

        {/* Dashboard Stats */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--qhr-space-4, 1rem)',
          }}
        >
          {stats.map((stat, idx) => (
            <DashboardStat
              key={idx}
              title={stat.title}
              value={stat.value}
              delta={stat.delta}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </section>

        {/* Filter & Tabs Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--qhr-space-4, 1rem)',
          }}
        >
          <Tabs
            defaultValue="active"
            value={activeTab}
            onValueChange={(tabId: string) => setActiveTab(tabId)}
          >
            <TabList>
              <Tab value="active">الدورات الحالية (3)</Tab>
              <Tab value="completed">المكتملة (4)</Tab>
              <Tab value="saved">المحفوظة (2)</Tab>
            </TabList>
          </Tabs>

          <FilterBar
            filters={[
              { key: 'all', label: 'كافة المجالات', active: true },
              { key: 'design-systems', label: 'نظم التصميم' },
              { key: 'frontend', label: 'تطوير الواجهات' },
              { key: 'backend', label: 'الأنظمة الخلفية' },
            ]}
            onToggleFilter={() => {}}
          />
        </div>

        {/* Courses Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--qhr-space-6, 1.5rem)',
          }}
        >
          {courses.map((course) => (
            <Card key={course.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardHeader>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    gap: 'var(--qhr-space-2, 0.5rem)',
                  }}
                >
                  <Badge tone="neutral">{course.category}</Badge>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--qhr-text-muted, #9E9E9E)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--qhr-space-1, 0.25rem)',
                    }}
                  >
                    <Icon name="clock" size="xs" />
                    {course.duration}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    margin: 'var(--qhr-space-3, 0.75rem) 0 0',
                    lineHeight: 1.4,
                    color: 'var(--qhr-text-primary, #FFFFFF)',
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--qhr-text-secondary, #BDBDBD)',
                    margin: 'var(--qhr-space-1, 0.25rem) 0 0',
                  }}
                >
                  المحاضر: {course.instructor}
                </p>
              </CardHeader>

              <CardBody style={{ flex: 1 }}>
                <div style={{ marginTop: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8125rem',
                      color: 'var(--qhr-text-muted, #9E9E9E)',
                      marginBottom: 'var(--qhr-space-2, 0.5rem)',
                    }}
                  >
                    <span>
                      {course.completedLessons} من أصل {course.totalLessons} درس
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--qhr-color-primary-400, #D4AF37)' }}>
                      {course.progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: 'var(--qhr-surface-muted, rgba(255,255,255,0.1))',
                      borderRadius: 'var(--qhr-radius-full, 9999px)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${course.progress}%`,
                        height: '100%',
                        backgroundColor: 'var(--qhr-color-primary-500, #C7A35A)',
                        borderRadius: 'var(--qhr-radius-full, 9999px)',
                        transition: 'width var(--qhr-motion-duration-normal, 200ms) ease',
                      }}
                    />
                  </div>
                </div>
              </CardBody>

              <CardFooter
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.06))',
                  paddingTop: 'var(--qhr-space-4, 1rem)',
                }}
              >
                <Badge tone="primary">{course.level}</Badge>
                <Button variant="primary" size="sm" iconEnd={<Icon name="arrow-end" size="xs" />}>
                  استئناف التعلم
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* Detailed Syllabus Module Section */}
        <section
          style={{
            marginTop: 'var(--qhr-space-8, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--qhr-space-4, 1rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
              paddingBottom: 'var(--qhr-space-3, 0.75rem)',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>
                منهج الدورة النشطة: هندسة نظم التصميم
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--qhr-text-muted, #9E9E9E)',
                  margin: 'var(--qhr-space-1, 0.25rem) 0 0',
                }}
              >
                استعرض تفاصيل الوحدات والدروس المكتملة والمقبلة
              </p>
            </div>
            <Badge tone="success">شهادة معتمدة عند الإكمال</Badge>
          </div>

          <Accordion>
            {syllabus.map((unit) => (
              <AccordionItem key={unit.id} id={unit.id}>
                <AccordionTrigger id={unit.id}>{unit.title}</AccordionTrigger>
                <AccordionContent id={unit.id}>
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--qhr-space-3, 0.75rem)',
                    }}
                  >
                    {unit.lessons.map((lesson, lIdx) => (
                      <li
                        key={lIdx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 'var(--qhr-space-3, 0.75rem) var(--qhr-space-4, 1rem)',
                          backgroundColor: 'var(--qhr-surface-muted, rgba(255,255,255,0.03))',
                          borderRadius: 'var(--qhr-radius-md, 8px)',
                          border: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.05))',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--qhr-space-3, 0.75rem)',
                          }}
                        >
                          <span
                            style={{
                              color: lesson.done
                                ? 'var(--qhr-color-success-500, #22C55E)'
                                : 'var(--qhr-text-muted, #9E9E9E)',
                            }}
                          >
                            <Icon name={lesson.done ? 'check' : 'clock'} size="sm" />
                          </span>
                          <span
                            style={{
                              fontWeight: lesson.done ? 500 : 600,
                              color: lesson.done
                                ? 'var(--qhr-text-secondary, #BDBDBD)'
                                : 'var(--qhr-text-primary, #FFFFFF)',
                            }}
                          >
                            {lesson.name}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--qhr-space-4, 1rem)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--qhr-text-muted, #9E9E9E)',
                            }}
                          >
                            {lesson.duration}
                          </span>
                          <Button
                            variant={lesson.done ? 'ghost' : 'outline'}
                            size="xs"
                          >
                            {lesson.done ? 'إعادة المشاهدة' : 'بدء الدرس'}
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <BackToTop />
    </div>
  );
}
export default EducationPage;

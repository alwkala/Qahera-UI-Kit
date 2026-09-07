'use client';

import React, { useState } from 'react';
import { Card } from '../../renderers/react/Card';
import { Input } from '../../renderers/react/Input';
import { Checkbox } from '../../renderers/react/Checkbox';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';

type AuthView = 'login' | 'register' | 'register-2' | 'lock-screen' | 'forgot-password';

export const AuthPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeView, setActiveView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register 2 (Multi-step)
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('engineer');
  const [teamSize, setTeamSize] = useState('6-25');

  // Status & Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
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
        backgroundColor: 'var(--auth-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--auth-text-primary, var(--qhr-text-primary, #FBF8F3))',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background-color var(--qhr-motion-duration-slow, 350ms), color var(--qhr-motion-duration-slow, 350ms)',
      }}
    >
      {/* 1. Top Navigation & Suite View Switcher */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          insetInline: 0,
          zIndex: 100,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--auth-accent, #D4AF37)',
              color: '#0A0806',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: '"El Messiri", serif',
            }}
          >
            ق
          </div>
          <span style={{ fontFamily: '"El Messiri", serif', fontSize: '16px', fontWeight: 700 }}>
            منظومة قاهرة للمصادقة الممتدة
          </span>
        </div>

        {/* View Switcher Pills */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--auth-surface-overlay, rgba(15, 11, 9, 0.85))',
            border: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveView('login')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeView === 'login' ? 'var(--auth-accent, #D4AF37)' : 'transparent',
              color: activeView === 'login' ? '#0A0806' : 'var(--auth-text-secondary, #D4C9BC)',
              fontWeight: activeView === 'login' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setActiveView('register')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeView === 'register' ? 'var(--auth-accent, #D4AF37)' : 'transparent',
              color: activeView === 'register' ? '#0A0806' : 'var(--auth-text-secondary, #D4C9BC)',
              fontWeight: activeView === 'register' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            إنشاء حساب
          </button>
          <button
            type="button"
            onClick={() => setActiveView('register-2')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeView === 'register-2' ? 'var(--auth-accent, #D4AF37)' : 'transparent',
              color: activeView === 'register-2' ? '#0A0806' : 'var(--auth-text-secondary, #D4C9BC)',
              fontWeight: activeView === 'register-2' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            تسجيل مؤسسي (خطوات)
          </button>
          <button
            type="button"
            onClick={() => setActiveView('lock-screen')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeView === 'lock-screen' ? 'var(--auth-accent, #D4AF37)' : 'transparent',
              color: activeView === 'lock-screen' ? '#0A0806' : 'var(--auth-text-secondary, #D4C9BC)',
              fontWeight: activeView === 'lock-screen' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            شاشة القفل
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
            background: 'var(--auth-surface-overlay, rgba(15, 11, 9, 0.85))',
            border: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
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

      {/* 2. Main Viewport */}
      {activeView === 'lock-screen' ? (
        /* ── Lock Screen View ────────────────────────────────────────── */
        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'var(--auth-surface-card, #17120F)',
              border: '1px solid var(--auth-border, rgba(212, 175, 55, 0.25))',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                position: 'relative',
                width: '88px',
                height: '88px',
                marginInline: 'auto',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--auth-accent, #D4AF37), #8A6D3B)',
                  color: '#0A0806',
                  fontFamily: '"El Messiri", serif',
                  fontSize: '32px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px var(--auth-surface-card), 0 0 0 6px var(--auth-accent, #D4AF37)',
                }}
              >
                و
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--auth-surface-card, #17120F)',
                  border: '2px solid var(--auth-accent, #D4AF37)',
                  color: 'var(--auth-accent, #D4AF37)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="lock" size="xs" />
              </div>
            </div>

            <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, margin: '0 0 4px 0' }}>
              م. وائل سعيد
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--auth-text-muted, #9E9081)', margin: '0 0 24px 0' }}>
              مهندس نظم أول · استوديو الوكالة
            </p>

            <div
              style={{
                background: 'var(--auth-surface-subtle, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '24px',
                fontSize: '13px',
                color: 'var(--auth-text-secondary, #D4C9BC)',
              }}
            >
              تم تأمين الجلسة لحماية بياناتك بسبب عدم النشاط. أدخل رمز PIN أو كلمة المرور للمتابعة.
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast('تم إلغاء قفل الجلسة بنجاح! أهلاً بعودتك.');
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="كلمة المرور أو رمز PIN"
                  required
                />
              </div>

              <Button variant="primary" size="lg" style={{ width: '100%', marginBottom: '12px' }}>
                <span>إلغاء قفل الجلسة</span>
              </Button>

              <Button
                variant="secondary"
                size="md"
                style={{ width: '100%', marginBottom: '20px' }}
                onClick={() => triggerToast('تمت المصادقة عبر Passkey بنجاح.')}
              >
                <span>المصادقة عبر البصمة / Passkey</span>
              </Button>

              <button
                type="button"
                onClick={() => setActiveView('login')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--auth-text-muted, #9E9081)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                تسجيل الدخول باستخدام حساب آخر
              </button>
            </form>
          </div>
        </main>
      ) : (
        /* ── Split Screen (Login, Register, Register 2) ─────────────── */
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
          }}
        >
          {/* Right Showcase Column */}
          <section
            style={{
              padding: '64px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderInlineEnd: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
              backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.12), transparent 70%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--auth-accent, #D4AF37)',
                  color: '#0A0806',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontFamily: '"El Messiri", serif',
                }}
              >
                ق
              </div>
              <div>
                <h3 style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                  نظام قاهرة المعماري
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--auth-text-muted, #9E9081)' }}>
                  Sovereign Identity Gateway v1.0
                </span>
              </div>
            </div>

            <div style={{ maxWidth: '480px', marginBlock: 'auto' }}>
              <Badge tone="primary" style={{ marginBottom: '12px' }}>
                معايير آمنة معتمدة
              </Badge>
              <h1
                style={{
                  fontFamily: '"El Messiri", serif',
                  fontSize: '34px',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  margin: '0 0 16px 0',
                }}
              >
                {activeView === 'login' && 'بوابة الوصول الموحدة لنظم التصميم والمعايير الرقمية'}
                {activeView === 'register' && 'انضم إلى مجتمع قاهرة وابدأ بناء واجهاتك الملكية'}
                {activeView === 'register-2' && 'تهيئة مساحة عمل المنشأة وحوكمة فرق التطوير'}
                {activeView === 'forgot-password' && 'استعادة مشفرة وآمنة لبيانات حسابك المؤسسي'}
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--auth-text-secondary, #D4C9BC)', lineHeight: 1.8 }}>
                تحكم كامل في إدارة الرموز التصميمية، عقود المكونات، والأنماط المعمارية مع حوكمة رقمية خالية من الانجراف المعجمي.
              </p>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--auth-text-muted, #9E9081)' }}>
              © 2026 الوكالة Alwkala · استوديو التكنولوجيا المصري
            </div>
          </section>

          {/* Left Form Column */}
          <section
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 24px',
              paddingTop: '80px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                background: 'var(--auth-surface-card, #17120F)',
                border: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* LOGIN FORM */}
              {activeView === 'login' && (
                <div>
                  <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0' }}>
                    تسجيل الدخول للمنظومة
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--auth-text-secondary, #D4C9BC)', margin: '0 0 24px 0' }}>
                    أدخل بيانات الاعتماد المهنية للمتابعة إلى مساحة عملك.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      triggerToast('تم تسجيل الدخول بنجاح! جاري توجيهك...');
                    }}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        البريد المهني أو المعرف
                      </label>
                      <Input type="email" placeholder="wael@alwkala.com" required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600 }}>كلمة المرور</label>
                        <button
                          type="button"
                          onClick={() => setActiveView('forgot-password')}
                          style={{ border: 'none', background: 'transparent', color: 'var(--auth-accent, #D4AF37)', fontSize: '12px', cursor: 'pointer' }}
                        >
                          نسيت كلمة المرور؟
                        </button>
                      </div>
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••••••" required />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <Checkbox
                        label="تذكر جلستي على هذا الجهاز"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </div>

                    <Button variant="primary" size="lg" style={{ width: '100%', marginBottom: '16px' }}>
                      <span>دخول النظام</span>
                    </Button>
                  </form>
                </div>
              )}

              {/* REGISTER FORM */}
              {activeView === 'register' && (
                <div>
                  <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0' }}>
                    إنشاء حساب جديد
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--auth-text-secondary, #D4C9BC)', margin: '0 0 24px 0' }}>
                    انضم لمنظومة قاهرة كمهندس أو مصمم وابدأ العمل فوراً.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      triggerToast('تم إنشاء الحساب بنجاح!');
                    }}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        الاسم الكامل
                      </label>
                      <Input type="text" placeholder="م. وائل سعيد" required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        البريد المهني
                      </label>
                      <Input type="email" placeholder="wael@alwkala.com" required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        كلمة المرور
                      </label>
                      <Input type="password" placeholder="••••••••••••" required />
                    </div>

                    <Button variant="primary" size="lg" style={{ width: '100%' }}>
                      <span>إنشاء الحساب وبدء الاستخدام</span>
                    </Button>
                  </form>
                </div>
              )}

              {/* REGISTER 2 (Multi-Step Enterprise) */}
              {activeView === 'register-2' && (
                <div>
                  {/* Stepper Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--auth-border, rgba(212, 175, 55, 0.2))',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: step === 1 ? 700 : 500, color: step === 1 ? 'var(--auth-accent, #D4AF37)' : 'inherit' }}>
                      1. المنشأة
                    </span>
                    <span>—</span>
                    <span style={{ fontSize: '13px', fontWeight: step === 2 ? 700 : 500, color: step === 2 ? 'var(--auth-accent, #D4AF37)' : 'inherit' }}>
                      2. الدور والفريق
                    </span>
                    <span>—</span>
                    <span style={{ fontSize: '13px', fontWeight: step === 3 ? 700 : 500, color: step === 3 ? 'var(--auth-accent, #D4AF37)' : 'inherit' }}>
                      3. بيئة العمل
                    </span>
                  </div>

                  {step === 1 && (
                    <div>
                      <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0' }}>
                        معلومات المنشأة والنشاط
                      </h2>
                      <p style={{ fontSize: '13px', color: 'var(--auth-text-muted, #9E9081)', marginBottom: '20px' }}>
                        الخطوة 1 من 3: بيانات الشركة أو الاستوديو.
                      </p>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          اسم المنشأة
                        </label>
                        <Input type="text" placeholder="الوكالة للتكنولوجيا Alwkala" required />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          الموقع أو النطاق
                        </label>
                        <Input type="url" placeholder="https://alwkala.com" />
                      </div>

                      <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={() => setStep(2)}>
                        <span>المتابعة إلى الخطوة 2</span>
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0' }}>
                        الدور وحجم الفريق
                      </h2>
                      <p style={{ fontSize: '13px', color: 'var(--auth-text-muted, #9E9081)', marginBottom: '20px' }}>
                        الخطوة 2 من 3: تحديد الصلاحيات وحجم الفريق.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                        <div
                          onClick={() => setSelectedRole('engineer')}
                          style={{
                            padding: '12px',
                            borderRadius: '10px',
                            border: `1.5px solid ${selectedRole === 'engineer' ? 'var(--auth-accent, #D4AF37)' : 'var(--auth-border, rgba(212, 175, 55, 0.2))'}`,
                            cursor: 'pointer',
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '13px' }}>مهندس نظم / مطور</strong>
                          <span style={{ fontSize: '11px', color: 'var(--auth-text-muted, #9E9081)' }}>بناء المكونات</span>
                        </div>

                        <div
                          onClick={() => setSelectedRole('designer')}
                          style={{
                            padding: '12px',
                            borderRadius: '10px',
                            border: `1.5px solid ${selectedRole === 'designer' ? 'var(--auth-accent, #D4AF37)' : 'var(--auth-border, rgba(212, 175, 55, 0.2))'}`,
                            cursor: 'pointer',
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '13px' }}>معماري واجهات</strong>
                          <span style={{ fontSize: '11px', color: 'var(--auth-text-muted, #9E9081)' }}>حوكمة الرموز</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>السابق</Button>
                        <Button variant="primary" style={{ flex: 2 }} onClick={() => setStep(3)}>المتابعة</Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0' }}>
                        إعداد بيئة العمل
                      </h2>
                      <p style={{ fontSize: '13px', color: 'var(--auth-text-muted, #9E9081)', marginBottom: '20px' }}>
                        الخطوة 3 من 3: رابط مساحة العمل وبيانات الحساب.
                      </p>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          معرف مساحة العمل
                        </label>
                        <Input type="text" placeholder="alwkala" required />
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>السابق</Button>
                        <Button variant="primary" style={{ flex: 2 }} onClick={() => triggerToast('تمت تهيئة بيئة العمل المؤسسية بنجاح!')}>
                          إتمام التسجيل
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FORGOT PASSWORD */}
              {activeView === 'forgot-password' && (
                <div>
                  <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0' }}>
                    استعادة كلمة المرور
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--auth-text-secondary, #D4C9BC)', margin: '0 0 24px 0' }}>
                    أدخل بريدك الإلكتروني المسجل لنرسل لك رابط استعادة مشفراً.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      triggerToast('تم إرسال رابط الاستعادة إلى بريدك الإلكتروني بنجاح!');
                    }}
                  >
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        البريد المهني
                      </label>
                      <Input type="email" placeholder="wael@alwkala.com" required />
                    </div>

                    <Button variant="primary" size="lg" style={{ width: '100%', marginBottom: '16px' }}>
                      <span>إرسال رابط الاستعادة الآمن</span>
                    </Button>

                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setActiveView('login')}
                        style={{ border: 'none', background: 'transparent', color: 'var(--auth-accent, #D4AF37)', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}
                      >
                        العودة لتسجيل الدخول
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--auth-surface-card, #17120F)',
            border: '1px solid var(--auth-accent, #D4AF37)',
            color: 'var(--auth-text-primary, #FBF8F3)',
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
};

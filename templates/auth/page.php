<?php
/**
 * Qahera UI Kit — Extended Authentication Suite Template (League/Plates Template)
 * 
 * Supports Login, Standard Register, Multi-Step Enterprise Register (Register 2),
 * Session Lock Screen, and Password Reset.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string|null $error Optional error message
 * @var string $actionUrl Form submission URL
 */

$error = $error ?? null;
$actionUrl = $actionUrl ?? '#';
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="{
  theme: localStorage.getItem('qhr-theme') || 'dark',
  activeView: 'login', // 'login' | 'register' | 'register-2' | 'lock-screen' | 'forgot-password'
  showPassword: false,
  step: 1,
  selectedRole: 'engineer',
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('qhr-theme', this.theme);
  }
}" x-init="document.documentElement.setAttribute('data-theme', theme)">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بوابة قاهرة للمصادقة الممتدة — Qahera Extended Auth Suite</title>
  <meta name="description" content="منظومة المصادقة المتكاملة: تسجيل الدخول، إنشاء الحساب، التسجيل المؤسسي متعدد الخطوات، وشاشة تأمين الجلسة.">

  <!-- Tokens & Components CSS -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- Google Fonts: Cairo & El Messiri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=El+Messiri:wght@600;700&display=swap" rel="stylesheet">

  <!-- Alpine Core -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--auth-bg, var(--qhr-surface-page, #0A0806)); color: var(--auth-text-primary, var(--qhr-text-primary, #FBF8F3)); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); min-height: 100vh; display: flex; flex-direction: column;">

  <!-- 1. Top Navigation & Suite Switcher -->
  <header style="position: absolute; top: 0; inset-inline: 0; z-index: 100; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 36px; height: 36px; border-radius: 10px; background: var(--auth-accent, #D4AF37); color: #0A0806; font-weight: 800; font-family: 'El Messiri', serif; display: flex; align-items: center; justify-content: center;">
        ق
      </div>
      <span style="font-family: 'El Messiri', serif; font-size: 16px; font-weight: 700;">منظومة قاهرة للمصادقة</span>
    </div>

    <!-- View Switcher Tabs -->
    <div style="display: inline-flex; align-items: center; background: rgba(15, 11, 9, 0.85); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 9999px; padding: 4px; gap: 4px;">
      <button type="button" @click="activeView = 'login'" :style="activeView === 'login' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">تسجيل الدخول</button>
      <button type="button" @click="activeView = 'register'" :style="activeView === 'register' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">إنشاء حساب</button>
      <button type="button" @click="activeView = 'register-2'" :style="activeView === 'register-2' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">تسجيل مؤسسي</button>
      <button type="button" @click="activeView = 'lock-screen'" :style="activeView === 'lock-screen' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">شاشة القفل</button>
    </div>

    <!-- Theme Toggle -->
    <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">
      <span>تبديل المظهر</span>
    </button>
  </header>

  <!-- 2. Split-Screen Layout (Login, Register, Register-2) -->
  <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh;" x-show="activeView !== 'lock-screen'">
    
    <!-- Right Showcase Column -->
    <div style="padding: 64px 48px; display: flex; flex-direction: column; justify-content: space-between; border-inline-end: 1px solid rgba(212, 175, 55, 0.2); background: radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.12), transparent 70%);">
      <div style="margin-block: auto; max-width: 480px;">
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm" style="margin-bottom: 12px;">معايير آمنة معتمدة</span>
        <h1 style="font-family: 'El Messiri', serif; font-size: 34px; font-weight: 800; line-height: 1.35; margin: 0 0 16px 0;">
          بوابة الوصول الموحدة لنظم التصميم والمعايير الرقمية
        </h1>
        <p style="font-size: 15px; color: var(--qhr-text-secondary, #cbd5e1); line-height: 1.8;">
          تحكم كامل في إدارة الرموز التصميمية، عقود المكونات، والأنماط المعمارية مع حوكمة رقمية خالية من الانجراف المعجمي.
        </p>
      </div>

      <div style="font-size: 12px; color: var(--qhr-text-muted, #94a3b8);">
        © 2026 الوكالة Alwkala · كافة الحقوق محفوظة
      </div>
    </div>

    <!-- Left Form Column -->
    <div style="display: flex; align-items: center; justify-content: center; padding: 48px 24px; padding-top: 80px;">
      <div class="qhr-card" style="width: 100%; max-width: 460px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; padding: 36px;">
        
        <!-- View 1: Login -->
        <div x-show="activeView === 'login'">
          <h2 style="font-family: 'El Messiri', serif; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">تسجيل الدخول للمنظومة</h2>
          <p style="font-size: 14px; color: var(--qhr-text-secondary, #B9A896); margin: 0 0 24px 0;">أدخل بيانات الاعتماد المهنية للمتابعة.</p>

          <form action="<?= $this->e($actionUrl) ?>" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">البريد المهني أو المعرف</label>
              <?= $this->insert('qahera::input', ['name' => 'email', 'type' => 'email', 'placeholder' => 'name@organization.com', 'required' => true]) ?>
            </div>

            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">كلمة المرور</label>
              <?= $this->insert('qahera::input', ['name' => 'password', 'type' => 'password', 'placeholder' => '••••••••••••', 'required' => true]) ?>
            </div>

            <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--lg" style="width: 100%; margin-top: 8px;">
              <span>دخول النظام</span>
            </button>
          </form>
        </div>

        <!-- View 2: Register -->
        <div x-show="activeView === 'register'">
          <h2 style="font-family: 'El Messiri', serif; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">إنشاء حساب جديد</h2>
          <p style="font-size: 14px; color: var(--qhr-text-secondary, #B9A896); margin: 0 0 24px 0;">انضم لمنظومة قاهرة وابدأ العمل فوراً.</p>

          <form action="<?= $this->e($actionUrl) ?>" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">الاسم الكامل</label>
              <?= $this->insert('qahera::input', ['name' => 'name', 'placeholder' => 'م. وائل سعيد', 'required' => true]) ?>
            </div>

            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">البريد الإلكتروني المهني</label>
              <?= $this->insert('qahera::input', ['name' => 'email', 'type' => 'email', 'placeholder' => 'name@organization.com', 'required' => true]) ?>
            </div>

            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">كلمة المرور</label>
              <?= $this->insert('qahera::input', ['name' => 'password', 'type' => 'password', 'placeholder' => '••••••••••••', 'required' => true]) ?>
            </div>

            <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--lg" style="width: 100%; margin-top: 8px;">
              <span>إنشاء الحساب وبدء الاستخدام</span>
            </button>
          </form>
        </div>

        <!-- View 3: Register 2 (Multi-Step Enterprise) -->
        <div x-show="activeView === 'register-2'">
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 20px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 12px;">
            <span :style="step === 1 ? 'color: #D4AF37; font-weight: 700;' : ''">1. المنشأة</span>
            <span>—</span>
            <span :style="step === 2 ? 'color: #D4AF37; font-weight: 700;' : ''">2. الدور</span>
            <span>—</span>
            <span :style="step === 3 ? 'color: #D4AF37; font-weight: 700;' : ''">3. بيئة العمل</span>
          </div>

          <div x-show="step === 1">
            <h2 style="font-family: 'El Messiri', serif; font-size: 20px; font-weight: 700; margin: 0 0 6px 0;">معلومات المنشأة</h2>
            <p style="font-size: 13px; color: var(--qhr-text-muted, #94a3b8); margin-bottom: 16px;">الخطوة 1 من 3: بيانات المؤسسة.</p>
            <?= $this->insert('qahera::input', ['name' => 'org_name', 'placeholder' => 'اسم المنشأة أو الاستوديو']) ?>
            <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md" style="width: 100%; margin-top: 20px;" @click="step = 2">المتابعة للخطوة 2</button>
          </div>

          <div x-show="step === 2">
            <h2 style="font-family: 'El Messiri', serif; font-size: 20px; font-weight: 700; margin: 0 0 6px 0;">الدور وحجم الفريق</h2>
            <p style="font-size: 13px; color: var(--qhr-text-muted, #94a3b8); margin-bottom: 16px;">الخطوة 2 من 3: تحديد الصلاحيات.</p>
            <div style="display: flex; gap: 10px;">
              <button type="button" class="qhr-btn qhr-btn--secondary" style="flex: 1;" @click="step = 1">السابق</button>
              <button type="button" class="qhr-btn qhr-btn--primary" style="flex: 2;" @click="step = 3">المتابعة</button>
            </div>
          </div>

          <div x-show="step === 3">
            <h2 style="font-family: 'El Messiri', serif; font-size: 20px; font-weight: 700; margin: 0 0 6px 0;">بيئة العمل السيادية</h2>
            <p style="font-size: 13px; color: var(--qhr-text-muted, #94a3b8); margin-bottom: 16px;">الخطوة 3 من 3: إتمام الإعداد.</p>
            <?= $this->insert('qahera::input', ['name' => 'workspace_slug', 'placeholder' => 'معرف مساحة العمل']) ?>
            <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md" style="width: 100%; margin-top: 20px;">إتمام التسجيل</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- 3. Lock Screen Layout -->
  <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px;" x-show="activeView === 'lock-screen'">
    <div class="qhr-card" style="width: 100%; max-width: 440px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 24px; padding: 40px; text-align: center;">
      <div style="width: 88px; height: 88px; border-radius: 50%; background: #D4AF37; color: #0A0806; font-family: 'El Messiri', serif; font-size: 32px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
        و
      </div>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; font-weight: 700; margin: 0 0 4px 0;">م. وائل سعيد</h2>
      <p style="font-size: 13px; color: var(--qhr-text-muted, #94a3b8); margin: 0 0 20px 0;">مهندس نظم أول · استوديو الوكالة</p>

      <form action="<?= $this->e($actionUrl) ?>" method="POST">
        <?= $this->insert('qahera::input', ['name' => 'pin', 'type' => 'password', 'placeholder' => 'كلمة المرور أو رمز PIN']) ?>
        <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--lg" style="width: 100%; margin-top: 16px;">إلغاء قفل الجلسة</button>
      </form>
    </div>
  </main>

</body>
</html>

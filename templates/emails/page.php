<?php
/**
 * Qahera UI Kit — Transactional Email Suite (League/Plates Template)
 * 
 * Demonstrates 6 email templates: Welcome, Verify, Password, User Update, Expired Card, Closed Account.
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="{
  theme: localStorage.getItem('qhr-theme') || 'dark',
  activeTemplate: 'welcome',
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('qhr-theme', this.theme);
  }
}" x-init="document.documentElement.setAttribute('data-theme', theme)">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>حزمة قوالب البريد المعاملاتية — Qahera Emails</title>

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
<body style="background-color: var(--qhr-surface-page, #0A0806); color: var(--qhr-text-primary, #FBF8F3); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); min-height: 100vh;">

  <!-- Navbar -->
  <header class="qhr-navbar" style="background: var(--qhr-surface-card, #14100C); border-bottom: 1px solid rgba(212,175,55,0.2);">
    <div class="qhr-navbar-container">
      <a href="#" class="qhr-navbar-brand">
        <span class="qhr-avatar qhr-avatar--rounded qhr-avatar--sm" style="background: #D4AF37; color: #0A0806; font-weight: 800; font-family: 'El Messiri', serif;">ق</span>
        <span>حزمة قوالب البريد الإلكتروني (Email Suite)</span>
      </a>
      <div class="qhr-navbar-actions">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1200px; margin-inline: auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 40px;">
    
    <!-- Header Hero -->
    <div style="background: var(--qhr-surface-card, #14100C); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 24px;">
      <h1 style="font-family: 'El Messiri', serif; font-size: 24px; color: #D4AF37; margin: 0 0 8px;">
        منظومة رسائل البريد الإلكتروني المعاملاتية
      </h1>
      <p style="color: var(--qhr-text-secondary, #D5C9BC); margin: 0;">
        قوالب متوافقة مع عملاء البريد الإلكتروني الرئيسيين (Gmail, Outlook, Apple Mail) مع دعم كامل للاتجاه RTL والنمط الملكي المعتمد.
      </p>
    </div>

    <!-- Template Selector Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
      
      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'welcome'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">رسالة الترحيب (Welcome)</h3>
          <span class="qhr-badge qhr-badge--primary qhr-badge--xs">01</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">ترحيب بالعضو الجديد وتعريفه بأبرز مزايا المنظومة المعمارية.</p>
        </div>
      </div>

      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'verify'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">تأكيد البريد (Verify OTP)</h3>
          <span class="qhr-badge qhr-badge--primary qhr-badge--xs">02</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">إرسال الرمز السداسي اللحظي وتأكيد البريد بنقرة واحدة.</p>
        </div>
      </div>

      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'password'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">تغيير كلمة المرور (Password)</h3>
          <span class="qhr-badge qhr-badge--warning qhr-badge--xs">03</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">تنبيه أمان بجلسة التغيير وعنوان IP وزر التأمين الفوري.</p>
        </div>
      </div>

      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'update'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">تحديث البيانات (User Update)</h3>
          <span class="qhr-badge qhr-badge--primary qhr-badge--xs">04</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">ملخص بالحقول والبيانات المعدلة في ملف المستخدم.</p>
        </div>
      </div>

      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'expired-card'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">انتهاء البطاقة (Expired Card)</h3>
          <span class="qhr-badge qhr-badge--danger qhr-badge--xs">05</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">تنبيه انتهاء بطاقة الدفع قبل موعد التجديد التلقائي.</p>
        </div>
      </div>

      <div class="qhr-box qhr-box--md" style="cursor: pointer;" @click="activeTemplate = 'closed-account'">
        <div class="qhr-box-header">
          <h3 class="qhr-box-title">إغلاق الحساب (Closed Account)</h3>
          <span class="qhr-badge qhr-badge--secondary qhr-badge--xs">06</span>
        </div>
        <div class="qhr-box-body">
          <p style="margin: 0; font-size: 13px;">تأكيد تعطيل الحساب مع مهلة 30 يوماً للاسترجاع.</p>
        </div>
      </div>

    </div>

  </main>
</body>
</html>

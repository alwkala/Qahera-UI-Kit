<?php
/**
 * Qahera UI Kit — Modular Widgets Suite (League/Plates Template)
 * 
 * Demonstrates Statistic, Chart, Social, Weather, Blog, and List Widgets.
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="{
  theme: localStorage.getItem('qhr-theme') || 'dark',
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('qhr-theme', this.theme);
  }
}" x-init="document.documentElement.setAttribute('data-theme', theme)">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>حزمة الودجات المعيارية — Qahera Widgets</title>

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
        <span>حزمة الودجات والبطاقات المعيارية (Widgets Suite)</span>
      </a>
      <div class="qhr-navbar-actions">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1400px; margin-inline: auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 40px;">
    
    <!-- Statistic Widgets -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; color: #D4AF37; margin-bottom: 16px;">1. الودجات الإحصائية (Statistic Widgets)</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div class="qhr-box qhr-box--md">
          <div class="qhr-box-header">
            <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">إجمالي الإيرادات</span>
            <span class="qhr-badge qhr-badge--primary qhr-badge--xs">+١٤.٢٪</span>
          </div>
          <div class="qhr-box-body">
            <div style="font-family: 'El Messiri', serif; font-size: 28px; font-weight: 800; color: #D4AF37;">١٨٤,٢٠٠ ر.س</div>
          </div>
        </div>

        <div class="qhr-box qhr-box--md">
          <div class="qhr-box-header">
            <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">الأعضاء النشطين</span>
            <span class="qhr-badge qhr-badge--success qhr-badge--xs">+٨.٤٪</span>
          </div>
          <div class="qhr-box-body">
            <div style="font-family: 'El Messiri', serif; font-size: 28px; font-weight: 800;">٤٢,٨٥٠ عضو</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Weather Widget -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; color: #D4AF37; margin-bottom: 16px;">2. ودجة الأرصاد الجوية (Weather Widget)</h2>
      <div class="qhr-box qhr-box--lg" style="max-width: 600px;">
        <div class="qhr-box-header">
          <div>
            <h3 class="qhr-box-title">القاهرة، جمهورية مصر العربية</h3>
            <span style="font-size: 12px; color: var(--qhr-text-muted, #9E9081);">مشمس وصافٍ بوجه عام</span>
          </div>
          <span class="qhr-badge qhr-badge--primary qhr-badge--xs">العاصمة</span>
        </div>
        <div class="qhr-box-body" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-family: 'El Messiri', serif; font-size: 52px; font-weight: 800; color: #D4AF37;">31°</div>
          <div style="font-size: 13px; color: var(--qhr-text-secondary, #D5C9BC);">
            <div>الرطوبة: 46%</div>
            <div>سرعة الرياح: 18 كم/س</div>
          </div>
        </div>
      </div>
    </section>

  </main>
</body>
</html>

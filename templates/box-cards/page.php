<?php
/**
 * Qahera UI Kit — Box Cards Suite (League/Plates Template)
 * 
 * Demonstrates Basic Box, Advanced Box, Box Color, and Group Box.
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
  <title>حزمة الصناديق والبطاقات — Qahera Box Cards</title>

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
  <header class="qhr-navbar" style="background: var(--qhr-surface-card, #130F0B); border-bottom: 1px solid rgba(212,175,55,0.2);">
    <div class="qhr-navbar-container">
      <a href="#" class="qhr-navbar-brand">
        <span class="qhr-avatar qhr-avatar--rounded qhr-avatar--sm" style="background: #D4AF37; color: #0A0806; font-weight: 800; font-family: 'El Messiri', serif;">ق</span>
        <span>حزمة الصناديق والبطاقات (Box Cards)</span>
      </a>
      <div class="qhr-navbar-actions">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1360px; margin-inline: auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 40px;">
    
    <!-- 1. Basic Box Section -->
    <section id="basic-box">
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; margin-bottom: 16px; color: #D4AF37;">1. الصناديق الأساسية (Basic Box)</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div class="qhr-box qhr-box--outline qhr-box--md">
          <div class="qhr-box-header">
            <h3 class="qhr-box-title">Outline Box</h3>
            <span class="qhr-badge qhr-badge--primary qhr-badge--xs">محدد</span>
          </div>
          <div class="qhr-box-body">
            <p style="margin: 0; font-size: 14px;">صندوق قياسي بنمط الإطار المفرغ الأنيق.</p>
          </div>
          <div class="qhr-box-footer">
            <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--sm">التفاصيل</button>
          </div>
        </div>

        <div class="qhr-box qhr-box--elevated qhr-box--md">
          <div class="qhr-box-header">
            <h3 class="qhr-box-title">Elevated Box</h3>
            <span class="qhr-badge qhr-badge--outline qhr-badge--xs">عائم</span>
          </div>
          <div class="qhr-box-body">
            <p style="margin: 0; font-size: 14px;">صندوق مرتفع بظلال ناعمة متعددة الطبقات.</p>
          </div>
          <div class="qhr-box-footer">
            <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm">إجراء</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Box Color Section -->
    <section id="box-color">
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; margin-bottom: 16px; color: #D4AF37;">2. الصناديق الدلالية (Box Color)</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div class="qhr-box qhr-box--color-primary qhr-box--accent-top qhr-box--md">
          <div class="qhr-box-header">
            <h3 class="qhr-box-title" style="color: #D4AF37;">صندوق ذهبي فاخر</h3>
            <span class="qhr-badge qhr-badge--primary qhr-badge--xs">Primary</span>
          </div>
          <div class="qhr-box-body">
            <p style="margin: 0; font-size: 14px;">شريط علوي بارز بلون الذهب الملكي.</p>
          </div>
        </div>

        <div class="qhr-box qhr-box--color-success qhr-box--accent-top qhr-box--md">
          <div class="qhr-box-header">
            <h3 class="qhr-box-title" style="color: #10B981;">صندوق النجاح والاعتماد</h3>
            <span class="qhr-badge qhr-badge--success qhr-badge--xs">Success</span>
          </div>
          <div class="qhr-box-body">
            <p style="margin: 0; font-size: 14px;">تأكيد نجاح العمليات والاعتمادات الرسمية.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Group Box Section -->
    <section id="group-box">
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; margin-bottom: 16px; color: #D4AF37;">3. مجموعات الصناديق المتصلة (Group Box)</h2>
      <div class="qhr-box-group">
        <div class="qhr-box qhr-box--md">
          <div class="qhr-box-header">
            <span style="font-size: 12px; color: #9E9081;">الإيرادات</span>
            <span class="qhr-badge qhr-badge--primary qhr-badge--xs">+١٤٪</span>
          </div>
          <div class="qhr-box-body">
            <div style="font-family: 'El Messiri', serif; font-size: 22px; font-weight: 800; color: #D4AF37;">١٨٤,٢٠٠ ر.س</div>
          </div>
        </div>
        <div class="qhr-box qhr-box--md">
          <div class="qhr-box-header">
            <span style="font-size: 12px; color: #9E9081;">الطلبات</span>
            <span class="qhr-badge qhr-badge--success qhr-badge--xs">+٩٪</span>
          </div>
          <div class="qhr-box-body">
            <div style="font-family: 'El Messiri', serif; font-size: 22px; font-weight: 800; color: #D4AF37;">١,٤٢٨ طلب</div>
          </div>
        </div>
      </div>
    </section>

  </main>
</body>
</html>

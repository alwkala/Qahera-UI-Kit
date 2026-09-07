<?php
/**
 * Qahera UI Kit — Data Visualization & Analytics Charts Suite (League/Plates Template)
 * 
 * Demonstrates Chart.js, Morris smooth visuals, Flot telemetry, Inline sparklines, and Peity micro-charts.
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
  <title>حزمة الرسوم البيانية والتحليلات — Qahera Charts Suite</title>

  <!-- Tokens & Components CSS -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- Google Fonts: Cairo & El Messiri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=El+Messiri:wght@600;700&display=swap" rel="stylesheet">

  <!-- Alpine Core & Chart.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
</head>
<body style="background-color: var(--ch-bg, var(--qhr-surface-page, #0A0806)); color: var(--ch-text-primary, var(--qhr-text-primary, #FBF8F3)); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); min-height: 100vh;">

  <!-- Navbar -->
  <header class="qhr-navbar" style="background: var(--qhr-surface-card, #17120F); border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
    <div class="qhr-navbar-container">
      <a href="#" class="qhr-navbar-brand">
        <span class="qhr-avatar qhr-avatar--rounded qhr-avatar--sm" style="background: #D4AF37; color: #0A0806; font-weight: 800;">ق</span>
        <span>حزمة الرسوم البيانية والتحليلات</span>
      </a>
      <div class="qhr-navbar-actions">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1440px; margin-inline: auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 40px;">
    
    <!-- Section: Inline Sparklines & KPIs -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; margin-bottom: 16px;">مؤشرات الأداء مع الرسوم المدمجة (Sparklines)</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        
        <div class="qhr-card" style="padding: 20px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px;">
          <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">إجمالي المبيعات</span>
          <div style="font-family: 'El Messiri', serif; font-size: 26px; font-weight: 800; color: #D4AF37; margin: 4px 0 12px;">١٨٤,٢٠٠ ر.س</div>
          <!-- Sparkline -->
          <svg width="100%" height="32" viewBox="0 0 120 32">
            <path d="M0,28 L20,22 L40,24 L60,12 L80,16 L100,6 L120,2" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </div>

        <div class="qhr-card" style="padding: 20px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px;">
          <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">الطلبات النشطة</span>
          <div style="font-family: 'El Messiri', serif; font-size: 26px; font-weight: 800; color: #D4AF37; margin: 4px 0 12px;">١,٤٢٨ طلب</div>
          <!-- Mini Bar Stack -->
          <svg width="100%" height="32" viewBox="0 0 120 32">
            <rect x="0" y="14" width="12" height="18" rx="2" fill="#D4AF37" />
            <rect x="20" y="8" width="12" height="24" rx="2" fill="#D4AF37" />
            <rect x="40" y="16" width="12" height="16" rx="2" fill="#D4AF37" />
            <rect x="60" y="4" width="12" height="28" rx="2" fill="#D4AF37" />
            <rect x="80" y="10" width="12" height="22" rx="2" fill="#D4AF37" />
            <rect x="100" y="2" width="12" height="30" rx="2" fill="#D4AF37" />
          </svg>
        </div>

      </div>
    </section>

    <!-- Section: Peity Micro-Charts -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; margin-bottom: 16px;">المصغرات الرشيقة (Peity Micro-Charts)</h2>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div class="qhr-card" style="padding: 14px 20px; display: flex; align-items: center; gap: 12px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px;">
          <span style="font-size: 13px;">اكتمال الربع:</span>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(212, 175, 55, 0.3)" stroke-width="2" />
            <path d="M16,16 L16,2 A14,14 0 0,1 30,16 Z" fill="#D4AF37" />
          </svg>
        </div>

        <div class="qhr-card" style="padding: 14px 20px; display: flex; align-items: center; gap: 12px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px;">
          <span style="font-size: 13px;">إنجاز النصف:</span>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(212, 175, 55, 0.3)" stroke-width="2" />
            <path d="M16,16 L16,2 A14,14 0 0,1 16,30 Z" fill="#10B981" />
          </svg>
        </div>

        <div class="qhr-card" style="padding: 14px 20px; display: flex; align-items: center; gap: 12px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px;">
          <span style="font-size: 13px;">جاهزية (٨٥٪):</span>
          <svg width="24" height="24" viewBox="0 0 32 32" style="transform: rotate(-90deg);">
            <circle cx="16" cy="16" r="12" fill="transparent" stroke="rgba(255,255,255,0.1)" stroke-width="4" />
            <circle cx="16" cy="16" r="12" fill="transparent" stroke="#3B82F6" stroke-width="4" stroke-dasharray="64 75.4" />
          </svg>
        </div>
      </div>
    </section>

  </main>

  <?= $this->insert('qahera::back-to-top', ['variant' => 'luxury']) ?>

</body>
</html>

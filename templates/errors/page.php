<?php
/**
 * Qahera UI Kit — System Status & Error Suite Template (League/Plates Template)
 * 
 * Renders 404 (Not Found), 500 (Internal Server Error), or Maintenance (Scheduled Downtime).
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $errorCode Error status code ('404', '500', 'maintenance')
 */

$errorCode = $errorCode ?? '404';
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="{
  theme: localStorage.getItem('qhr-theme') || 'dark',
  activeView: '<?= $this->e($errorCode) ?>',
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('qhr-theme', this.theme);
  }
}" x-init="document.documentElement.setAttribute('data-theme', theme)">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>حالة النظام — Qahera Error Suite</title>

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
<body style="background-color: var(--err-bg, var(--qhr-surface-page, #0A0806)); color: var(--err-text-primary, var(--qhr-text-primary, #FBF8F3)); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); min-height: 100vh; display: flex; flex-direction: column;">

  <!-- Top Suite Navigation -->
  <header style="padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 36px; height: 36px; border-radius: 10px; background: #D4AF37; color: #0A0806; font-weight: 800; font-family: 'El Messiri', serif; display: flex; align-items: center; justify-content: center;">ق</div>
      <span style="font-family: 'El Messiri', serif; font-size: 16px; font-weight: 700;">منظومة حالات النظام</span>
    </div>

    <div style="display: inline-flex; align-items: center; background: rgba(15, 11, 9, 0.85); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 9999px; padding: 4px; gap: 4px;">
      <button type="button" @click="activeView = '404'" :style="activeView === '404' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">404</button>
      <button type="button" @click="activeView = '500'" :style="activeView === '500' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">500</button>
      <button type="button" @click="activeView = 'maintenance'" :style="activeView === 'maintenance' ? 'background: #D4AF37; color: #0A0806; font-weight: 700; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;' : 'background: transparent; color: inherit; border-radius: 9999px; padding: 6px 14px; border: none; cursor: pointer;'">الصيانة</button>
    </div>

    <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
  </header>

  <!-- Main Stage -->
  <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 24px;">
    <div class="qhr-card" style="width: 100%; max-width: 640px; background: var(--qhr-surface-card, #17120F); border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 24px; padding: 48px; text-align: center;">
      
      <!-- 404 View -->
      <div x-show="activeView === '404'">
        <div style="font-family: 'El Messiri', serif; font-size: 84px; font-weight: 800; color: #D4AF37; line-height: 1; margin-bottom: 12px;">404</div>
        <h1 style="font-family: 'El Messiri', serif; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">الصفحة المطلوبة غير موجودة</h1>
        <p style="font-size: 15px; color: var(--qhr-text-secondary, #B9A896); margin-bottom: 24px; line-height: 1.7;">
          تعذر العثور على المسار المطلوب. قد يكون الرابط خاطئاً أو تم أرشفته.
        </p>
        <a href="/" class="qhr-btn qhr-btn--primary qhr-btn--md">العودة للرئيسية</a>
      </div>

      <!-- 500 View -->
      <div x-show="activeView === '500'">
        <div style="font-family: 'El Messiri', serif; font-size: 84px; font-weight: 800; color: var(--qhr-color-danger-500, #ef4444); line-height: 1; margin-bottom: 12px;">500</div>
        <h1 style="font-family: 'El Messiri', serif; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">تعطل مؤقت في معالجة استجابة الخادم</h1>
        <p style="font-size: 15px; color: var(--qhr-text-secondary, #B9A896); margin-bottom: 24px; line-height: 1.7;">
          نواجه صعوبة فنية مؤقتة. يعمل فريق الدعم على معالجة المشكلة فوراً.
        </p>
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md" onclick="window.location.reload()">إعادة المحاولة</button>
      </div>

      <!-- Maintenance View -->
      <div x-show="activeView === 'maintenance'">
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm" style="margin-bottom: 16px;">أعمال صيانة دورية</span>
        <h1 style="font-family: 'El Messiri', serif; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">المنظومة تخضع للترقية والتحسين</h1>
        <p style="font-size: 15px; color: var(--qhr-text-secondary, #B9A896); margin-bottom: 24px; line-height: 1.7;">
          نقوم بترقية قواعد البيانات ونشر التحديثات البرمجية الجديدة لضمان أعلى أداء.
        </p>
        <div style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">سنعود للعمل بكامل طاقتنا في أقرب وقت.</div>
      </div>

    </div>
  </main>

</body>
</html>

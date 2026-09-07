<?php
/**
 * Qahera UI Kit — Tables & Data Grid Suite (League/Plates Template)
 * 
 * Demonstrates Basic Tables, Data Tables (sorting/searching), and Editable Tables.
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
  <title>منظومة الجداول والشبكات البيانية — Qahera Tables</title>

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
        <span>منظومة الجداول والشبكات (Tables Suite)</span>
      </a>
      <div class="qhr-navbar-actions">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()">تبديل المظهر</button>
      </div>
    </div>
  </header>

  <main style="max-width: 1400px; margin-inline: auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 40px;">
    
    <!-- 1. Basic Tables -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; color: #D4AF37; margin-bottom: 16px;">1. الجداول الأساسية المخططة (Basic Striped Table)</h2>
      <div class="qhr-table-container" style="background: var(--qhr-surface-card, #17120E); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; overflow: hidden;">
        <table class="qhr-table qhr-table--striped">
          <thead>
            <tr>
              <th>المعرف</th>
              <th>الجهة / العميل</th>
              <th>القطاع</th>
              <th>القيمة</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#INV-101</strong></td>
              <td>دار المعمار الفاطمي</td>
              <td>تراث وعمران</td>
              <td><strong style="color: #D4AF37;">١٨٥,٠٠٠ ر.س</strong></td>
              <td><span class="qhr-badge qhr-badge--success qhr-badge--xs">نشط</span></td>
            </tr>
            <tr>
              <td><strong>#INV-102</strong></td>
              <td>مجموعة الفلك الملكية</td>
              <td>مقتنيات فاخرة</td>
              <td><strong style="color: #D4AF37;">٣٤٠,٠٠٠ ر.س</strong></td>
              <td><span class="qhr-badge qhr-badge--success qhr-badge--xs">نشط</span></td>
            </tr>
            <tr>
              <td><strong>#INV-103</strong></td>
              <td>عقد المشربية التوزيعي</td>
              <td>سلاسل إمداد</td>
              <td><strong style="color: #D4AF37;">٩٢,٤٠٠ ر.س</strong></td>
              <td><span class="qhr-badge qhr-badge--warning qhr-badge--xs">معلق</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 2. Data Tables Summary -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; color: #D4AF37; margin-bottom: 16px;">2. جداول البيانات التفاعلية (Data Tables)</h2>
      <div style="background: var(--qhr-surface-card, #17120E); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 24px;">
        <p style="margin: 0; color: var(--qhr-text-secondary, #D5C9BC);">
          تتضمن معمارية جداول البيانات التفاعلية فرزاً لحظياً لجميع الأعمدة، بحثاً فورياً وتصفية نصية، وتحديداً متعدداً للصفوف مع شريط عمليات مجمعة (Bulk Actions Bar)، وترقيماً مرناً للصفحات.
        </p>
      </div>
    </section>

    <!-- 3. Editable Tables Summary -->
    <section>
      <h2 style="font-family: 'El Messiri', serif; font-size: 22px; color: #D4AF37; margin-bottom: 16px;">3. الجداول القابلة للتعديل اللحظي (Editable Tables)</h2>
      <div style="background: var(--qhr-surface-card, #17120E); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 24px;">
        <p style="margin: 0; color: var(--qhr-text-secondary, #D5C9BC);">
          تدعم التعديل الفوري لمحتوى الخلايا والصفوف مع نمط الحفظ والإلغاء وإضافة سجلات جديدة لحظياً، مع إشعارات تأكيد واسترجاع الحذف (Undo Toasts).
        </p>
      </div>
    </section>

  </main>
</body>
</html>

<?php
/**
 * Qahera UI Kit — Luxury Boutique Shop Page with Sidebar Navigation (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="{
  theme: localStorage.getItem('qhr-theme') || 'dark',
  init() {
    document.documentElement.setAttribute('data-theme', this.theme);
  },
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('qhr-theme', this.theme);
  }
}" x-init="init()">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>متجر المقتنيات الملكية — Qahera Luxury Shop</title>
  <meta name="description" content="متجر المقتنيات الفاخرة مع نظام تصفية جانبي شامل ودقيق للتصنيف، السعر، الألوان والخامات، المقاسات، ودور الصياغة.">

  <!-- Tokens & Components CSS -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- Google Fonts: Cairo & El Messiri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=El+Messiri:wght@600;700&display=swap" rel="stylesheet">

  <!-- Alpine Behavior Modules -->
  <script defer src="../../behavior/back-to-top.js"></script>
  <script defer src="../../behavior/navbar.js"></script>
  <script defer src="../../behavior/dropdown.js"></script>

  <!-- Alpine Core -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--shop-bg, var(--qhr-surface-page, #0A0806)); color: var(--shop-text-primary, var(--qhr-text-primary, #FBF8F3)); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); overflow-x: hidden;">

  <!-- 1. Navbar -->
  <?= $this->insert('qahera::navbar', [
      'brand' => 'قاهرة للمقتنيات الفاخرة',
      'links' => [
          ['label' => 'المتجر الشامل', 'href' => '#', 'active' => true],
          ['label' => 'الخواتم الملكية', 'href' => '#'],
          ['label' => 'الأساور والمصوغات', 'href' => '#'],
          ['label' => 'صالات العرض', 'href' => '#'],
      ]
  ]) ?>

  <!-- 2. Main Layout with Sidebar -->
  <div style="max-width: 1440px; margin-inline: auto; padding-inline: var(--qhr-space-6, 24px); padding-block: var(--qhr-space-8, 32px); display: grid; grid-template-columns: 290px 1fr; gap: var(--qhr-space-8, 32px);">
    
    <!-- Sidebar Navigation & Filters -->
    <aside style="background: var(--shop-surface, var(--qhr-surface-card, #17120F)); border: 1px solid var(--shop-border, rgba(212, 175, 55, 0.2)); border-radius: var(--qhr-radius-xl, 20px); padding: var(--qhr-space-6, 24px); height: fit-content;">
      <h2 style="font-family: var(--qhr-font-family-display, 'El Messiri', serif); font-size: 18px; font-weight: 700; margin-block-start: 0; margin-block-end: var(--qhr-space-4, 16px);">
        تصفية المقتنيات
      </h2>

      <!-- Categories -->
      <div style="margin-block-end: var(--qhr-space-6, 24px);">
        <h3 style="font-size: 14px; font-weight: 700; margin-block-end: var(--qhr-space-2, 8px);">التصنيف</h3>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
          <li><a href="#" style="color: var(--shop-accent, #D4AF37); text-decoration: none; font-weight: 700;">كافة المقتنيات (12)</a></li>
          <li><a href="#" style="color: var(--qhr-text-secondary, #B9A896); text-decoration: none;">الخواتم الملكية (4)</a></li>
          <li><a href="#" style="color: var(--qhr-text-secondary, #B9A896); text-decoration: none;">الأساور والمصوغات (3)</a></li>
          <li><a href="#" style="color: var(--qhr-text-secondary, #B9A896); text-decoration: none;">السلاسل والقلائد (3)</a></li>
          <li><a href="#" style="color: var(--qhr-text-secondary, #B9A896); text-decoration: none;">الساعات والتحف (2)</a></li>
        </ul>
      </div>

      <!-- Price -->
      <div style="margin-block-end: var(--qhr-space-6, 24px);">
        <h3 style="font-size: 14px; font-weight: 700; margin-block-end: var(--qhr-space-2, 8px);">نطاق السعر</h3>
        <input type="range" min="300" max="5000" value="5000" style="width: 100%;">
      </div>

      <!-- Brands -->
      <div>
        <h3 style="font-size: 14px; font-weight: 700; margin-block-end: var(--qhr-space-2, 8px);">دور الصياغة</h3>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
          <label><input type="checkbox" checked> دار قاهرة الفاخرة</label>
          <label><input type="checkbox" checked> الحولي للأحجار الكريمة</label>
          <label><input type="checkbox" checked> ورشة الصاغة التراثية</label>
          <label><input type="checkbox" checked> النيل للأوبسيديان</label>
        </div>
      </div>
    </aside>

    <!-- Content Catalog Grid -->
    <main>
      <div style="margin-block-end: var(--qhr-space-6, 24px); display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-family: var(--qhr-font-family-display, 'El Messiri', serif); font-size: 26px; font-weight: 800; margin: 0;">
          متجر المقتنيات الملكية
        </h1>
        <?= $this->insert('qahera::patterns/search-toolbar') ?>
      </div>

      <!-- Product Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--qhr-space-6, 24px); margin-block-end: var(--qhr-space-12, 48px);">
        <?= $this->insert('qahera::patterns/luxury-product-card', [
            'title' => 'خاتم الأفق الذهبي عيار 18',
            'collection' => 'دار قاهرة الفاخرة',
            'price' => '1,850 ر.س',
            'badgeText' => 'ستيل 316L',
            'material' => 'Steel 316L · مطلي ذهب PVD',
        ]) ?>
        <?= $this->insert('qahera::patterns/luxury-product-card', [
            'title' => 'سوار النيل الملكي المنقوش',
            'collection' => 'الحولي للأحجار الكريمة',
            'price' => '1,450 ر.س',
            'badgeText' => 'مقاوم للماء',
            'material' => 'Steel 316L · صقل مصمت',
        ]) ?>
        <?= $this->insert('qahera::patterns/luxury-product-card', [
            'title' => 'قلادة المشربية الفاطمية',
            'collection' => 'ورشة الصاغة التراثية',
            'price' => '2,100 ر.س',
            'badgeText' => 'صناعة يدوية',
            'material' => 'Steel 316L · طلاء ذهب 18K',
        ]) ?>
        <?= $this->insert('qahera::patterns/luxury-product-card', [
            'title' => 'سوار الهيبة الأوبسيدياني',
            'collection' => 'النيل للأوبسيديان',
            'price' => '1,250 ر.س',
            'badgeText' => 'أوبسيديان بركاني',
            'material' => 'Obsidian & Steel 316L',
        ]) ?>
      </div>

      <!-- Pagination -->
      <div style="display: flex; justify-content: center;">
        <?= $this->insert('qahera::patterns/pagination') ?>
      </div>
    </main>

  </div>

  <!-- Back To Top -->
  <?= $this->insert('qahera::back-to-top', ['variant' => 'luxury']) ?>

</body>
</html>

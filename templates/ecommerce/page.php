<?php
/**
 * Qahera UI Kit — Luxury E-Commerce Page (League/Plates Template)
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
  <title>كتالوج المقتنيات الملكية — Qahera Luxury E-Commerce</title>
  <meta name="description" content="كتالوج المقتنيات والمجوهرات الفاخرة — مصاغة من فولاذ 316L ومطلية بالذهب عيار 18 المقاوم للصدأ والتلاشي مدى الحياة.">

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
<body style="background-color: var(--eco-bg, var(--qhr-surface-page, #0A0806)); color: var(--eco-text-primary, var(--qhr-text-primary, #FBF8F3)); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); overflow-x: hidden;">

  <!-- 1. Navbar -->
  <?= $this->insert('qahera::navbar', [
      'brand' => 'قاهرة للمقتنيات الفاخرة',
      'links' => [
          ['label' => 'كافة المقتنيات', 'href' => '#catalog', 'active' => true],
          ['label' => 'المجموعات الحصرية', 'href' => '#catalog'],
          ['label' => 'صالات العرض', 'href' => '#stores'],
          ['label' => 'نادي الصفوة VIP', 'href' => '#vip'],
      ]
  ]) ?>

  <!-- 2. Catalog Main -->
  <main id="catalog" style="max-width: 1280px; margin-inline: auto; padding: var(--qhr-space-10, 40px) var(--qhr-space-6, 24px);">
    <div style="margin-block-end: var(--qhr-space-8, 32px);">
      <h1 style="font-family: var(--qhr-font-family-display, 'El Messiri', serif); font-size: clamp(28px, 4vw, 40px); font-weight: 800; margin-block-end: var(--qhr-space-2, 8px);">
        كتالوج المقتنيات والمجوهرات الملكية
      </h1>
      <p style="color: var(--qhr-text-secondary, #B9A896); font-size: 16px; line-height: 1.8;">
        تشكيلة مصاغة من فولاذ 316L ومطلية بالذهب عيار 18 المقاوم للصدأ والتلاشي مدى الحياة.
      </p>
    </div>

    <!-- Search Toolbar Pattern -->
    <div style="margin-block-end: var(--qhr-space-5, 20px);">
      <?= $this->insert('qahera::patterns/search-toolbar', [
          'placeholder' => 'ابحث بالاسم، الخامة، أو رقم الإصدار...',
          'categories' => [
              ['value' => 'all', 'label' => 'كافة التصنيفات'],
              ['value' => 'rings', 'label' => 'الخواتم الملكية'],
              ['value' => 'bracelets', 'label' => 'الأساور'],
              ['value' => 'necklaces', 'label' => 'القلائد'],
          ]
      ]) ?>
    </div>

    <!-- Filter Bar Pattern -->
    <div style="margin-block-end: var(--qhr-space-8, 32px);">
      <?= $this->insert('qahera::patterns/filter-bar') ?>
    </div>

    <!-- Products Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: var(--qhr-space-6, 24px); margin-block-end: var(--qhr-space-12, 48px);">
      <?= $this->insert('qahera::patterns/luxury-product-card', [
          'title' => 'خاتم الأفق الذهبي عيار 18',
          'collection' => 'مجموعة القاهرة الحصرية',
          'price' => '1,850 ر.س',
          'originalPrice' => '2,200 ر.س',
          'badgeText' => 'ستيل 316L مقاوم للصدأ',
          'material' => 'Steel 316L · مطلي ذهب PVD',
      ]) ?>
      <?= $this->insert('qahera::patterns/luxury-product-card', [
          'title' => 'سوار النيل الملكي المنقوش',
          'collection' => 'إصدار محدود',
          'price' => '1,450 ر.س',
          'badgeText' => 'مقاوم للماء والعطور',
          'material' => 'Steel 316L · لمسة غير لامعة',
      ]) ?>
      <?= $this->insert('qahera::patterns/luxury-product-card', [
          'title' => 'قلادة المشربية الفاطمية',
          'collection' => 'مجموعة التراث المعاصر',
          'price' => '2,100 ر.س',
          'badgeText' => 'صناعة يدوية',
          'material' => 'Steel 316L · طلاء ذهب عيار 18',
      ]) ?>
      <?= $this->insert('qahera::patterns/luxury-product-card', [
          'title' => 'سوار الهيبة الأوبسيدياني',
          'collection' => 'المجموعة الملكية للرجال',
          'price' => '1,250 ر.س',
          'badgeText' => 'حجر أوبسيديان بركاني',
          'material' => 'Obsidian Steel · لمسة معتمة',
      ]) ?>
    </div>

    <!-- Pagination Pattern -->
    <div style="display: flex; justify-content: center; margin-block-end: var(--qhr-space-16, 64px);">
      <?= $this->insert('qahera::patterns/pagination') ?>
    </div>

    <!-- 3. Showrooms Locator Pattern -->
    <div id="stores" style="margin-block-end: var(--qhr-space-16, 64px);">
      <?= $this->insert('qahera::patterns/store-locator') ?>
    </div>

    <!-- 4. VIP Membership Pattern -->
    <div id="vip">
      <?= $this->insert('qahera::patterns/vip-membership') ?>
    </div>
  </main>

  <!-- 5. Back To Top -->
  <?= $this->insert('qahera::back-to-top', ['variant' => 'luxury']) ?>

</body>
</html>

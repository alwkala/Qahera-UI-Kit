<?php
/**
 * Qahera UI Kit — Cinematic Luxury Landing Page (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="luxury-gold" x-data="{
  theme: 'luxury-gold',
  toggleTheme() {
    this.theme = this.theme === 'luxury-gold' ? 'light' : 'luxury-gold';
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>قاهرة للمقتنيات الفاخرة — Qahera Luxury Landing Page</title>

  <!-- Tokens & Components CSS -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../tokens/themes/luxury-gold.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- Alpine Behavior Modules -->
  <script defer src="../../behavior/preloader.js"></script>
  <script defer src="../../behavior/back-to-top.js"></script>
  <script defer src="../../behavior/canvas-sparks.js"></script>
  <script defer src="../../behavior/navbar.js"></script>
  <script defer src="../../behavior/accordion.js"></script>

  <!-- Alpine Core -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--qhr-surface-page, #0F0B09); color: var(--qhr-text-primary, #F7F3ED); margin: 0; font-family: var(--qhr-font-family-body, sans-serif); overflow-x: hidden;">

  <!-- 1. Preloader -->
  <?= $this->insert('qahera::preloader', ['logoText' => 'قاهرة', 'logoSubtext' => 'QAHERA LUXURY SYSTEM']) ?>

  <!-- 2. Navbar -->
  <?= $this->insert('qahera::navbar', [
      'brand' => 'قاهرة للمقتنيات الفاخرة',
      'links' => [
          ['label' => 'الرئيسية', 'href' => '#hero', 'active' => true],
          ['label' => 'فلسفة الصنعة', 'href' => '#story'],
          ['label' => 'المقتنيات', 'href' => '#features'],
          ['label' => 'الأسئلة الشائعة', 'href' => '#faq'],
          ['label' => 'نادي الصفوة', 'href' => '#vip'],
      ],
      'actions' => '
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()" aria-label="تبديل مظهر الواجهة">
          <template x-if="theme === \'luxury-gold\'">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              ' . $this->insert('qahera::icon', ['name' => 'sun', 'size' => 14]) . '
              <span>فاتح</span>
            </span>
          </template>
          <template x-if="theme === \'light\'">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              ' . $this->insert('qahera::icon', ['name' => 'moon', 'size' => 14]) . '
              <span>ذهبي</span>
            </span>
          </template>
        </button>
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm" style="background-color: #D4AF37; color: #0F0B09; font-weight: 700;">
          <span>اقتنِ الآن</span>
        </button>
      '
  ]) ?>

  <!-- 3. Hero Section -->
  <section id="hero" style="position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; overflow: hidden;">
    <?= $this->insert('qahera::canvas-sparks', ['count' => 40]) ?>

    <div style="position: relative; z-index: 2; max-width: 840px; margin: 0 auto;">
      <span class="qhr-badge qhr-badge--outline qhr-badge--md" style="border-color: rgba(212, 175, 55, 0.4); color: #D4AF37; margin-bottom: 24px;">
        مجموعة القاهرة الملكية لعام 2026
      </span>

      <h1 style="font-family: var(--qhr-font-family-display, serif); font-size: clamp(38px, 6vw, 68px); font-weight: 800; line-height: 1.15; color: #F7F3ED; margin-bottom: 20px;">
        أناقة خالدة تصاغ بأيدي حرفيي القاهرة
      </h1>

      <p style="font-size: clamp(16px, 2vw, 20px); color: #B9A896; line-height: 1.7; max-width: 680px; margin: 0 auto 36px;">
        مقتنيات فاخرة تمزج صلابة ستيل 316L مع بهاء الذهب الإمبراطوري عيار 18، صممت لتبقى معك في أدق لحظات الحياة.
      </p>

      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--lg" style="background-color: #D4AF37; color: #0F0B09; font-weight: 700; padding: 14px 32px;">
          <span>استكشف الإصدارات الخاصة</span>
          <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 18]) ?>
        </button>
      </div>
    </div>
  </section>

  <!-- 4. Editorial Story Pattern -->
  <div id="story">
    <?= $this->insert('qahera::patterns/editorial-story') ?>
  </div>

  <!-- 5. Features Grid -->
  <section id="features" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 48px;">
      <h3 style="font-family: var(--qhr-font-family-display, serif); font-size: 32px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">
        معايير الامتياز الخمسة
      </h3>
      <p style="color: #B9A896; font-size: 15px;">ما يميز كل مقتنى يحمل خاتم قاهرة</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <div class="qhr-card" style="background-color: #17120F; border: 1px solid rgba(212, 175, 55, 0.2); padding: 28px; border-radius: 12px;">
        <div style="color: #D4AF37; margin-bottom: 16px;"><?= $this->insert('qahera::icon', ['name' => 'shield', 'size' => 28]) ?></div>
        <h4 style="font-size: 18px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">فولاذ ستيل 316L فائق المتانة</h4>
        <p style="font-size: 14px; color: #B9A896; line-height: 1.7;">معدن طبي بحري لا يصدأ ولا يسبب أي حساسية للبشرة ومقاوم للخدوش اليومية.</p>
      </div>
      <div class="qhr-card" style="background-color: #17120F; border: 1px solid rgba(212, 175, 55, 0.2); padding: 28px; border-radius: 12px;">
        <div style="color: #D4AF37; margin-bottom: 16px;"><?= $this->insert('qahera::icon', ['name' => 'sparkles', 'size' => 28]) ?></div>
        <h4 style="font-size: 18px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">طلاء الذهب عيار 18 (PVD)</h4>
        <p style="font-size: 14px; color: #B9A896; line-height: 1.7;">تقنية ترسيب البخار الفيزيائي التي تضمن ثبات لون الذهب لسنوات طويلة دون بهتان.</p>
      </div>
      <div class="qhr-card" style="background-color: #17120F; border: 1px solid rgba(212, 175, 55, 0.2); padding: 28px; border-radius: 12px;">
        <div style="color: #D4AF37; margin-bottom: 16px;"><?= $this->insert('qahera::icon', ['name' => 'gift', 'size' => 28]) ?></div>
        <h4 style="font-size: 18px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">تغليف الإهداء الملكي</h4>
        <p style="font-size: 14px; color: #B9A896; line-height: 1.7;">علب فاخرة مجهزة بختم شمعي أحمر يدوي لتقديمها كهدية تليق بأعز المقربين.</p>
      </div>
    </div>
  </section>

  <!-- 6. VIP Membership Pattern -->
  <div id="vip" style="padding: 80px 24px;">
    <?= $this->insert('qahera::patterns/vip-membership') ?>
  </div>

  <!-- 7. Back To Top -->
  <?= $this->insert('qahera::back-to-top', ['variant' => 'luxury']) ?>

</body>
</html>

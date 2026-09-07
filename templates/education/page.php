<?php
/**
 * Qahera UI Kit — Education & LMS Portal Template (League/Plates Template)
 * 
 * Enrolled courses, syllabus modules, learning statistics, and progress tracking.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $stats Array of learning stats
 * @var array $courses Array of enrolled courses
 */

$stats = $stats ?? [
    ['title' => 'الدورات المسجلة', 'value' => '٦ دورات', 'change' => '+٢ هذا الشهر', 'direction' => 'up', 'icon' => 'folder'],
    ['title' => 'ساعات التعلم', 'value' => '٤٢.٥ ساعة', 'change' => '+١٤٪ نشاط', 'direction' => 'up', 'icon' => 'clock'],
    ['title' => 'الشهادات المكتسبة', 'value' => '٣ شهادات', 'change' => 'شهادة جاهزة', 'direction' => 'up', 'icon' => 'check'],
    ['title' => 'معدل الإنجاز العام', 'value' => '٧٨٪', 'change' => 'متقدم على الخطة', 'direction' => 'up', 'icon' => 'trending-up'],
];

$courses = $courses ?? [
    [
        'id' => 'c1',
        'title' => 'هندسة نظم التصميم المعمارية للذكاء الاصطناعي',
        'instructor' => 'م. أحمد الشناوي',
        'category' => 'نظم التصميم',
        'progress' => 85,
        'completed' => 20,
        'total' => 24,
        'duration' => '١٨ ساعة',
        'level' => 'متقدم',
    ],
    [
        'id' => 'c2',
        'title' => 'تطوير تطبيقات الويب فائقة الأداء بـ React 19 و Next.js 16',
        'instructor' => 'سارة عبد الله',
        'category' => 'تطوير الواجهات',
        'progress' => 60,
        'completed' => 19,
        'total' => 32,
        'duration' => '٢٦ ساعة',
        'level' => 'متوسط',
    ],
    [
        'id' => 'c3',
        'title' => 'بناء النوى البرمجية الآمنة وقواعد الحوكمة الرقمية بـ PHP 8',
        'instructor' => 'د. طارق مراد',
        'category' => 'الأنظمة الخلفية',
        'progress' => 30,
        'completed' => 5,
        'total' => 18,
        'duration' => '١٤ ساعة',
        'level' => 'متقدم',
    ],
];
?>
<div class="qhr-education-page" style="min-height: 100vh; background: var(--qhr-surface-page, #0A0A0A); color: var(--qhr-text-primary, #FFFFFF); font-family: var(--qhr-font-family-primary, 'Cairo', sans-serif);">

  <?= $this->insert('qahera::navbar', [
      'brand'   => ['title' => 'أكاديمية قاهرة للتقنية', 'avatar' => 'ق'],
      'links'   => [
          ['label' => 'دوراتي التعليمية', 'href' => '#', 'active' => true],
          ['label' => 'دليل المقررات', 'href' => '#'],
          ['label' => 'المسارات التخصصية', 'href' => '#'],
          ['label' => 'الشهادات المعتمدة', 'href' => '#'],
      ],
      'actions' => '<button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm"><span>استكشف الدورات</span></button>',
  ]) ?>

  <main style="max-width: 1240px; margin: 0 auto; padding: var(--qhr-space-8) var(--qhr-space-6); display: flex; flex-direction: column; gap: var(--qhr-space-8);">
    
    <!-- Welcome Header -->
    <header style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--qhr-space-4); padding-bottom: var(--qhr-space-6); border-bottom: 1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08));">
      <div>
        <h1 style="font-size: 2rem; font-weight: 800; margin: 0; color: var(--qhr-text-primary, #FFFFFF);">
          مرحباً بك، مهندس عبد الرحمن
        </h1>
        <p style="margin: var(--qhr-space-2) 0 0; color: var(--qhr-text-muted, #9E9E9E); font-size: 1rem;">
          واصل مسار تعلمك في هندسة النظم وتطوير الواجهات التفاعلية المتقدمة.
        </p>
      </div>
      <div style="display: inline-flex; gap: var(--qhr-space-3);">
        <button type="button" class="qhr-btn qhr-btn--outline qhr-btn--md">
          <?= $this->insert('qahera::icon', ['name' => 'download', 'size' => 16]) ?>
          <span>تحميل السجل الأكاديمي</span>
        </button>
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md">
          <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 16]) ?>
          <span>استئناف آخر درس</span>
        </button>
      </div>
    </header>

    <!-- Stats Grid -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--qhr-space-4);">
      <?php foreach ($stats as $stat): ?>
        <?= $this->insert('qahera::patterns/dashboard-stat', [
            'title'     => $stat['title'],
            'value'     => $stat['value'],
            'change'    => $stat['change'],
            'direction' => $stat['direction'],
            'icon'      => $stat['icon'],
        ]) ?>
      <?php endforeach; ?>
    </section>

    <!-- Filter Bar -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--qhr-space-4);">
      <?= $this->insert('qahera::patterns/filter-bar', [
          'filters' => [
              ['id' => 'all', 'label' => 'كافة المجالات', 'active' => true],
              ['id' => 'design', 'label' => 'نظم التصميم'],
              ['id' => 'frontend', 'label' => 'تطوير الواجهات'],
              ['id' => 'backend', 'label' => 'الأنظمة الخلفية'],
          ]
      ]) ?>
    </div>

    <!-- Courses Grid -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: var(--qhr-space-6);">
      <?php foreach ($courses as $c): ?>
        <div class="qhr-card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div class="qhr-card__header">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--qhr-space-2);">
              <span class="qhr-badge qhr-badge--neutral"><?= htmlspecialchars($c['category']) ?></span>
              <span style="font-size: 0.8125rem; color: var(--qhr-text-muted); display: inline-flex; align-items: center; gap: 4px;">
                <?= $this->insert('qahera::icon', ['name' => 'clock', 'size' => 14]) ?>
                <?= htmlspecialchars($c['duration']) ?>
              </span>
            </div>
            <h3 style="font-size: 1.125rem; font-weight: 700; margin: 0 0 var(--qhr-space-1); color: var(--qhr-text-primary);">
              <?= htmlspecialchars($c['title']) ?>
            </h3>
            <p style="font-size: 0.875rem; color: var(--qhr-text-secondary); margin: 0;">
              المحاضر: <?= htmlspecialchars($c['instructor']) ?>
            </p>
          </div>

          <div class="qhr-card__body" style="padding-top: var(--qhr-space-4);">
            <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; color: var(--qhr-text-muted); margin-bottom: 6px;">
              <span><?= $c['completed'] ?> من <?= $c['total'] ?> درس مكتمل</span>
              <span style="font-weight: 700; color: var(--qhr-color-primary-400, #D4AF37);"><?= $c['progress'] ?>%</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 9999px; overflow: hidden;">
              <div style="width: <?= $c['progress'] ?>%; height: 100%; background: var(--qhr-color-primary-500, #C7A35A); border-radius: 9999px;"></div>
            </div>
          </div>

          <div class="qhr-card__footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--qhr-border-subtle, rgba(255,255,255,0.06)); padding-top: var(--qhr-space-4); margin-top: var(--qhr-space-4);">
            <span class="qhr-badge qhr-badge--primary"><?= htmlspecialchars($c['level']) ?></span>
            <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm">
              <span>استئناف التعلم</span>
              <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 14]) ?>
            </button>
          </div>
        </div>
      <?php endforeach; ?>
    </section>

  </main>
</div>

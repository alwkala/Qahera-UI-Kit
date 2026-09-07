<?php
/**
 * Qahera UI Kit — Executive Dashboard Template (League/Plates Template)
 * 
 * Birds-eye telemetry, 4 KPI metric cards, recent activity table, and quick actions.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $stats Array of KPI stat cards data
 * @var array $activities Array of recent activities
 */

$stats = $stats ?? [
    ['title' => 'إجمالي الإيرادات الشهرية', 'value' => '١٢٨,٤٥٠ ر.س', 'delta' => '+١٢.٥٪', 'trend' => 'up', 'icon' => 'calendar', 'context' => 'مقارنة بالشهر السابق'],
    ['title' => 'المستخدمين النشطين', 'value' => '١٤,٢٩٠', 'delta' => '+٨.٢٪', 'trend' => 'up', 'icon' => 'users', 'context' => 'آخر ٣٠ يوماً'],
    ['title' => 'العمليات المكتملة', 'value' => '٣٨,٩٢٠', 'delta' => '-١.٤٪', 'trend' => 'down', 'icon' => 'check', 'context' => 'معدل نجاح ٩٩.٤٪'],
    ['title' => 'زمن استجابة النظام', 'value' => '١٤٢ مل/ث', 'delta' => '+١٨.٠٪', 'trend' => 'up', 'icon' => 'clock', 'context' => 'تحسن في زمن التحميل'],
];

$activities = $activities ?? [
    ['id' => 'ACT-901', 'user' => 'أحمد محمود', 'action' => 'إنشاء عقد معايير جديد', 'status' => 'success', 'time' => 'منذ ٥ دقائق'],
    ['id' => 'ACT-902', 'user' => 'سارة خالد', 'action' => 'تعديل الصلاحيات الإدارية', 'status' => 'info', 'time' => 'منذ ١٢ دقيقة'],
    ['id' => 'ACT-903', 'user' => 'كريم إبراهيم', 'action' => 'تصدير تقرير الإيرادات السنوي', 'status' => 'success', 'time' => 'منذ ساعة'],
    ['id' => 'ACT-904', 'user' => 'منى حسن', 'action' => 'محاولة تسجيل دخول غير مصرح بها', 'status' => 'danger', 'time' => 'منذ ساعتين'],
    ['id' => 'ACT-905', 'user' => 'نظام المزامنة', 'action' => 'توليد الرموز والقوالب المعيارية', 'status' => 'success', 'time' => 'منذ ٣ ساعات'],
];
?>
<div
  class="qhr-dashboard-page"
  x-data="{
    theme: 'dark',
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }"
  style="min-height: 100vh; background: var(--qhr-surface-page, #020617); color: var(--qhr-text-primary, #f8fafc);"
>
  
  <?= $this->insert('qahera::navbar', [
      'brand'   => ['title' => 'لوحة القيادة · قاهرة', 'avatar' => 'ق'],
      'links'   => [
          ['label' => 'نظرة عامة', 'href' => '#', 'active' => true],
          ['label' => 'التقارير', 'href' => '#'],
          ['label' => 'العمليات', 'href' => '#'],
          ['label' => 'الإعدادات', 'href' => '#'],
      ],
      'actions' => '
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleTheme()" aria-label="تبديل النمط">
          <template x-if="theme === \'dark\'">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              ' . $this->insert('qahera::icon', ['name' => 'sun', 'size' => 14]) . '
              <span>فاتح</span>
            </span>
          </template>
          <template x-if="theme === \'light\'">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              ' . $this->insert('qahera::icon', ['name' => 'moon', 'size' => 14]) . '
              <span>داكن</span>
            </span>
          </template>
        </button>
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm"><span>تقرير جديد</span></button>
      ',
  ]) ?>

  <main style="padding: var(--qhr-space-8); max-width: 1200px; margin: 0 auto;">
    
    <header style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--qhr-space-4); margin-bottom: var(--qhr-space-8);">
      <div>
        <h1 style="font-size: var(--qhr-text-2xl); font-weight: 700; color: var(--qhr-color-neutral-900); margin: 0 0 var(--qhr-space-1) 0;">
          مؤشرات الأداء التشغيلية
        </h1>
        <p style="font-size: var(--qhr-text-sm); color: var(--qhr-color-neutral-600); margin: 0;">
          متابعة مباشرة ومحدثة لحركة النظام والعمليات ومؤشرات النمو.
        </p>
      </div>
      <div style="display: inline-flex; gap: var(--qhr-space-2);">
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm">
          <?= $this->insert('qahera::icon', ['name' => 'download', 'size' => 16]) ?>
          <span>تصدير البيانات</span>
        </button>
        <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm">
          <?= $this->insert('qahera::icon', ['name' => 'refresh', 'size' => 16]) ?>
          <span>تحديث حي</span>
        </button>
      </div>
    </header>

    <!-- 4 KPI Cards Strip -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--qhr-space-5); margin-bottom: var(--qhr-space-8);">
      <?php foreach ($stats as $stat): ?>
        <?= $this->insert('qahera::patterns/dashboard-stat', $stat) ?>
      <?php endforeach; ?>
    </section>

    <!-- Recent Activity Table -->
    <div class="qhr-card" style="padding: var(--qhr-space-6); background: var(--qhr-surface-base);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--qhr-space-4);">
        <div>
          <h2 style="font-size: var(--qhr-text-lg); font-weight: 600; color: var(--qhr-color-neutral-900); margin: 0 0 var(--qhr-space-1) 0;">
            العمليات وسجلات النشاط الأخيرة
          </h2>
          <p style="font-size: var(--qhr-text-xs); color: var(--qhr-color-neutral-500); margin: 0;">
            آخر الأحداث المسجلة في بيئة التشغيل المعيارية.
          </p>
        </div>
        <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--xs">
          <span>عرض كافة السجلات</span>
          <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 14]) ?>
        </button>
      </div>

      <div class="qhr-table-container">
        <table class="qhr-table qhr-table--striped" role="table">
          <thead class="qhr-table-head">
            <tr class="qhr-table-row">
              <th class="qhr-table-th">معرف الحدث</th>
              <th class="qhr-table-th">المستخدم / المصدر</th>
              <th class="qhr-table-th">الإجراء المنفذ</th>
              <th class="qhr-table-th">الحالة</th>
              <th class="qhr-table-th" style="text-align: end;">الوقت المنقضي</th>
            </tr>
          </thead>
          <tbody class="qhr-table-body">
            <?php foreach ($activities as $act): ?>
              <?php 
                $tone = $act['status'] === 'success' ? 'success' : ($act['status'] === 'danger' ? 'danger' : 'info');
                $label = $act['status'] === 'success' ? 'مكتمل' : ($act['status'] === 'danger' ? 'فشل' : 'معلومة');
              ?>
              <tr class="qhr-table-row">
                <td class="qhr-table-td"><code><?= $this->e($act['id']) ?></code></td>
                <td class="qhr-table-td" style="font-weight: 600;"><?= $this->e($act['user']) ?></td>
                <td class="qhr-table-td"><?= $this->e($act['action']) ?></td>
                <td class="qhr-table-td">
                  <span class="qhr-badge qhr-badge--<?= $tone ?> qhr-badge--sm"><?= $this->e($label) ?></span>
                </td>
                <td class="qhr-table-td" style="text-align: end; font-size: var(--qhr-text-xs); color: var(--qhr-color-neutral-500);">
                  <?= $this->e($act['time']) ?>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

  </main>
</div>

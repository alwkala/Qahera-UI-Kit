<?php
/**
 * Qahera UI Kit — Admin CRUD Template (League/Plates Template)
 * 
 * Full administrative data grid with faceted filtering, batch selection,
 * search toolbar, pagination, and deletion gate modal.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $resources List of resource items
 * @var string $searchQuery Active search query
 * @var string $selectedFilter Active category/status filter
 * @var int $currentPage Current page index
 * @var int $totalPages Total pages count
 */

$resources = $resources ?? [
    ['id' => 'RES-101', 'name' => 'خدمة التحقق المعيارية', 'category' => 'الأنظمة', 'status' => 'active', 'date' => '2026-09-01'],
    ['id' => 'RES-102', 'name' => 'واجهة بوابة الدفع الإلكتروني', 'category' => 'المالية', 'status' => 'active', 'date' => '2026-09-02'],
    ['id' => 'RES-103', 'name' => 'خادم معالجة الوسائط والملفات', 'category' => 'البنية التحتية', 'status' => 'pending', 'date' => '2026-09-03'],
    ['id' => 'RES-104', 'name' => 'مكتبة العقود والرموز المشتركة', 'category' => 'التطوير', 'status' => 'active', 'date' => '2026-09-04'],
    ['id' => 'RES-105', 'name' => 'خدمة التنبيهات البريدية المجمعة', 'category' => 'الاتصالات', 'status' => 'archived', 'date' => '2026-09-05'],
];

$searchQuery = $searchQuery ?? '';
$selectedFilter = $selectedFilter ?? 'all';
$currentPage = $currentPage ?? 1;
$totalPages = $totalPages ?? 3;

$filters = [
    ['label' => 'كافة الموارد', 'count' => count($resources), 'active' => $selectedFilter === 'all', 'href' => '?status=all'],
    ['label' => 'نشط', 'count' => 3, 'active' => $selectedFilter === 'active', 'href' => '?status=active'],
    ['label' => 'قيد الانتظار', 'count' => 1, 'active' => $selectedFilter === 'pending', 'href' => '?status=pending'],
    ['label' => 'مؤرشف', 'count' => 1, 'active' => $selectedFilter === 'archived', 'href' => '?status=archived'],
];
?>
<div
  class="qhr-admin-page"
  x-data="{
    theme: 'dark',
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }"
  style="padding: var(--qhr-space-8); max-width: 1200px; margin: 0 auto; color: var(--qhr-text-primary);"
>
  
  <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--qhr-space-6); padding-bottom: var(--qhr-space-4); border-bottom: 1px solid var(--qhr-border-subtle);">
    <div>
      <h1 style="font-size: var(--qhr-text-2xl); font-weight: 700; color: var(--qhr-text-primary); margin: 0 0 var(--qhr-space-1) 0;">
        إدارة الموارد والعمليات
      </h1>
      <p style="font-size: var(--qhr-text-sm); color: var(--qhr-text-secondary); margin: 0;">
        استعراض شامل لكافة موارد النظام، مع إمكانية الفرز، والتعديل، والعمليات المجمعة.
      </p>
    </div>
    <div>
      <button
        type="button"
        class="qhr-btn qhr-btn--secondary qhr-btn--sm"
        @click="toggleTheme()"
        aria-label="تبديل مظهر الواجهة"
      >
        <template x-if="theme === 'dark'">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            <?= $this->insert('qahera::icon', ['name' => 'sun', 'size' => 16]) ?>
            <span>النمط الفاتح</span>
          </span>
        </template>
        <template x-if="theme === 'light'">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            <?= $this->insert('qahera::icon', ['name' => 'moon', 'size' => 16]) ?>
            <span>النمط الداكن</span>
          </span>
        </template>
      </button>
    </div>
  </header>

  <div class="qhr-card" style="padding: var(--qhr-space-6); background: var(--qhr-surface-base); border-radius: var(--qhr-radius-lg); border: 1px solid var(--qhr-border-subtle);">
    
    <?= $this->insert('qahera::patterns/data-table-toolbar', [
        'searchQuery'       => $searchQuery,
        'searchPlaceholder' => 'ابحث بالاسم، المعرف، أو التصنيف...',
        'selectedCount'     => 0,
        'createLabel'       => 'إضافة مورد جديد',
        'createUrl'         => '#create',
        'exportUrl'         => '#export',
    ]) ?>

    <?= $this->insert('qahera::patterns/filter-bar', [
        'filters'   => $filters,
        'clearUrl'  => '?status=all',
    ]) ?>

    <div style="margin-top: var(--qhr-space-4);">
      <div class="qhr-table-container">
        <table class="qhr-table qhr-table--striped" role="table">
          <thead class="qhr-table-head">
            <tr class="qhr-table-row">
              <th class="qhr-table-th" style="width: 40px;"><input type="checkbox" aria-label="تحديد الكل"></th>
              <th class="qhr-table-th">المعرف</th>
              <th class="qhr-table-th">اسم المورد</th>
              <th class="qhr-table-th">التصنيف</th>
              <th class="qhr-table-th">الحالة</th>
              <th class="qhr-table-th">تاريخ الإنشاء</th>
              <th class="qhr-table-th" style="text-align: end;">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="qhr-table-body">
            <?php foreach ($resources as $res): ?>
              <?php 
                $tone = $res['status'] === 'active' ? 'success' : ($res['status'] === 'pending' ? 'warning' : 'neutral');
                $label = $res['status'] === 'active' ? 'نشط' : ($res['status'] === 'pending' ? 'قيد الانتظار' : 'مؤرشف');
              ?>
              <tr class="qhr-table-row">
                <td class="qhr-table-td"><input type="checkbox" aria-label="تحديد السطر"></td>
                <td class="qhr-table-td"><code><?= $this->e($res['id']) ?></code></td>
                <td class="qhr-table-td" style="font-weight: 600;"><?= $this->e($res['name']) ?></td>
                <td class="qhr-table-td"><?= $this->e($res['category']) ?></td>
                <td class="qhr-table-td">
                  <span class="qhr-badge qhr-badge--<?= $tone ?> qhr-badge--sm"><?= $this->e($label) ?></span>
                </td>
                <td class="qhr-table-td" style="font-size: var(--qhr-text-xs);"><?= $this->e($res['date']) ?></td>
                <td class="qhr-table-td" style="text-align: end; white-space: nowrap;">
                  <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--xs" aria-label="تعديل">
                    <?= $this->insert('qahera::icon', ['name' => 'edit', 'size' => 14]) ?>
                  </button>
                  <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--xs" style="color: var(--qhr-color-danger-600);" aria-label="حذف">
                    <?= $this->insert('qahera::icon', ['name' => 'delete', 'size' => 14]) ?>
                  </button>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

    <?= $this->insert('qahera::patterns/pagination', [
        'currentPage' => $currentPage,
        'totalPages'  => $totalPages,
        'totalItems'  => count($resources),
        'pageSize'    => 5,
    ]) ?>

  </div>

  <?= $this->insert('qahera::patterns/confirmation', [
      'id'           => 'admin-delete-modal',
      'title'        => 'تأكيد حذف المورد',
      'description'  => 'هذا الإجراء سيؤدي إلى حذف السجل نهائياً من قاعدة البيانات. هل تريد الاستمرار؟',
      'confirmLabel' => 'نعم، حذف نهائي',
      'destructive'  => true,
  ]) ?>

</div>

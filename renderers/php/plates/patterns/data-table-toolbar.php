<?php
/**
 * Qahera UI Kit — Data Table Toolbar Pattern (League/Plates Template)
 * 
 * Combines search, bulk operations, filter toggles, and create actions above data tables.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $searchQuery Current search string
 * @var string $searchPlaceholder Input placeholder
 * @var int $selectedCount Number of selected rows
 * @var array $bulkActions Array of bulk action buttons [['label' => 'حذف المحدد', 'action' => '#', 'destructive' => true]]
 * @var string $createUrl URL to add new record
 * @var string $createLabel Label for create action (default 'إضافة سجل جديد')
 * @var string $exportUrl Optional URL to export table data
 * @var string $class Additional CSS classes
 */

$searchQuery = $searchQuery ?? '';
$searchPlaceholder = $searchPlaceholder ?? 'بحث وتصفية الجدول...';
$selectedCount = (int)($selectedCount ?? 0);
$bulkActions = $bulkActions ?? [];
$createUrl = $createUrl ?? '';
$createLabel = $createLabel ?? 'إضافة سجل جديد';
$exportUrl = $exportUrl ?? '';
$class = $class ?? '';
?>
<div class="qhr-data-table-toolbar <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="toolbar" 
     aria-label="أدوات إدارة الجدول"
     style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--qhr-space-3); padding-bottom: var(--qhr-space-4);">
  
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--qhr-space-3); flex: 1;">
    <!-- Search Field -->
    <div style="position: relative; min-width: 240px; display: flex; align-items: center;">
      <span style="position: absolute; inset-inline-start: var(--qhr-space-3); color: var(--qhr-color-neutral-400); pointer-events: none; display: inline-flex;">
        <?= $this->insert('qahera::icon', ['name' => 'search', 'size' => 16]) ?>
      </span>
      <input 
        type="search" 
        name="table_search" 
        value="<?= htmlspecialchars($searchQuery, ENT_QUOTES, 'UTF-8') ?>"
        placeholder="<?= htmlspecialchars($searchPlaceholder, ENT_QUOTES, 'UTF-8') ?>"
        class="qhr-input qhr-input--sm"
        style="padding-inline-start: var(--qhr-space-8); width: 100%;"
      />
    </div>

    <!-- Bulk Actions (shown when rows selected) -->
    <?php if ($selectedCount > 0 && !empty($bulkActions)): ?>
      <div style="display: inline-flex; align-items: center; gap: var(--qhr-space-2); background: var(--qhr-color-primary-50); padding: var(--qhr-space-1) var(--qhr-space-3); border-radius: var(--qhr-radius-md);">
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm">
          <?= $selectedCount ?> محدد
        </span>
        <?php foreach ($bulkActions as $action): ?>
          <button type="button" 
                  class="qhr-btn qhr-btn--<?= !empty($action['destructive']) ? 'destructive' : 'secondary' ?> qhr-btn--xs">
            <span><?= htmlspecialchars($action['label'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
          </button>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>

  <div style="display: inline-flex; align-items: center; gap: var(--qhr-space-2);">
    <?php if (!empty($exportUrl)): ?>
      <a href="<?= htmlspecialchars($exportUrl, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--secondary qhr-btn--sm">
        <?= $this->insert('qahera::icon', ['name' => 'download', 'size' => 16]) ?>
        <span>تصدير</span>
      </a>
    <?php endif; ?>

    <?php if (!empty($createUrl)): ?>
      <a href="<?= htmlspecialchars($createUrl, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--primary qhr-btn--sm">
        <?= $this->insert('qahera::icon', ['name' => 'plus', 'size' => 16]) ?>
        <span><?= htmlspecialchars($createLabel, ENT_QUOTES, 'UTF-8') ?></span>
      </a>
    <?php endif; ?>
  </div>

</div>

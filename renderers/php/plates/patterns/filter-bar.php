<?php
/**
 * Qahera UI Kit — Filter Bar Pattern (League/Plates Template)
 * 
 * Displays active faceted filtering chips with result counts and clear-all action.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $filters Array of filter definitions [['label' => 'الطلبات النشطة', 'count' => 8, 'active' => true, 'href' => '#']]
 * @var string $clearUrl URL to clear all filters
 * @var string $clearLabel Label for clear trigger (default 'مسح الكل')
 * @var string $class Additional CSS classes
 */

$filters = $filters ?? [];
$clearUrl = $clearUrl ?? '#';
$clearLabel = $clearLabel ?? 'مسح الكل';
$class = $class ?? '';

$hasActive = false;
foreach ($filters as $f) {
    if (!empty($f['active'])) {
        $hasActive = true;
        break;
    }
}
?>
<div class="qhr-filter-bar <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="group" 
     aria-label="تصفية النتائج"
     style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--qhr-space-2); padding: var(--qhr-space-2) 0;">
  
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--qhr-space-2); flex: 1;">
    <?php foreach ($filters as $filter): ?>
      <?php 
        $label = $filter['label'] ?? '';
        $count = $filter['count'] ?? null;
        $active = !empty($filter['active']);
        $href = $filter['href'] ?? '#';
      ?>
      <a href="<?= htmlspecialchars($href, ENT_QUOTES, 'UTF-8') ?>" 
         class="qhr-filter-chip <?= $active ? 'is-active' : '' ?>"
         style="display: inline-flex; align-items: center; gap: var(--qhr-space-2); padding: var(--qhr-space-1-5) var(--qhr-space-3); border-radius: var(--qhr-radius-full); font-size: var(--qhr-text-xs); font-weight: 500; text-decoration: none; border: 1px solid <?= $active ? 'var(--qhr-color-primary-600)' : 'var(--qhr-border-subtle)' ?>; background: <?= $active ? 'var(--qhr-color-primary-50)' : 'var(--qhr-surface-base)' ?>; color: <?= $active ? 'var(--qhr-color-primary-700)' : 'var(--qhr-color-neutral-700)' ?>; transition: all var(--qhr-duration-fast);"
         aria-pressed="<?= $active ? 'true' : 'false' ?>">
        <span><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></span>
        <?php if ($count !== null): ?>
          <span style="display: inline-flex; padding: 1px 6px; border-radius: var(--qhr-radius-full); font-size: 10px; font-weight: 700; background: <?= $active ? 'var(--qhr-color-primary-200)' : 'var(--qhr-color-neutral-200)' ?>; color: <?= $active ? 'var(--qhr-color-primary-800)' : 'var(--qhr-color-neutral-800)' ?>;">
            <?= htmlspecialchars((string)$count, ENT_QUOTES, 'UTF-8') ?>
          </span>
        <?php endif; ?>
      </a>
    <?php endforeach; ?>
  </div>

  <?php if ($hasActive && !empty($clearUrl)): ?>
    <a href="<?= htmlspecialchars($clearUrl, ENT_QUOTES, 'UTF-8') ?>" 
       class="qhr-btn qhr-btn--ghost qhr-btn--xs"
       style="color: var(--qhr-color-danger-600); white-space: nowrap;">
      <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 12]) ?>
      <span><?= htmlspecialchars($clearLabel, ENT_QUOTES, 'UTF-8') ?></span>
    </a>
  <?php endif; ?>
</div>

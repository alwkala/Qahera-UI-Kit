<?php
/**
 * Qahera UI Kit — Dashboard Metric Card Pattern (League/Plates Template)
 * 
 * Displays key performance indicator metrics, trend badges, and contextual comparison.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $title Metric title or label
 * @var string|int|float $value Formatted metric numerical value
 * @var string $delta Percentage or trend delta string (e.g. '+14.2%')
 * @var string $trend 'up' | 'down' | 'neutral'
 * @var string $icon Semantic icon name
 * @var string $context Context description (e.g. 'مقارنة بالشهر السابق')
 * @var string $class Additional CSS classes
 */

$title = $title ?? $label ?? 'إجمالي المعاملات';
$value = $value ?? '0';
$delta = $delta ?? $change ?? '';
$trend = $trend ?? 'up';
$icon = $icon ?? 'folder';
$context = $context ?? '';
$class = $class ?? '';

$badgeTone = $trend === 'up' ? 'success' : ($trend === 'down' ? 'danger' : 'neutral');
?>
<div class="qhr-card qhr-dashboard-stat <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="region" 
     aria-label="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>: <?= htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8') ?>"
     style="padding: var(--qhr-space-5); display: flex; flex-direction: column; gap: var(--qhr-space-3);">
  
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <span style="font-size: var(--qhr-text-sm); font-weight: 500; color: var(--qhr-color-neutral-600);">
      <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
    </span>
    <span style="display: inline-flex; padding: var(--qhr-space-2); background: var(--qhr-color-neutral-100); border-radius: var(--qhr-radius-md); color: var(--qhr-color-neutral-700);">
      <?= $this->insert('qahera::icon', ['name' => $icon, 'size' => 18]) ?>
    </span>
  </div>

  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: var(--qhr-space-2);">
    <div style="font-size: var(--qhr-text-2xl); font-weight: 700; color: var(--qhr-color-neutral-900); letter-spacing: -0.02em;">
      <?= htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8') ?>
    </div>
    
    <?php if (!empty($delta)): ?>
      <span class="qhr-badge qhr-badge--<?= $badgeTone ?> qhr-badge--sm" style="display: inline-flex; align-items: center; gap: 2px;">
        <?php if ($trend === 'up'): ?>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        <?php elseif ($trend === 'down'): ?>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        <?php endif; ?>
        <span><?= htmlspecialchars($delta, ENT_QUOTES, 'UTF-8') ?></span>
      </span>
    <?php endif; ?>
  </div>

  <?php if (!empty($context)): ?>
    <div style="font-size: var(--qhr-text-xs); color: var(--qhr-color-neutral-500);">
      <?= htmlspecialchars($context, ENT_QUOTES, 'UTF-8') ?>
    </div>
  <?php endif; ?>
</div>

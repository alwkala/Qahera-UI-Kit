<?php
/**
 * Qahera UI Kit — Metric Comparison Grid Pattern (League/Plates Template)
 * 
 * Multi-metric financial and operational comparison benchmark grid.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $metrics Metric items
 */

$metrics = $metrics ?? [
    ['title' => 'معدل التحويل (CR)', 'value' => '3.84%', 'change' => '+4.8%', 'tone' => 'success', 'progress' => 100],
    ['title' => 'زمن استجابة الخادم', 'value' => '42ms', 'change' => '-28ms', 'tone' => 'primary', 'progress' => 92],
    ['title' => 'معدل الاحتفاظ بالعملاء', 'value' => '94.2%', 'change' => '0.0%', 'tone' => 'warning', 'progress' => 94],
];
?>
<div class="qhr-metric-comparison-grid" role="region" aria-label="مقارنة مؤشرات الأداء">
  <?php foreach ($metrics as $m): ?>
    <div class="qhr-card" style="padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-block-end: 8px;">
        <span style="font-size: 13px; color: var(--qhr-color-neutral-600);"><?= htmlspecialchars($m['title'], ENT_QUOTES, 'UTF-8') ?></span>
        <span class="qhr-badge qhr-badge--<?= $m['tone'] ?> qhr-badge--sm"><?= htmlspecialchars($m['change'], ENT_QUOTES, 'UTF-8') ?></span>
      </div>
      <div style="font-size: 26px; font-weight: 800;"><?= htmlspecialchars($m['value'], ENT_QUOTES, 'UTF-8') ?></div>
      <div class="qhr-progress qhr-progress--<?= $m['tone'] ?> qhr-progress--xs" role="progressbar" aria-valuenow="<?= $m['progress'] ?>" aria-valuemin="0" aria-valuemax="100" style="margin-block-start: 12px;">
        <div class="qhr-progress-bar" style="width: <?= $m['progress'] ?>%;"></div>
      </div>
    </div>
  <?php endforeach; ?>
</div>

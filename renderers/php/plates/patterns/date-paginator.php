<?php
/**
 * Qahera UI Kit — Date Paginator Strip Pattern (League/Plates Template)
 * 
 * Horizontal scrollable day-by-day navigation strip.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $dates Array of date items
 * @var string $activeDate Currently selected date value
 */

$dates = $dates ?? [
    ['day' => 'الأحد', 'num' => '06', 'val' => '2026-09-06'],
    ['day' => 'اليوم', 'num' => '07', 'val' => '2026-09-07', 'active' => true],
    ['day' => 'الثلاثاء', 'num' => '08', 'val' => '2026-09-08'],
    ['day' => 'الأربعاء', 'num' => '09', 'val' => '2026-09-09'],
    ['day' => 'الخميس', 'num' => '10', 'val' => '2026-09-10'],
];
?>
<div class="qhr-date-paginator" role="tablist" aria-label="شريط التقويم اليومي">
  <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" aria-label="السابق">
    <?= $this->insert('qahera::icon', ['name' => 'chevron-right', 'size' => 16]) ?>
  </button>

  <div class="qhr-date-strip">
    <?php foreach ($dates as $d): ?>
      <?php $isActive = !empty($d['active']); ?>
      <button type="button" role="tab" aria-selected="<?= $isActive ? 'true' : 'false' ?>" class="qhr-date-cell <?= $isActive ? 'is-active' : '' ?>">
        <span style="font-size: 11px;"><?= htmlspecialchars($d['day'], ENT_QUOTES, 'UTF-8') ?></span>
        <span style="font-size: 16px; font-weight: 700;"><?= htmlspecialchars($d['num'], ENT_QUOTES, 'UTF-8') ?></span>
      </button>
    <?php endforeach; ?>
  </div>

  <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" aria-label="التالي">
    <?= $this->insert('qahera::icon', ['name' => 'chevron-left', 'size' => 16]) ?>
  </button>
</div>

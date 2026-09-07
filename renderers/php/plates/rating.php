<?php
/**
 * Qahera UI Kit — Rating Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$value = $value ?? 5;
$max = $max ?? 5;
$size = $size ?? 'md';
$isReadonly = $isReadonly ?? true;
?>
<div class="qhr-rating <?= $isReadonly ? 'qhr-rating--readonly' : '' ?>" role="slider" aria-valuenow="<?= (int)$value ?>" aria-valuemin="1" aria-valuemax="<?= (int)$max ?>" aria-label="تقييم <?= (int)$value ?> من <?= (int)$max ?>">
  <?php for ($i = 1; $i <= $max; $i++): ?>
    <button type="button" class="qhr-rating-star <?= $i <= $value ? 'qhr-rating-star--filled' : '' ?>" aria-label="نجمة <?= $i ?>" <?= $isReadonly ? 'disabled' : '' ?>>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    </button>
  <?php endfor; ?>
  <?php if (isset($showLabel) && $showLabel): ?>
    <span class="qhr-rating-label"><?= number_format($value, 1) ?></span>
  <?php endif; ?>
</div>

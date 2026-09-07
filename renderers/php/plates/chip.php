<?php
/**
 * Qahera UI Kit — Chip Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$label = $label ?? '';
$size = $size ?? 'md';
$variant = $variant ?? 'default';
$removable = $removable ?? false;
?>
<div class="qhr-chip qhr-chip--<?= $this->e($size) ?> qhr-chip--<?= $this->e($variant) ?>" role="button" tabindex="0">
  <span><?= $this->e($label) ?></span>
  <?php if ($removable): ?>
    <button type="button" class="qhr-chip-remove" aria-label="إزالة <?= $this->e($label) ?>">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  <?php endif; ?>
</div>

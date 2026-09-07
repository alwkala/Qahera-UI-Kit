<?php
/**
 * Qahera UI Kit — Divider Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$label = $label ?? null;
$orientation = $orientation ?? 'horizontal';
$variant = $variant ?? 'default';
?>
<div 
  class="qhr-divider <?= $orientation === 'vertical' ? 'qhr-divider--vertical' : '' ?> <?= $variant !== 'default' ? 'qhr-divider--' . $this->e($variant) : '' ?>" 
  role="separator" 
  aria-orientation="<?= $this->e($orientation) ?>"
>
  <?php if ($label): ?>
    <span><?= $this->e($label) ?></span>
  <?php endif; ?>
</div>

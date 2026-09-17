<?php
/**
 * Qahera UI Kit — Plates Template Partial: Seal
 *
 * @var League\Plates\Template\Template $this
 * @var string|null $label
 * @var string|null $subtext
 * @var string $variant (solid|subtle|outline)
 * @var string $size (sm|md|lg)
 * @var string $extraClass
 */
$variant = $variant ?? 'solid';
$size = $size ?? 'md';
$label = $label ?? 'معتمد';
$subtext = $subtext ?? 'ALWKALA';
$extraClass = $extraClass ?? '';
?>
<div class="qhr-seal qhr-seal--<?= $this->e($variant) ?> qhr-seal--<?= $this->e($size) ?> <?= $this->e($extraClass) ?>" role="status">
  <div class="qhr-seal__ring">
    <div class="qhr-seal__emblem">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a6 6 0 100 12 6 6 0 000-12zm-8 14h16M6 18v2m12-2v2"/></svg>
    </div>
    <span class="qhr-seal__label"><?= $this->e($label) ?></span>
    <?php if (!empty($subtext)): ?>
      <span class="qhr-seal__subtext"><?= $this->e($subtext) ?></span>
    <?php endif; ?>
  </div>
</div>

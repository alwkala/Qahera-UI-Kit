<?php
/**
 * Qahera UI Kit — Plates Template Partial: Frieze
 *
 * @var League\Plates\Template\Template $this
 * @var string|null $label
 * @var string $variant (subtle|outline|solid)
 * @var string $size (sm|md|lg)
 * @var string $extraClass
 */
$variant = $variant ?? 'subtle';
$size = $size ?? 'md';
$extraClass = $extraClass ?? '';
?>
<div class="qhr-frieze qhr-frieze--<?= $this->e($variant) ?> qhr-frieze--<?= $this->e($size) ?> <?= $this->e($extraClass) ?>" role="separator">
  <div class="qhr-frieze__track">
    <span class="qhr-frieze__motif">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v2H2V6zm2 4h3v4H4v-4zm5 0h3v4H9v-4zm5 0h3v4h-3v-4zm5 0h2v4h-2v-4zM2 16h20v2H2v-2z"/></svg>
    </span>
    <?php if (!empty($label)): ?>
      <span class="qhr-frieze__label"><?= $this->e($label) ?></span>
    <?php endif; ?>
    <span class="qhr-frieze__motif">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v2H2V6zm2 4h3v4H4v-4zm5 0h3v4H9v-4zm5 0h3v4h-3v-4zm5 0h2v4h-2v-4zM2 16h20v2H2v-2z"/></svg>
    </span>
  </div>
</div>

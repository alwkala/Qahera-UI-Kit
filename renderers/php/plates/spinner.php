<?php
/**
 * Qahera UI Kit — Plates Template Partial: Spinner
 *
 * @var League\Plates\Template\Template $this
 * @var string $size (xs|sm|md|lg|xl)
 * @var string $tone (primary|success|warning|danger|info)
 * @var string $label
 * @var string $extraClass
 */
$size = $size ?? 'md';
$tone = $tone ?? 'primary';
$label = $label ?? 'جاري التحميل...';
$extraClass = $extraClass ?? '';
?>
<span class="qhr-spinner qhr-spinner--<?= $this->e($size) ?> qhr-spinner--<?= $this->e($tone) ?> <?= $this->e($extraClass) ?>" role="status" aria-label="<?= $this->e($label) ?>">
  <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">
    <?= $this->e($label) ?>
  </span>
</span>

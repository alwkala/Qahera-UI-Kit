<?php
/**
 * Qahera UI Kit — Plates Template Partial: Cartouche
 *
 * @var League\Plates\Template\Template $this
 * @var string|null $title
 * @var string|null $body
 * @var string|null $footer
 * @var string $variant (elevated|outline|solid)
 * @var string $size (sm|md|lg)
 * @var string $extraClass
 */
$variant = $variant ?? 'elevated';
$size = $size ?? 'md';
$extraClass = $extraClass ?? '';
?>
<div class="qhr-cartouche qhr-cartouche--<?= $this->e($variant) ?> qhr-cartouche--<?= $this->e($size) ?> <?= $this->e($extraClass) ?>" role="region">
  <?php if (!empty($title)): ?>
    <div class="qhr-cartouche__header">
      <h3 class="qhr-cartouche__title"><?= $this->e($title) ?></h3>
    </div>
  <?php endif; ?>

  <?php if (!empty($body)): ?>
    <div class="qhr-cartouche__body">
      <?= $body ?>
    </div>
  <?php endif; ?>

  <?php if (!empty($footer)): ?>
    <div class="qhr-cartouche__footer">
      <?= $footer ?>
    </div>
  <?php endif; ?>

  <div class="qhr-cartouche__knot">
    <div class="qhr-cartouche__knot-bar"></div>
  </div>
</div>

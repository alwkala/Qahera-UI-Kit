<?php
/**
 * Qahera UI Kit — Plates Template Partial: Avatar
 *
 * @var League\Plates\Template\Template $this
 * @var string|null $src
 * @var string $alt
 * @var string|null $initials
 * @var string $size (xs|sm|md|lg|xl)
 * @var string $shape (circle|rounded|square)
 * @var string $extraClass
 */
$size = $size ?? 'md';
$shape = $shape ?? 'circle';
$alt = $alt ?? '';
$extraClass = $extraClass ?? '';
?>
<span class="qhr-avatar qhr-avatar--<?= $this->e($size) ?> qhr-avatar--<?= $this->e($shape) ?> <?= $this->e($extraClass) ?>">
  <?php if (!empty($src)): ?>
    <img src="<?= $this->e($src) ?>" alt="<?= $this->e($alt) ?>" class="qhr-avatar-img">
  <?php elseif (!empty($initials)): ?>
    <span class="qhr-avatar-initials"><?= $this->e($initials) ?></span>
  <?php endif; ?>
</span>

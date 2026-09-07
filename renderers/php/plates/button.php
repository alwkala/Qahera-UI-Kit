<?php
/**
 * Qahera UI Kit — Plates Template Partial: Button
 *
 * @var League\Plates\Template\Template $this
 * @var string $label
 * @var string $variant (primary|secondary|outline|ghost|link|destructive)
 * @var string $size (xs|sm|md|lg|xl)
 * @var string $type (button|submit|reset)
 * @var bool $disabled
 * @var bool $loading
 * @var string|null $iconStart
 * @var string|null $iconEnd
 * @var string $extraClass
 * @var string $attrs
 */
$variant = $variant ?? 'primary';
$tone = $tone ?? null;
$size = $size ?? 'md';
$shape = $shape ?? 'default';
$buttonStyle = $buttonStyle ?? 'solid';
$type = $type ?? 'button';
$disabled = $disabled ?? false;
$loading = $loading ?? false;
$extraClass = $extraClass ?? '';
$attrs = $attrs ?? '';
$isDisabled = $disabled || $loading;

$classes = [
  'qhr-btn',
  'qhr-btn--' . $variant,
  'qhr-btn--' . $size,
  $tone ? 'qhr-btn--tone-' . $tone : '',
  $shape !== 'default' ? 'qhr-btn--' . $shape : '',
  $buttonStyle === 'gradient' ? 'qhr-btn--gradient' : '',
  $buttonStyle === 'light' ? 'qhr-btn--light' : '',
  $buttonStyle === 'outline-light' ? 'qhr-btn--outline-light' : '',
  $loading ? 'is-loading' : '',
  $isDisabled ? 'is-disabled' : '',
  $extraClass
];
$classAttr = trim(preg_replace('/\s+/', ' ', implode(' ', array_filter($classes))));
?>
<button 
  type="<?= $this->e($type) ?>"
  class="<?= $this->e($classAttr) ?>"
  data-variant="<?= $this->e($variant) ?>"
  data-size="<?= $this->e($size) ?>"
  <?= $isDisabled ? 'disabled aria-disabled="true"' : '' ?>
  <?= $loading ? 'aria-busy="true"' : '' ?>
  <?= $attrs ?>
>
  <?php if ($loading): ?>
    <span class="qhr-btn-icon-start">
      <?= $this->insert('qahera::icon', ['name' => 'spinner', 'size' => $size]) ?>
    </span>
  <?php elseif (!empty($iconStart)): ?>
    <span class="qhr-btn-icon-start"><?= $iconStart ?></span>
  <?php endif; ?>

  <?php if (!empty($label)): ?>
    <span class="qhr-btn-label"><?= $this->e($label) ?></span>
  <?php endif; ?>

  <?php if (!$loading && !empty($iconEnd)): ?>
    <span class="qhr-btn-icon-end"><?= $iconEnd ?></span>
  <?php endif; ?>
</button>

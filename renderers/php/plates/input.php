<?php
/**
 * Qahera UI Kit — Plates Template Partial: Input
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var string $type (text|email|password|number|search|tel|url)
 * @var string|null $value
 * @var string|null $placeholder
 * @var string $size (xs|sm|md|lg|xl)
 * @var bool $disabled
 * @var bool $error
 * @var string|null $startAdornment
 * @var string|null $endAdornment
 * @var string $extraClass
 * @var string $attrs
 */
$type = $type ?? 'text';
$size = $size ?? 'md';
$disabled = $disabled ?? false;
$error = $error ?? false;
$extraClass = $extraClass ?? '';
$attrs = $attrs ?? '';
$hasAdornment = !empty($startAdornment) || !empty($endAdornment);
?>
<?php if ($hasAdornment): ?>
  <div class="qhr-input-wrapper qhr-input-wrapper--<?= $this->e($size) ?><?= $error ? ' is-invalid' : '' ?><?= $disabled ? ' is-disabled' : '' ?>">
    <?php if (!empty($startAdornment)): ?>
      <span class="qhr-input-adornment qhr-input-adornment--start"><?= $startAdornment ?></span>
    <?php endif; ?>

    <input 
      type="<?= $this->e($type) ?>"
      name="<?= $this->e($name ?? '') ?>"
      value="<?= $this->e($value ?? '') ?>"
      placeholder="<?= $this->e($placeholder ?? '') ?>"
      class="qhr-input qhr-input--<?= $this->e($size) ?><?= $error ? ' is-invalid' : '' ?> <?= $this->e($extraClass) ?>"
      <?= $disabled ? 'disabled aria-disabled="true"' : '' ?>
      <?= $error ? 'aria-invalid="true"' : '' ?>
      <?= $attrs ?>
    >

    <?php if (!empty($endAdornment)): ?>
      <span class="qhr-input-adornment qhr-input-adornment--end"><?= $endAdornment ?></span>
    <?php endif; ?>
  </div>
<?php else: ?>
  <input 
    type="<?= $this->e($type) ?>"
    name="<?= $this->e($name ?? '') ?>"
    value="<?= $this->e($value ?? '') ?>"
    placeholder="<?= $this->e($placeholder ?? '') ?>"
    class="qhr-input qhr-input--<?= $this->e($size) ?><?= $error ? ' is-invalid' : '' ?> <?= $this->e($extraClass) ?>"
    <?= $disabled ? 'disabled aria-disabled="true"' : '' ?>
    <?= $error ? 'aria-invalid="true"' : '' ?>
    <?= $attrs ?>
  >
<?php endif; ?>

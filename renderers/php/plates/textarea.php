<?php
/**
 * Qahera UI Kit — Plates Template Partial: Textarea
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var string|null $value
 * @var string|null $placeholder
 * @var int $rows
 * @var string $size (xs|sm|md|lg|xl)
 * @var bool $disabled
 * @var bool $error
 * @var string $extraClass
 * @var string $attrs
 */
$rows = $rows ?? 3;
$size = $size ?? 'md';
$disabled = $disabled ?? false;
$error = $error ?? false;
$extraClass = $extraClass ?? '';
$attrs = $attrs ?? '';
?>
<textarea 
  name="<?= $this->e($name ?? '') ?>"
  rows="<?= (int)$rows ?>"
  placeholder="<?= $this->e($placeholder ?? '') ?>"
  class="qhr-textarea qhr-textarea--<?= $this->e($size) ?><?= $error ? ' is-invalid' : '' ?> <?= $this->e($extraClass) ?>"
  <?= $disabled ? 'disabled aria-disabled="true"' : '' ?>
  <?= $error ? 'aria-invalid="true"' : '' ?>
  <?= $attrs ?>
><?= $this->e($value ?? '') ?></textarea>

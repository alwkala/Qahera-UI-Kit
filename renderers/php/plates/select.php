<?php
/**
 * Qahera UI Kit — Plates Template Partial: Select
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var string|null $value
 * @var array $options (array of ['value' => '...', 'label' => '...', 'disabled' => bool])
 * @var string $size (xs|sm|md|lg|xl)
 * @var bool $disabled
 * @var bool $error
 * @var string|null $placeholder
 * @var string $extraClass
 * @var string $attrs
 */
$size = $size ?? 'md';
$disabled = $disabled ?? false;
$error = $error ?? false;
$options = $options ?? [];
$extraClass = $extraClass ?? '';
$attrs = $attrs ?? '';
?>
<div class="qhr-select-wrapper qhr-select-wrapper--<?= $this->e($size) ?>">
  <select 
    name="<?= $this->e($name ?? '') ?>"
    class="qhr-select qhr-select--<?= $this->e($size) ?><?= $error ? ' is-invalid' : '' ?> <?= $this->e($extraClass) ?>"
    <?= $disabled ? 'disabled aria-disabled="true"' : '' ?>
    <?= $error ? 'aria-invalid="true"' : '' ?>
    <?= $attrs ?>
  >
    <?php if (!empty($placeholder)): ?>
      <option value="" disabled <?= empty($value) ? 'selected' : '' ?>><?= $this->e($placeholder) ?></option>
    <?php endif; ?>

    <?php foreach ($options as $opt): ?>
      <?php 
        $optVal = is_array($opt) ? ($opt['value'] ?? '') : $opt;
        $optLabel = is_array($opt) ? ($opt['label'] ?? $optVal) : $opt;
        $optDisabled = is_array($opt) ? ($opt['disabled'] ?? false) : false;
        $isSelected = (string)$optVal === (string)($value ?? '');
      ?>
      <option value="<?= $this->e($optVal) ?>" <?= $isSelected ? 'selected' : '' ?> <?= $optDisabled ? 'disabled' : '' ?>>
        <?= $this->e($optLabel) ?>
      </option>
    <?php endforeach; ?>
  </select>
</div>

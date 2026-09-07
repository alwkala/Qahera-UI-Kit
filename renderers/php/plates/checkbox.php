<?php
/**
 * Qahera UI Kit — Plates Template Partial: Checkbox
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var string|null $value
 * @var bool $checked
 * @var bool $disabled
 * @var string|null $label
 * @var string|null $description
 * @var string $extraClass
 * @var string $attrs
 */
$checked = $checked ?? false;
$disabled = $disabled ?? false;
$extraClass = $extraClass ?? '';
$attrs = $attrs ?? '';
?>
<label class="qhr-checkbox<?= $disabled ? ' is-disabled' : '' ?> <?= $this->e($extraClass) ?>">
  <input 
    type="checkbox" 
    name="<?= $this->e($name ?? '') ?>" 
    value="<?= $this->e($value ?? '1') ?>"
    <?= $checked ? 'checked' : '' ?>
    <?= $disabled ? 'disabled' : '' ?>
    <?= $attrs ?>
  >
  <?php if (!empty($label) || !empty($description)): ?>
    <span class="qhr-checkbox-content">
      <?php if (!empty($label)): ?>
        <span class="qhr-checkbox-label"><?= $this->e($label) ?></span>
      <?php endif; ?>
      <?php if (!empty($description)): ?>
        <span class="qhr-checkbox-desc"><?= $this->e($description) ?></span>
      <?php endif; ?>
    </span>
  <?php endif; ?>
</label>

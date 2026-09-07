<?php
/**
 * Qahera UI Kit — Plates Template Partial: Radio
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var string $value
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
<label class="qhr-radio<?= $disabled ? ' is-disabled' : '' ?> <?= $this->e($extraClass) ?>">
  <input 
    type="radio" 
    name="<?= $this->e($name ?? '') ?>" 
    value="<?= $this->e($value ?? '') ?>"
    <?= $checked ? 'checked' : '' ?>
    <?= $disabled ? 'disabled' : '' ?>
    <?= $attrs ?>
  >
  <?php if (!empty($label) || !empty($description)): ?>
    <span class="qhr-radio-content">
      <?php if (!empty($label)): ?>
        <span class="qhr-radio-label"><?= $this->e($label) ?></span>
      <?php endif; ?>
      <?php if (!empty($description)): ?>
        <span class="qhr-radio-desc"><?= $this->e($description) ?></span>
      <?php endif; ?>
    </span>
  <?php endif; ?>
</label>

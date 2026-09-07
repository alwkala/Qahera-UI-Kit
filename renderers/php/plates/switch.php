<?php
/**
 * Qahera UI Kit — Plates Template Partial: Switch
 *
 * @var League\Plates\Template\Template $this
 * @var string $name
 * @var bool $checked
 * @var string $label
 * @var string $desc
 * @var bool $disabled
 * @var string $extraClass
 */
$name = $name ?? 'switch';
$checked = $checked ?? false;
$disabled = $disabled ?? false;
$label = $label ?? '';
$desc = $desc ?? '';
$extraClass = $extraClass ?? '';
?>
<label class="qhr-switch <?= $this->e($extraClass) ?>" style="<?= $disabled ? 'opacity: 0.5; cursor: not-allowed;' : '' ?>">
  <input
    type="checkbox"
    role="switch"
    name="<?= $this->e($name) ?>"
    class="qhr-switch-input"
    <?= $checked ? 'checked' : '' ?>
    <?= $disabled ? 'disabled' : '' ?>
  >
  <span class="qhr-switch-track" aria-hidden="true">
    <span class="qhr-switch-thumb"></span>
  </span>
  <?php if ($label || $desc): ?>
    <span style="display: flex; flex-direction: column;">
      <?php if ($label): ?>
        <strong style="font-size: var(--qhr-text-sm, 14px); line-height: 1.4;"><?= $this->e($label) ?></strong>
      <?php endif; ?>
      <?php if ($desc): ?>
        <span style="font-size: var(--qhr-text-xs, 12px); color: var(--qhr-text-muted, #94a3b8);"><?= $this->e($desc) ?></span>
      <?php endif; ?>
    </span>
  <?php endif; ?>
</label>

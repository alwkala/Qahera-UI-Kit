<?php
/**
 * Qahera UI Kit — HTMX Button Fragment
 * Pre-wired with hx-* triggers and swaps
 */
$variant = $variant ?? 'primary';
$size = $size ?? 'md';
$action = $action ?? '#';
$target = $target ?? 'this';
$swap = $swap ?? 'outerHTML';
?>
<button 
  type="button"
  class="qhr-btn qhr-btn--<?= $this->e($variant) ?> qhr-btn--<?= $this->e($size) ?>"
  data-variant="<?= $this->e($variant) ?>"
  data-size="<?= $this->e($size) ?>"
  hx-post="<?= $this->e($action) ?>"
  hx-target="<?= $this->e($target) ?>"
  hx-swap="<?= $this->e($swap) ?>"
>
  <span class="qhr-btn-label"><?= $this->e($label ?? 'إرسال الطلب') ?></span>
</button>

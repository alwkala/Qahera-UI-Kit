<?php
/**
 * Qahera UI Kit — HTMX Button Fragment with Animated Spinner Indicator
 * 
 * Pre-wired with hx-* triggers, swaps, disabled state lock, and canonical SVG spinner.
 * 
 * @var string $label Button text
 * @var string $variant 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
 * @var string $size 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @var string $action Target URL for hx-post/hx-get
 * @var string $method 'post' | 'get' | 'put' | 'delete'
 * @var string $target CSS selector for swap target
 * @var string $swap Swap strategy (default 'outerHTML')
 * @var string $indicatorId Optional unique indicator ID
 */

$label = $label ?? 'إرسال الطلب';
$variant = $variant ?? 'primary';
$size = $size ?? 'md';
$method = strtolower($method ?? 'post');
$action = $action ?? '#';
$target = $target ?? 'this';
$swap = $swap ?? 'outerHTML';
$indicatorId = $indicatorId ?? 'qhr-spinner-' . uniqid();
$indicatorSelector = '#' . $indicatorId;

$hxMethodAttr = "hx-{$method}=\"" . htmlspecialchars($action, ENT_QUOTES, 'UTF-8') . "\"";
?>
<button 
  type="button"
  class="qhr-btn qhr-btn--<?= htmlspecialchars($variant, ENT_QUOTES, 'UTF-8') ?> qhr-btn--<?= htmlspecialchars($size, ENT_QUOTES, 'UTF-8') ?>"
  <?= $hxMethodAttr ?>
  hx-target="<?= htmlspecialchars($target, ENT_QUOTES, 'UTF-8') ?>"
  hx-swap="<?= htmlspecialchars($swap, ENT_QUOTES, 'UTF-8') ?>"
  hx-disabled-elt="this"
  hx-indicator="<?= htmlspecialchars($indicatorSelector, ENT_QUOTES, 'UTF-8') ?>"
>
  <span class="qhr-btn-label"><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></span>

  <span id="<?= htmlspecialchars($indicatorId, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn-spinner hx-indicator" style="display: none;" aria-hidden="true">
    <svg class="qhr-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  </span>
</button>

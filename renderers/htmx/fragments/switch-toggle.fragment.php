<?php
/**
 * Qahera UI Kit — HTMX Switch Toggle Fragment
 * 
 * Auto-submits on change via `hx-post` and updates its state in place.
 *
 * @var string $name Field name
 * @var bool $checked Current state
 * @var string $label Setting label
 * @var string $url Post URL
 */
$name = $name ?? 'feature_enabled';
$checked = $checked ?? false;
$label = $label ?? 'تفعيل الميزة الفورية';
$url = $url ?? '/api/settings/toggle';
?>
<label class="qhr-switch">
  <input
    type="checkbox"
    role="switch"
    name="<?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?>"
    class="qhr-switch-input"
    <?= $checked ? 'checked' : '' ?>
    hx-post="<?= htmlspecialchars($url, ENT_QUOTES, 'UTF-8') ?>"
    hx-trigger="change"
    hx-target="closest .qhr-switch"
    hx-swap="outerHTML"
  >
  <span class="qhr-switch-track" aria-hidden="true">
    <span class="qhr-switch-thumb"></span>
  </span>
  <span style="font-size: var(--qhr-text-sm, 14px); font-weight: 600;">
    <?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
  </span>
</label>

<?php
/**
 * Qahera UI Kit — HTMX Out-of-Band Toast Fragment
 * 
 * Appended out-of-band to .qhr-toast-container on any mutation response.
 * Uses hx-swap-oob="beforeend:.qhr-toast-container" with auto-dismiss.
 * 
 * @var string $title Toast title
 * @var string $message Toast body
 * @var string $tone 'neutral' | 'info' | 'success' | 'warning' | 'danger'
 * @var int $duration Auto dismiss duration in milliseconds (default 4000)
 */

$title = $title ?? 'إشعار النظام';
$message = $message ?? '';
$tone = $tone ?? 'info';
$duration = (int)($duration ?? 4000);
$toastId = 'qhr-toast-' . uniqid();

$toneIcons = [
    'info'    => '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
    'success' => '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    'warning' => '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
    'danger'  => '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
    'neutral' => '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
];
$iconSvg = $toneIcons[$tone] ?? $toneIcons['info'];
?>
<div id="<?= htmlspecialchars($toastId, ENT_QUOTES, 'UTF-8') ?>" 
     class="qhr-toast qhr-toast--<?= htmlspecialchars($tone, ENT_QUOTES, 'UTF-8') ?>" 
     hx-swap-oob="beforeend:.qhr-toast-container"
     role="status"
     x-data="{ show: true }"
     x-show="show"
     x-init="setTimeout(() => { show = false; $el.remove(); }, <?= $duration ?>)">
  <span class="qhr-toast-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <?= $iconSvg ?>
    </svg>
  </span>
  <div class="qhr-toast-body">
    <div class="qhr-toast-title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></div>
    <?php if (!empty($message)): ?>
      <div class="qhr-toast-msg"><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>
  </div>
  <button type="button" 
          class="qhr-toast-close" 
          @click="show = false; $el.closest('.qhr-toast').remove()" 
          aria-label="إغلاق الإشعار">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</div>

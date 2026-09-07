<?php
/**
 * Qahera UI Kit — HTMX Dynamic Modal Fragment
 * 
 * Returned dynamically by server handlers into a target container (e.g. #modal-root).
 * Automatically initializes Alpine focus trap and backdrop dismiss.
 * 
 * @var string $title Modal headline
 * @var string $body Modal HTML content
 * @var string $size 'sm' | 'md' | 'lg' | 'xl'
 * @var string $confirmAction URL for confirmation action
 * @var string $confirmLabel Confirmation button label
 * @var string $confirmMethod 'post' | 'delete' | 'put'
 * @var string $confirmVariant 'primary' | 'destructive'
 */

$title = $title ?? 'تأكيد الإجراء';
$body = $body ?? '';
$size = $size ?? 'md';
$confirmAction = $confirmAction ?? '';
$confirmLabel = $confirmLabel ?? 'تأكيد ومتابعة';
$confirmMethod = strtolower($confirmMethod ?? 'post');
$confirmVariant = $confirmVariant ?? 'primary';
?>
<div class="qhr-modal-backdrop" 
     x-data="qhrModal()" 
     x-init="show()" 
     x-show="open" 
     @keydown.escape.window="hide()" 
     @click.self="hide()" 
     x-cloak
     role="presentation">
  <div class="qhr-modal-dialog qhr-modal-dialog--<?= htmlspecialchars($size, ENT_QUOTES, 'UTF-8') ?>" 
       x-ref="dialog" 
       role="dialog" 
       aria-modal="true" 
       tabindex="-1">
    <div class="qhr-modal-header">
      <h3 class="qhr-modal-title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h3>
      <button type="button" class="qhr-modal-close" @click="hide()" aria-label="إغلاق">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="qhr-modal-body">
      <?= $body ?>
    </div>

    <div class="qhr-modal-footer">
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="hide()">إلغاء</button>
      <?php if (!empty($confirmAction)): ?>
        <button 
          type="button" 
          class="qhr-btn qhr-btn--<?= htmlspecialchars($confirmVariant, ENT_QUOTES, 'UTF-8') ?> qhr-btn--sm"
          hx-<?= htmlspecialchars($confirmMethod, ENT_QUOTES, 'UTF-8') ?>="<?= htmlspecialchars($confirmAction, ENT_QUOTES, 'UTF-8') ?>"
          hx-target="closest .qhr-modal-backdrop"
          hx-swap="outerHTML"
        >
          <?= htmlspecialchars($confirmLabel, ENT_QUOTES, 'UTF-8') ?>
        </button>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php
/**
 * Qahera UI Kit — Drawer Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$id = $id ?? 'qhr-drawer-' . bin2hex(random_bytes(4));
$size = $size ?? 'md';
$position = $position ?? 'start';
$title = $title ?? '';
$isOpen = $isOpen ?? false;
?>
<div class="qhr-drawer-backdrop" id="<?= $this->e($id) ?>-backdrop" data-state="<?= $isOpen ? 'open' : 'closed' ?>"></div>
<aside 
  class="qhr-drawer qhr-drawer--<?= $this->e($position) ?> qhr-drawer--<?= $this->e($size) ?>" 
  id="<?= $this->e($id) ?>" 
  data-state="<?= $isOpen ? 'open' : 'closed' ?>"
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="<?= $this->e($id) ?>-title"
>
  <div class="qhr-drawer-header">
    <h3 class="qhr-drawer-title" id="<?= $this->e($id) ?>-title"><?= $this->e($title) ?></h3>
    <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--sm" aria-label="إغلاق اللوحة الجانبية" data-drawer-close="<?= $this->e($id) ?>">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="qhr-drawer-body">
    <?= $slot ?? '' ?>
  </div>
  <?php if (isset($footer)): ?>
    <div class="qhr-drawer-footer">
      <?= $footer ?>
    </div>
  <?php endif; ?>
</aside>

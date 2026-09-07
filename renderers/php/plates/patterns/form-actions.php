<?php
/**
 * Qahera UI Kit — Form Actions Bar Pattern (League/Plates Template)
 * 
 * Standard container for form submission, cancellation, and draft controls.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $submitLabel Label for primary submit button (default 'حفظ التغييرات')
 * @var string $cancelLabel Label for secondary cancel button (default 'إلغاء')
 * @var string $cancelUrl URL for cancellation action (or '#' for back)
 * @var string $extraAction Optional extra action HTML or button
 * @var bool $sticky Whether to pin action bar to bottom of viewport
 * @var string $class Additional CSS classes
 */

$submitLabel = $submitLabel ?? 'حفظ التغييرات';
$cancelLabel = $cancelLabel ?? 'إلغاء';
$cancelUrl = $cancelUrl ?? '#';
$extraAction = $extraAction ?? '';
$sticky = $sticky ?? false;
$class = $class ?? '';

$style = "display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: var(--qhr-space-3); padding-top: var(--qhr-space-6);";
if ($sticky) {
    $style .= " position: sticky; bottom: 0; background: var(--qhr-surface-base); padding: var(--qhr-space-4) var(--qhr-space-6); border-top: 1px solid var(--qhr-border-subtle); z-index: 30; box-shadow: var(--qhr-shadow-md);";
}
?>
<div class="qhr-form-actions <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="group" 
     aria-label="إجراءات النموذج"
     style="<?= $style ?>">
  
  <?php if (!empty($extraAction)): ?>
    <div style="margin-inline-end: auto;">
      <?= $extraAction ?>
    </div>
  <?php endif; ?>

  <?php if (!empty($cancelLabel)): ?>
    <a href="<?= htmlspecialchars($cancelUrl, ENT_QUOTES, 'UTF-8') ?>" 
       class="qhr-btn qhr-btn--secondary qhr-btn--md">
      <span><?= htmlspecialchars($cancelLabel, ENT_QUOTES, 'UTF-8') ?></span>
    </a>
  <?php endif; ?>

  <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--md">
    <?= $this->insert('qahera::icon', ['name' => 'check', 'size' => 18]) ?>
    <span><?= htmlspecialchars($submitLabel, ENT_QUOTES, 'UTF-8') ?></span>
  </button>
</div>

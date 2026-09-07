<?php
/**
 * Qahera UI Kit — Confirmation Dialog Pattern (League/Plates Template)
 * 
 * Gatekeeper modal for destructive and irreversible actions.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $id Dialog identifier
 * @var string $title Confirmation title
 * @var string $description Explanation of the impact of the action
 * @var string $confirmLabel Label for confirmation button (default 'تأكيد الإجراء')
 * @var string $cancelLabel Label for cancel button (default 'إلغاء')
 * @var string $action Target URL for submission
 * @var string $method Form HTTP method (default 'POST')
 * @var bool $destructive Whether action is destructive (danger tone, default true)
 * @var bool $alpine Whether to bind Alpine.js qhrModal() behavior (default true)
 */

$id = $id ?? 'confirm-dialog-' . uniqid();
$title = $title ?? 'تأكيد الإجراء الحساس';
$description = $description ?? 'هل أنت متأكد من رغبتك في متابعة هذا الإجراء؟ لا يمكن التراجع عن هذه الخطوة بعد تنفيذها.';
$confirmLabel = $confirmLabel ?? 'تأكيد الإجراء';
$cancelLabel = $cancelLabel ?? 'إلغاء';
$action = $action ?? '#';
$method = strtoupper($method ?? 'POST');
$destructive = $destructive ?? true;
$alpine = $alpine ?? true;
?>
<div id="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>" 
     class="qhr-modal-backdrop" 
     <?php if ($alpine): ?>
       x-data="qhrModal()" 
       x-show="open" 
       @keydown.escape.window="hide()" 
       @click.self="hide()" 
       x-cloak
     <?php endif; ?>
     role="presentation">
  <div class="qhr-modal-dialog qhr-modal-dialog--sm" 
       <?php if ($alpine): ?>x-ref="dialog"<?php endif; ?>
       role="alertdialog" 
       aria-modal="true" 
       aria-labelledby="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>-title" 
       aria-describedby="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>-desc"
       tabindex="-1">
    
    <div class="qhr-modal-header" style="align-items: flex-start; gap: var(--qhr-space-3);">
      <div style="color: <?= $destructive ? 'var(--qhr-color-danger-600)' : 'var(--qhr-color-warning-600)' ?>; display: inline-flex; margin-top: 2px;">
        <?= $this->insert('qahera::icon', ['name' => $destructive ? 'x-circle' : 'alert-circle', 'size' => 24]) ?>
      </div>
      <div style="flex: 1;">
        <h3 id="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>-title" class="qhr-modal-title" style="margin: 0;">
          <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
        </h3>
        <p id="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>-desc" style="font-size: var(--qhr-text-sm); color: var(--qhr-color-neutral-600); margin: var(--qhr-space-2) 0 0 0;">
          <?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>
        </p>
      </div>
      <button type="button" class="qhr-modal-close" <?php if ($alpine): ?>@click="hide()"<?php endif; ?> aria-label="إغلاق">
        <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 16]) ?>
      </button>
    </div>

    <form action="<?= htmlspecialchars($action, ENT_QUOTES, 'UTF-8') ?>" method="<?= htmlspecialchars($method, ENT_QUOTES, 'UTF-8') ?>">
      <div class="qhr-modal-footer" style="display: flex; justify-content: flex-end; gap: var(--qhr-space-2); padding-top: var(--qhr-space-4);">
        <button type="button" 
                class="qhr-btn qhr-btn--secondary qhr-btn--sm" 
                <?php if ($alpine): ?>@click="hide()"<?php endif; ?>>
          <?= htmlspecialchars($cancelLabel, ENT_QUOTES, 'UTF-8') ?>
        </button>
        <button type="submit" 
                class="qhr-btn qhr-btn--<?= $destructive ? 'destructive' : 'primary' ?> qhr-btn--sm">
          <?= htmlspecialchars($confirmLabel, ENT_QUOTES, 'UTF-8') ?>
        </button>
      </div>
    </form>

  </div>
</div>

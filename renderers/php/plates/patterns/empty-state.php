<?php
/**
 * Qahera UI Kit — Empty State Container Pattern (League/Plates Template)
 * 
 * Provides clear zero-data feedback with immediate recovery or creation action.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $title Empty state headline
 * @var string $description Helpful explanation of next steps
 * @var string $icon Semantic icon name (default 'folder')
 * @var string $actionLabel Label for primary action button
 * @var string $actionUrl URL for primary action
 * @var string $secondaryLabel Optional label for secondary link
 * @var string $secondaryUrl Optional URL for secondary link
 * @var string $class Additional CSS classes
 */

$title = $title ?? 'لا توجد عناصر لعرضها';
$description = $description ?? 'لم يتم العثور على أي سجلات في هذا القسم حالياً. يمكنك البدء بإضافة عنصر جديد.';
$icon = $icon ?? 'folder';
$actionLabel = $actionLabel ?? 'إضافة عنصر جديد';
$actionUrl = $actionUrl ?? '#';
$secondaryLabel = $secondaryLabel ?? '';
$secondaryUrl = $secondaryUrl ?? '#';
$class = $class ?? '';
?>
<div class="qhr-empty-state <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="status" 
     style="padding: var(--qhr-space-12) var(--qhr-space-6); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed var(--qhr-border-subtle); border-radius: var(--qhr-radius-lg); background: var(--qhr-surface-base);">
  
  <div style="width: 56px; height: 56px; border-radius: var(--qhr-radius-full); background: var(--qhr-color-neutral-100); color: var(--qhr-color-neutral-500); display: flex; align-items: center; justify-content: center; margin-bottom: var(--qhr-space-4);">
    <?= $this->insert('qahera::icon', ['name' => $icon, 'size' => 28]) ?>
  </div>

  <h3 style="font-size: var(--qhr-text-lg); font-weight: 600; color: var(--qhr-color-neutral-900); margin: 0 0 var(--qhr-space-2) 0;">
    <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
  </h3>

  <p style="font-size: var(--qhr-text-sm); color: var(--qhr-color-neutral-600); max-width: 420px; margin: 0 0 var(--qhr-space-6) 0; line-height: 1.6;">
    <?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>
  </p>

  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--qhr-space-3);">
    <?php if (!empty($actionLabel)): ?>
      <a href="<?= htmlspecialchars($actionUrl, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--primary qhr-btn--md">
        <?= $this->insert('qahera::icon', ['name' => 'plus', 'size' => 18]) ?>
        <span><?= htmlspecialchars($actionLabel, ENT_QUOTES, 'UTF-8') ?></span>
      </a>
    <?php endif; ?>

    <?php if (!empty($secondaryLabel)): ?>
      <a href="<?= htmlspecialchars($secondaryUrl, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--ghost qhr-btn--md">
        <span><?= htmlspecialchars($secondaryLabel, ENT_QUOTES, 'UTF-8') ?></span>
      </a>
    <?php endif; ?>
  </div>

</div>

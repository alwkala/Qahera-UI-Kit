<?php
/**
 * Qahera UI Kit — Modal Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $id Modal element identifier
 * @var string $title Modal header title
 * @var string $size 'sm' | 'md' | 'lg' | 'xl' (default 'md')
 * @var string $slot Modal body HTML content
 * @var string $body Optional alternative to $slot
 * @var string $footer Optional HTML footer content with action buttons
 * @var bool $alpine Whether to bind Alpine.js qhrModal() behavior (default true)
 * @var string $class Additional CSS classes for dialog
 */

$id = $id ?? 'qhr-modal-' . uniqid();
$title = $title ?? '';
$size = $size ?? 'md';
$slot = $slot ?? $body ?? '';
$footer = $footer ?? '';
$alpine = $alpine ?? true;
$class = $class ?? '';

$dialogClasses = ['qhr-modal-dialog', 'qhr-modal-dialog--' . $size];
if ($class) {
    $dialogClasses[] = $class;
}
$dialogClassAttr = implode(' ', $dialogClasses);
?>
<div id="<?= $this->e($id) ?>" 
     class="qhr-modal-backdrop" 
     <?php if ($alpine): ?>
       x-data="qhrModal()" 
       x-show="open" 
       @keydown.escape.window="hide()" 
       @click.self="hide()" 
       x-cloak
     <?php endif; ?>
     role="presentation">
  <div class="<?= $this->e($dialogClassAttr) ?>" 
       <?php if ($alpine): ?>x-ref="dialog"<?php endif; ?>
       role="dialog" 
       aria-modal="true" 
       <?php if ($title): ?>aria-labelledby="<?= $this->e($id) ?>-title"<?php endif; ?>
       tabindex="-1">
    <?php if ($title): ?>
      <div class="qhr-modal-header">
        <h3 id="<?= $this->e($id) ?>-title" class="qhr-modal-title"><?= $this->e($title) ?></h3>
        <button type="button" 
                class="qhr-modal-close" 
                <?php if ($alpine): ?>@click="hide()"<?php endif; ?>
                aria-label="إغلاق">
          <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 18]) ?>
        </button>
      </div>
    <?php endif; ?>

    <div class="qhr-modal-body">
      <?= $slot ?>
    </div>

    <?php if (!empty($footer)): ?>
      <div class="qhr-modal-footer">
        <?= $footer ?>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php
/**
 * Qahera UI Kit — Toast Component (League/Plates Template)
 * 
 * Can be rendered as:
 * 1. An Alpine-driven live toast container (when $container = true)
 * 2. An individual toast notification element
 * 
 * @var \League\Plates\Template\Template $this
 * @var bool $container Whether to render the Alpine toast container (default false)
 * @var string $title Toast headline
 * @var string $message Optional toast description/message
 * @var string $tone 'neutral' | 'info' | 'success' | 'warning' | 'danger' (default 'info')
 * @var string $icon Optional custom icon name
 * @var bool $dismissible Whether toast includes a close button (default true)
 * @var string $class Additional CSS classes
 */

$container = $container ?? empty($title);
$tone = $tone ?? 'info';
$dismissible = $dismissible ?? true;
$class = $class ?? '';

$defaultIcons = [
    'info'    => 'info',
    'success' => 'check',
    'warning' => 'alert-circle',
    'danger'  => 'x-circle',
    'neutral' => 'info',
];
$iconName = $icon ?? ($defaultIcons[$tone] ?? 'info');
?>
<?php if ($container): ?>
  <div class="qhr-toast-container <?= $this->e($class) ?>" x-data="qhrToast()" aria-live="assertive">
    <template x-for="t in toasts" :key="t.id">
      <div :class="'qhr-toast qhr-toast--' + (t.tone || 'info')" role="status">
        <span class="qhr-toast-icon">
          <?= $this->insert('qahera::icon', ['name' => 'info', 'size' => 18]) ?>
        </span>
        <div class="qhr-toast-body">
          <div class="qhr-toast-title" x-text="t.title"></div>
          <div class="qhr-toast-msg" x-show="t.message" x-text="t.message"></div>
        </div>
        <button type="button" class="qhr-toast-close" @click="remove(t.id)" aria-label="إغلاق الإشعار">
          <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 14]) ?>
        </button>
      </div>
    </template>
  </div>
<?php else: ?>
  <div class="qhr-toast qhr-toast--<?= $this->e($tone) ?> <?= $this->e($class) ?>" role="status">
    <span class="qhr-toast-icon">
      <?= $this->insert('qahera::icon', ['name' => $iconName, 'size' => 18]) ?>
    </span>
    <div class="qhr-toast-body">
      <div class="qhr-toast-title"><?= $this->e($title) ?></div>
      <?php if (!empty($message)): ?>
        <div class="qhr-toast-msg"><?= $this->e($message) ?></div>
      <?php endif; ?>
    </div>
    <?php if ($dismissible): ?>
      <button type="button" class="qhr-toast-close" aria-label="إغلاق الإشعار">
        <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 14]) ?>
      </button>
    <?php endif; ?>
  </div>
<?php endif; ?>

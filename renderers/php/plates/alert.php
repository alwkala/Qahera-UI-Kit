<?php
/**
 * Qahera UI Kit — Plates Template Partial: Alert
 *
 * @var League\Plates\Template\Template $this
 * @var string $message
 * @var string|null $title
 * @var string $tone (info|success|warning|danger|neutral)
 * @var bool $dismissible
 * @var string|null $icon
 * @var string $extraClass
 */
$tone = $tone ?? 'info';
$dismissible = $dismissible ?? false;
$extraClass = $extraClass ?? '';

$defaultIcons = [
    'info' => 'info',
    'success' => 'check',
    'warning' => 'alert-circle',
    'danger' => 'x-circle',
    'neutral' => 'info',
];

$iconName = $icon ?? ($defaultIcons[$tone] ?? 'info');
?>
<div class="qhr-alert qhr-alert--<?= $this->e($tone) ?> <?= $this->e($extraClass) ?>" role="alert" aria-live="polite">
  <div class="qhr-alert-icon">
    <?= $this->insert('qahera::icon', ['name' => $iconName, 'size' => 20]) ?>
  </div>
  <div class="qhr-alert-content">
    <?php if (!empty($title)): ?>
      <div class="qhr-alert-title"><?= $this->e($title) ?></div>
    <?php endif; ?>
    <div class="qhr-alert-message"><?= $this->e($message ?? '') ?></div>
  </div>
  <?php if ($dismissible): ?>
    <button type="button" class="qhr-alert-dismiss" aria-label="إغلاق التنبيه" onclick="this.closest('.qhr-alert').remove()">
      <?= $this->insert('qahera::icon', ['name' => 'close', 'size' => 16]) ?>
    </button>
  <?php endif; ?>
</div>

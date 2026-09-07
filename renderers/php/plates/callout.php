<?php
/**
 * Qahera UI Kit — Plates Template Partial: Callout
 *
 * @var League\Plates\Template\Template $this
 * @var string $title
 * @var string $content
 * @var string $tone (neutral|info|success|warning|danger)
 * @var string|null $icon
 * @var string $extraClass
 */
$title = $title ?? '';
$content = $content ?? '';
$tone = $tone ?? 'neutral';
$extraClass = $extraClass ?? '';

$classes = [
    'qhr-callout',
    $tone !== 'neutral' ? "qhr-callout--{$tone}" : '',
    $extraClass
];
?>
<div class="<?= implode(' ', array_filter($classes)) ?>" role="note">
  <?php if (!empty($icon)): ?>
    <div style="flex-shrink: 0; margin-block-start: 2px;"><?= $icon ?></div>
  <?php endif; ?>
  <div class="qhr-callout-body">
    <?php if ($title): ?>
      <h4 class="qhr-callout-title"><?= $this->e($title) ?></h4>
    <?php endif; ?>
    <div><?= $content ?></div>
  </div>
</div>

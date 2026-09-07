<?php
/**
 * Qahera UI Kit — Plates Template Partial: Progress Bar
 *
 * @var League\Plates\Template\Template $this
 * @var int|float $value (0..100)
 * @var string $size (xxs|xs|sm|md|lg|xl)
 * @var string $tone (primary|neutral|success|warning|danger|info|secondary|purple|luxury)
 * @var bool $striped
 * @var bool $animated
 * @var bool $indeterminate
 * @var bool $vertical
 * @var string|null $label
 * @var bool $showValue
 * @var string $extraClass
 */
$value = max(0, min(100, $value ?? 0));
$size = $size ?? 'md';
$tone = $tone ?? 'primary';
$striped = $striped ?? false;
$animated = $animated ?? false;
$indeterminate = $indeterminate ?? false;
$vertical = $vertical ?? false;
$label = $label ?? null;
$showValue = $showValue ?? false;
$extraClass = $extraClass ?? '';

$classes = [
    'qhr-progress',
    "qhr-progress--{$size}",
    $vertical ? 'qhr-progress--vertical' : '',
    $tone !== 'primary' ? "qhr-progress--{$tone}" : '',
    $striped ? 'qhr-progress--striped' : '',
    $animated ? 'qhr-progress--animated' : '',
    $indeterminate ? 'qhr-progress--indeterminate' : '',
    $extraClass
];

$barStyle = $indeterminate
    ? ''
    : ($vertical ? "height: {$value}%;" : "width: {$value}%;");
?>
<?php if ($label || ($showValue && $size !== 'xl' && !$vertical)): ?>
<div class="qhr-progress-wrapper">
  <div class="qhr-progress-header">
    <?php if ($label): ?><span class="qhr-progress-title"><?= htmlspecialchars($label) ?></span><?php endif; ?>
    <?php if ($showValue && !$indeterminate): ?><span class="qhr-progress-val"><?= round($value) ?>%</span><?php endif; ?>
  </div>
<?php endif; ?>

  <div class="<?= implode(' ', array_filter($classes)) ?>" role="progressbar" <?php if (!$indeterminate): ?>aria-valuenow="<?= $value ?>" aria-valuemin="0" aria-valuemax="100"<?php endif; ?>>
    <div class="qhr-progress-bar" <?php if ($barStyle): ?>style="<?= $barStyle ?>"<?php endif; ?>>
      <?php if (!$vertical && $size === 'xl' && $showValue && !$indeterminate): ?><?= round($value) ?>%<?php endif; ?>
    </div>
  </div>

<?php if ($label || ($showValue && $size !== 'xl' && !$vertical)): ?>
</div>
<?php endif; ?>

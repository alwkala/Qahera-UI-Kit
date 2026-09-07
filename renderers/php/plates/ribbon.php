<?php
/**
 * Qahera UI Kit — Plates Template Partial: Ribbon
 *
 * @var League\Plates\Template\Template $this
 * @var string $label
 * @var string $variant (folded|corner|bookmark|flat)
 * @var string $placement (start|end)
 * @var string $tone (primary|neutral|dark|success|info|warning|danger|luxury)
 * @var string $extraClass
 */
$label = $label ?? '';
$variant = $variant ?? 'folded';
$placement = $placement ?? 'start';
$tone = $tone ?? 'primary';
$extraClass = $extraClass ?? '';

$variantClass = ($variant === 'folded' || $variant === 'corner')
    ? "qhr-ribbon--{$variant}-{$placement}"
    : "qhr-ribbon--{$variant}";

$classes = [
    'qhr-ribbon',
    $variantClass,
    $tone !== 'primary' ? "qhr-ribbon--{$tone}" : '',
    $extraClass
];
?>
<div class="<?= implode(' ', array_filter($classes)) ?>" role="status">
  <?= $this->e($label) ?>
</div>

<?php
/**
 * Qahera UI Kit — Plates Template Partial: Badge
 *
 * @var League\Plates\Template\Template $this
 * @var string $label
 * @var string $variant (default|primary|secondary|destructive|outline|subtle)
 * @var string $tone (primary|secondary|info|success|danger|warning|light|dark|grey)
 * @var string $size (sm|md|lg|xl)
 * @var string $shape (default|pill)
 * @var string|null $href
 * @var string|null $icon
 * @var string $extraClass
 */
$variant = $variant ?? 'default';
$tone = $tone ?? ($variant === 'destructive' ? 'danger' : ($variant === 'secondary' ? 'secondary' : 'primary'));
$size = $size ?? 'md';
$shape = $shape ?? 'default';
$extraClass = $extraClass ?? '';
$href = $href ?? null;

$classes = ['qhr-badge'];
if ($tone) $classes[] = 'qhr-badge--' . $this->e($tone);
if ($variant === 'outline') $classes[] = 'qhr-badge--outline';
if ($variant === 'subtle') $classes[] = 'qhr-badge--subtle';
if ($variant === 'destructive') $classes[] = 'qhr-badge--destructive';
if ($size) $classes[] = 'qhr-badge--' . $this->e($size);
if ($shape === 'pill') $classes[] = 'qhr-badge--pill';
if ($extraClass) $classes[] = $this->e($extraClass);

$tag = $href ? 'a' : 'span';
$classAttr = implode(' ', $classes);
?>
<<?= $tag ?> class="<?= $classAttr ?>"<?= $href ? ' href="' . $this->e($href) . '"' : '' ?>>
  <?php if (!empty($icon)): ?>
    <span class="qhr-badge-icon"><?= $icon ?></span>
  <?php endif; ?>
  <span><?= $this->e($label ?? '') ?></span>
</<?= $tag ?>>

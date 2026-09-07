<?php
/**
 * Qahera UI Kit — Tooltip Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $text Tooltip content text
 * @var string $content Optional alternative to $text
 * @var string $position 'top' | 'bottom' | 'start' | 'end' (default 'top')
 * @var string $variant 'dark' | 'light' (default 'dark')
 * @var string $slot Trigger element HTML content
 * @var bool $alpine Whether to include Alpine.js qhrTooltip() behavior (default true)
 * @var string $class Additional CSS classes
 */

$text = $text ?? $content ?? '';
$position = $position ?? 'top';
$variant = $variant ?? 'dark';
$slot = $slot ?? '';
$alpine = $alpine ?? true;
$class = $class ?? '';

$tooltipClasses = [
    'qhr-tooltip',
    'qhr-tooltip--' . $position,
    'qhr-tooltip--' . $variant,
];
$tooltipClassAttr = implode(' ', $tooltipClasses);
?>
<div class="qhr-tooltip-wrapper <?= $this->e($class) ?>"
     <?php if ($alpine): ?>
       x-data="qhrTooltip()"
       @mouseenter="show()"
       @mouseleave="hide()"
       @focusin="show()"
       @focusout="hide()"
     <?php endif; ?>>
  <?= $slot ?>
  <div class="<?= $this->e($tooltipClassAttr) ?>" 
       role="tooltip"
       <?php if ($alpine): ?>x-show="visible" x-cloak<?php endif; ?>>
    <?= $this->e($text) ?>
  </div>
</div>

<?php
/**
 * Qahera UI Kit — CanvasSparks Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var int $count Number of particles (default 35)
 * @var string $variant 'default' | 'emerald'
 * @var string $class Additional CSS classes
 */

$count = (int)($count ?? 35);
$variant = $variant ?? 'default';
$class = $class ?? '';
?>
<div class="qhr-canvas-sparks-wrapper <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     x-data="qhrCanvasSparks({ count: <?= $count ?> })" 
     style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
  <canvas x-ref="canvas" aria-hidden="true" style="width: 100%; height: 100%; display: block;"></canvas>
</div>

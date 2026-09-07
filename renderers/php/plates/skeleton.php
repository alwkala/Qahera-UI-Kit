<?php
/**
 * Qahera UI Kit — Skeleton Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$shape = $shape ?? 'rectangular';
$width = $width ?? '100%';
$height = $height ?? '20px';
?>
<div 
  class="qhr-skeleton <?= $shape !== 'rectangular' ? 'qhr-skeleton--' . $this->e($shape) : '' ?>" 
  style="width: <?= $this->e($width) ?>; height: <?= $this->e($height) ?>;" 
  role="status" 
  aria-busy="true" 
  aria-label="جاري تحميل المحتوى"
></div>

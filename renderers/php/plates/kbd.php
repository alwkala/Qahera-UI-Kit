<?php
/**
 * Qahera UI Kit — Kbd Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$key = $key ?? '';
$size = $size ?? 'md';
?>
<kbd class="qhr-kbd qhr-kbd--<?= $this->e($size) ?>"><?= $this->e($key) ?></kbd>

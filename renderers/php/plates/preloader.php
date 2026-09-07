<?php
/**
 * Qahera UI Kit — Preloader Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $logoText Logo brand name
 * @var string $logoSubtext Secondary English subtitle
 * @var string $variant 'default' | 'luxury'
 * @var string $class Additional CSS classes
 */

$logoText = $logoText ?? 'قاهرة';
$logoSubtext = $logoSubtext ?? 'QAHERA DESIGN SYSTEM';
$variant = $variant ?? 'luxury';
$class = $class ?? '';
?>
<div 
  class="qhr-preloader qhr-preloader--<?= htmlspecialchars($variant, ENT_QUOTES, 'UTF-8') ?> <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>"
  x-data="qhrPreloader()"
  x-show="visible"
  x-transition:leave="transition ease-in duration-500"
  x-transition:leave-start="opacity-100"
  x-transition:leave-end="opacity-0"
  role="status"
  aria-live="polite"
  style="position: fixed; inset: 0; background-color: #0F0B09; z-index: 9999; display: flex; align-items: center; justify-content: center;"
>
  <div style="text-align: center; width: 280px;">
    <div style="margin-bottom: 24px;">
      <div style="font-family: var(--qhr-font-family-display, serif); font-size: 42px; font-weight: 700; color: var(--qhr-color-gold, #D4AF37);">
        <?= htmlspecialchars($logoText, ENT_QUOTES, 'UTF-8') ?>
      </div>
      <div style="font-size: 12px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--qhr-color-text-secondary, #B9A896); margin-top: 4px;">
        <?= htmlspecialchars($logoSubtext, ENT_QUOTES, 'UTF-8') ?>
      </div>
    </div>

    <div style="width: 100%; height: 2px; background-color: rgba(255, 255, 255, 0.08); margin-bottom: 12px; position: relative; overflow: hidden; border-radius: 2px;">
      <div 
        style="position: absolute; top: 0; left: 0; height: 100%; background-color: var(--qhr-color-gold, #D4AF37); transition: width 0.1s linear; box-shadow: 0 0 10px #F2C94C;"
        :style="'width: ' + progress + '%'"></div>
    </div>

    <div style="font-family: monospace; font-size: 12px; color: var(--qhr-color-gold, #D4AF37); font-weight: 700;" x-text="progress + '%'">
      0%
    </div>
  </div>
</div>

<?php
/**
 * Qahera UI Kit — BackToTop Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var int $threshold Scroll threshold in pixels (default 350)
 * @var string $variant 'default' | 'luxury'
 * @var string $class Additional CSS classes
 */

$threshold = (int)($threshold ?? 350);
$variant = $variant ?? 'luxury';
$class = $class ?? '';
$isLuxury = $variant === 'luxury';
?>
<button
  type="button"
  class="qhr-back-to-top qhr-back-to-top--<?= htmlspecialchars($variant, ENT_QUOTES, 'UTF-8') ?> <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>"
  x-data="qhrBackToTop({ threshold: <?= $threshold ?> })"
  x-show="visible"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 translate-y-4"
  x-transition:enter-end="opacity-100 translate-y-0"
  x-transition:leave="transition ease-in duration-200"
  x-transition:leave-start="opacity-100 translate-y-0"
  x-transition:leave-end="opacity-0 translate-y-4"
  @click="scrollToTop()"
  aria-label="العودة لأعلى الصفحة"
  style="position: fixed; inset-inline-end: 24px; bottom: 24px; z-index: 900; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; background-color: <?= $isLuxury ? '#17120F' : 'var(--qhr-color-surface-elevated, #17120F)' ?>; border: <?= $isLuxury ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--qhr-color-border)' ?>; color: <?= $isLuxury ? '#D4AF37' : 'var(--qhr-color-text)' ?>; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);"
>
  <?= $this->insert('qahera::icon', ['name' => 'chevron-up', 'size' => 20]) ?>
</button>

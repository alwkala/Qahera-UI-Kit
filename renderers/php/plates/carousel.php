<?php
/**
 * Qahera UI Kit — Plates Template Partial: Carousel (Alpine.js driven)
 *
 * @var League\Plates\Template\Template $this
 * @var array $slides [ ['title' => '...', 'desc' => '...', 'image' => '...'] ]
 * @var string $extraClass
 */
$slides = $slides ?? [];
$extraClass = $extraClass ?? '';
?>
<div class="qhr-carousel <?= $this->e($extraClass) ?>" x-data="{
  active: 0,
  slidesCount: <?= count($slides) ?>,
  prev() { this.active = this.active === 0 ? this.slidesCount - 1 : this.active - 1; },
  next() { this.active = this.active === this.slidesCount - 1 ? 0 : this.active + 1; }
}">
  <div class="qhr-carousel-track" :style="'transform: translateX(' + (active * 100) + '%);'">
    <?php foreach ($slides as $index => $slide): ?>
      <div class="qhr-carousel-slide" style="padding: var(--qhr-space-8, 32px); text-align: center;">
        <?php if (!empty($slide['title'])): ?>
          <h3 style="font-family: var(--qhr-font-heading, 'El Messiri', serif); font-size: var(--qhr-text-xl, 20px); color: var(--qhr-color-primary-base, #c7a35a); margin: 0 0 8px;">
            <?= $this->e($slide['title']) ?>
          </h3>
        <?php endif; ?>
        <?php if (!empty($slide['desc'])): ?>
          <p style="font-size: var(--qhr-text-sm, 14px); color: var(--qhr-text-secondary, #cbd5e1); margin: 0;">
            <?= $this->e($slide['desc']) ?>
          </p>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>

  <button type="button" class="qhr-carousel-control qhr-carousel-control--prev" @click="prev()" aria-label="السابق">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button type="button" class="qhr-carousel-control qhr-carousel-control--next" @click="next()" aria-label="التالي">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>

  <div class="qhr-carousel-indicators">
    <?php for ($i = 0; $i < count($slides); $i++): ?>
      <button type="button" class="qhr-carousel-dot" :class="active === <?= $i ?> ? 'is-active' : ''" @click="active = <?= $i ?>" aria-label="الشريحة <?= $i + 1 ?>"></button>
    <?php endfor; ?>
  </div>
</div>

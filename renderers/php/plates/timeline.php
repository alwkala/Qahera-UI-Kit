<?php
/**
 * Qahera UI Kit — Plates Template Partial: Timeline
 *
 * @var League\Plates\Template\Template $this
 * @var array $items [ ['title' => '...', 'time' => '...', 'icon' => '...', 'content' => '...'] ]
 * @var bool $horizontal
 * @var string $extraClass
 */
$items = $items ?? [];
$horizontal = $horizontal ?? false;
$extraClass = $extraClass ?? '';

$classes = [
    'qhr-timeline',
    $horizontal ? 'qhr-timeline--horizontal' : '',
    $extraClass
];
?>
<ul class="<?= implode(' ', array_filter($classes)) ?>">
  <?php foreach ($items as $item): ?>
    <li class="qhr-timeline-item">
      <div class="qhr-timeline-dot">
        <?php if (!empty($item['icon'])): ?>
          <?= $item['icon'] ?>
        <?php else: ?>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: currentColor;"></span>
        <?php endif; ?>
      </div>
      <div class="qhr-timeline-content">
        <div class="qhr-timeline-title"><?= $this->e($item['title'] ?? '') ?></div>
        <?php if (!empty($item['time'])): ?>
          <div class="qhr-timeline-time"><?= $this->e($item['time']) ?></div>
        <?php endif; ?>
        <?php if (!empty($item['content'])): ?>
          <div style="margin-block-start: 6px;"><?= $item['content'] ?></div>
        <?php endif; ?>
      </div>
    </li>
  <?php endforeach; ?>
</ul>

<?php
/**
 * Qahera UI Kit — Dock Component (League/Plates Template)
 * 
 * Bottom navigation bar designed for handheld and mobile viewports.
 * 
 * @var \League\Plates\Template\Template|object $this
 * @var array $items Array of dock items [['label' => '...', 'href' => '#', 'icon' => '...', 'badge' => null, 'active' => false]]
 * @var string $variant 'default' | 'fixed' | 'floating' | 'rounded' | 'pills' | 'glass' | 'center-fab' | 'luxury-gold' (default 'fixed')
 * @var string $size 'sm' | 'md' | 'lg' (default 'md')
 * @var string $centerAction Optional center FAB action HTML
 * @var string $ariaLabel Accessible label (default 'شريط التنقل السفلي')
 * @var string $class Additional CSS classes
 */

$items = $items ?? [];
$variant = $variant ?? 'fixed';
$size = $size ?? 'md';
$centerAction = $centerAction ?? '';
$ariaLabel = $ariaLabel ?? 'شريط التنقل السفلي';
$class = $class ?? '';

$classes = ['qhr-dock'];
if ($variant && $variant !== 'default') {
    $classes[] = 'qhr-dock--' . $variant;
}
if ($size && $size !== 'md') {
    $classes[] = 'qhr-dock--' . $size;
}
if ($class) {
    $classes[] = $class;
}
$classAttr = implode(' ', $classes);
$totalItems = count($items);
$midPoint = (int) floor($totalItems / 2);
?>
<nav class="<?= $this->e($classAttr) ?>" aria-label="<?= $this->e($ariaLabel) ?>">
  <?php foreach ($items as $idx => $item): ?>
    <?php if ($centerAction && $idx === $midPoint): ?>
      <div class="qhr-dock-fab-wrap">
        <?= $centerAction ?>
      </div>
    <?php endif; ?>

    <?php
      $isActive = !empty($item['active']);
      $href = $item['href'] ?? '#';
      $label = $item['label'] ?? '';
      $badge = $item['badge'] ?? null;
      $icon = $item['icon'] ?? null;
    ?>
    <a href="<?= $this->e($href) ?>" 
       class="qhr-dock-item <?= $isActive ? 'is-active' : '' ?>"
       <?= $isActive ? 'aria-current="page"' : '' ?>>
      <div class="qhr-dock-icon-wrap">
        <?php if ($icon): ?>
          <?php if (str_starts_with(trim($icon), '<svg')): ?>
            <?= $icon ?>
          <?php else: ?>
            <?= $this->insert('qahera::icon', ['name' => $icon, 'size' => 22]) ?>
          <?php endif; ?>
        <?php endif; ?>

        <?php if ($badge !== null && $badge !== ''): ?>
          <span class="qhr-dock-badge"><?= $this->e((string) $badge) ?></span>
        <?php endif; ?>
      </div>
      <span class="qhr-dock-label"><?= $this->e($label) ?></span>
    </a>
  <?php endforeach; ?>
</nav>

<?php
/**
 * Qahera UI Kit — Navbar Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var array|string $brand Brand name or config ['title' => '...', 'href' => '#', 'avatar' => 'ق']
 * @var array $links Array of navigation links [['label' => '...', 'href' => '#', 'active' => false]]
 * @var string $actions Optional HTML actions slot (buttons, switches, profile menu)
 * @var string $variant 'default' | 'transparent' (default 'default')
 * @var bool $alpine Whether to include Alpine mobile drawer behavior (default true)
 * @var string $class Additional CSS classes
 */

$brand = $brand ?? 'قاهرة';
$links = $links ?? [];
$actions = $actions ?? '';
$variant = $variant ?? 'default';
$alpine = $alpine ?? true;
$class = $class ?? '';

$classes = ['qhr-navbar'];
if ($variant === 'transparent') {
    $classes[] = 'qhr-navbar--transparent';
}
if ($class) {
    $classes[] = $class;
}
$classAttr = implode(' ', $classes);
?>
<header class="<?= $this->e($classAttr) ?>" <?php if ($alpine): ?>x-data="qhrNavbar()" @keydown.escape="close()"<?php endif; ?> role="banner">
  <div class="qhr-navbar-container">
    <a href="<?= is_array($brand) ? $this->e($brand['href'] ?? '#') : '#' ?>" class="qhr-navbar-brand">
      <?php if (is_array($brand) && !empty($brand['avatar'])): ?>
        <span class="qhr-avatar qhr-avatar--rounded qhr-avatar--sm"><?= $this->e($brand['avatar']) ?></span>
      <?php endif; ?>
      <span><?= is_array($brand) ? $this->e($brand['title'] ?? '') : $this->e($brand) ?></span>
    </a>

    <?php if (!empty($links)): ?>
      <ul class="qhr-navbar-links" role="navigation">
        <?php foreach ($links as $link): ?>
          <li>
            <a href="<?= $this->e($link['href'] ?? '#') ?>" 
               class="qhr-navbar-link <?= !empty($link['active']) ? 'is-active' : '' ?>">
              <?= $this->e($link['label'] ?? '') ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <div class="qhr-navbar-actions">
      <?= $actions ?>
      <?php if (!empty($links) && $alpine): ?>
        <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--sm qhr-navbar-toggle" @click="toggle()" aria-label="تبديل القائمة">
          <?= $this->insert('qahera::icon', ['name' => 'menu', 'size' => 20]) ?>
        </button>
      <?php endif; ?>
    </div>
  </div>
</header>

<?php
/**
 * Qahera UI Kit — Menu Component (League/Plates Template)
 * 
 * Vertical or horizontal structured list of navigational links with submenus, badges, and headers.
 * 
 * @var \League\Plates\Template\Template|object $this
 * @var array $items Array of items [['label' => '...', 'href' => '#', 'icon' => '', 'badge' => null, 'active' => false, 'disabled' => false, 'is_title' => false, 'is_divider' => false, 'items' => []]]
 * @var string $variant 'default' | 'vertical' | 'horizontal' | 'compact' | 'bordered' | 'pills' | 'khedivial' | 'brutalist' (default 'vertical')
 * @var string $size 'sm' | 'md' | 'lg' (default 'md')
 * @var string $ariaLabel Accessible label (default 'قائمة التنقل')
 * @var string $class Additional CSS classes
 */

$items = $items ?? [];
$variant = $variant ?? 'vertical';
$size = $size ?? 'md';
$ariaLabel = $ariaLabel ?? 'قائمة التنقل';
$class = $class ?? '';

$menuClasses = ['qhr-menu'];
if ($variant && $variant !== 'default') {
    $menuClasses[] = 'qhr-menu--' . $variant;
}
if ($size && $size !== 'md') {
    $menuClasses[] = 'qhr-menu--' . $size;
}
if ($class) {
    $menuClasses[] = $class;
}
$menuClassAttr = implode(' ', $menuClasses);
?>
<nav class="qhr-menu-nav" aria-label="<?= $this->e($ariaLabel) ?>">
  <ul class="<?= $this->e($menuClassAttr) ?>" role="menu">
    <?php foreach ($items as $item): ?>
      <?php if (!empty($item['is_divider'])): ?>
        <li class="qhr-menu-divider" role="separator"></li>
      <?php elseif (!empty($item['is_title'])): ?>
        <li class="qhr-menu-title" role="presentation"><?= $this->e($item['label'] ?? '') ?></li>
      <?php else: ?>
        <?php
          $isActive = !empty($item['active']);
          $isDisabled = !empty($item['disabled']);
          $hasSubmenu = !empty($item['items']) && is_array($item['items']);
        ?>
        <li class="qhr-menu-item" role="none">
          <a href="<?= $this->e($item['href'] ?? '#') ?>" 
             class="qhr-menu-link <?= $isActive ? 'is-active' : '' ?> <?= $isDisabled ? 'is-disabled' : '' ?>"
             <?= $isActive ? 'aria-current="page"' : '' ?>
             role="menuitem"
             <?= $isDisabled ? 'aria-disabled="true" tabindex="-1"' : '' ?>>
            <?php if (!empty($item['icon'])): ?>
              <span class="qhr-menu-icon" aria-hidden="true">
                <?php if (str_starts_with(trim($item['icon']), '<svg')): ?>
                  <?= $item['icon'] ?>
                <?php else: ?>
                  <?= $this->insert('qahera::icon', ['name' => $item['icon'], 'size' => 18]) ?>
                <?php endif; ?>
              </span>
            <?php endif; ?>

            <span class="qhr-menu-label"><?= $this->e($item['label'] ?? '') ?></span>

            <?php if (!empty($item['badge'])): ?>
              <?php if (is_array($item['badge'])): ?>
                <?= $this->insert('qahera::badge', $item['badge']) ?>
              <?php elseif (str_starts_with(trim((string) $item['badge']), '<')): ?>
                <?= $item['badge'] ?>
              <?php else: ?>
                <span class="qhr-badge qhr-badge--primary qhr-badge--xs qhr-menu-badge"><?= $this->e((string) $item['badge']) ?></span>
              <?php endif; ?>
            <?php endif; ?>
          </a>

          <?php if ($hasSubmenu): ?>
            <ul class="qhr-menu-sub" role="menu">
              <?php foreach ($item['items'] as $subItem): ?>
                <?php $isSubActive = !empty($subItem['active']); ?>
                <li class="qhr-menu-item" role="none">
                  <a href="<?= $this->e($subItem['href'] ?? '#') ?>" 
                     class="qhr-menu-link <?= $isSubActive ? 'is-active' : '' ?>"
                     <?= $isSubActive ? 'aria-current="page"' : '' ?>
                     role="menuitem">
                    <?php if (!empty($subItem['icon'])): ?>
                      <span class="qhr-menu-icon" aria-hidden="true">
                        <?= str_starts_with(trim($subItem['icon']), '<svg') ? $subItem['icon'] : $this->insert('qahera::icon', ['name' => $subItem['icon'], 'size' => 16]) ?>
                      </span>
                    <?php endif; ?>
                    <span class="qhr-menu-label"><?= $this->e($subItem['label'] ?? '') ?></span>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
        </li>
      <?php endif; ?>
    <?php endforeach; ?>
  </ul>
</nav>

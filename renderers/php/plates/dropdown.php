<?php
/**
 * Qahera UI Kit — Dropdown Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string|array $trigger HTML button trigger or config array ['label' => '...', 'variant' => 'secondary']
 * @var array $items Array of dropdown item definitions [['label' => '...', 'href' => '...', 'destructive' => false]]
 * @var string $slot Raw HTML menu content if $items is empty
 * @var bool $alpine Whether to include Alpine.js qhrDropdown() bindings (default true)
 * @var bool $dropup Whether menu opens upward (default false)
 * @var string $align Menu alignment: 'start' or 'end' (default 'start')
 * @var bool $noCaret Whether to hide trigger caret icon (default false)
 * @var string $class Additional CSS classes
 */

$trigger = $trigger ?? 'القائمة';
$items = $items ?? [];
$slot = $slot ?? '';
$alpine = $alpine ?? true;
$dropup = $dropup ?? false;
$align = $align ?? 'start';
$noCaret = $noCaret ?? false;
$class = $class ?? '';

$classes = ['qhr-dropdown'];
if ($dropup) {
    $classes[] = 'dropup qhr-dropdown--dropup';
}
if ($class) {
    $classes[] = $class;
}
$classAttr = implode(' ', $classes);

$menuClasses = ['qhr-dropdown-menu'];
if ($align === 'end') {
    $menuClasses[] = 'qhr-dropdown-menu--end dropdown-menu-end';
}
$menuClassAttr = implode(' ', $menuClasses);
?>
<div class="<?= $this->e($classAttr) ?>" 
     <?php if ($alpine): ?>
       x-data="qhrDropdown()" 
       @click.outside="close()" 
       @keydown.escape="close()"
     <?php endif; ?>>
  <?php if (is_array($trigger)): ?>
    <?php
      $btnClasses = [
        'qhr-btn',
        'qhr-btn--' . ($trigger['variant'] ?? 'secondary'),
        'qhr-btn--' . ($trigger['size'] ?? 'md'),
      ];
      if ($noCaret) $btnClasses[] = 'no-caret qhr-dropdown-toggle--no-caret';
    ?>
    <button type="button" 
            class="<?= implode(' ', $btnClasses) ?>"
            <?php if ($alpine): ?>x-ref="trigger" @click="toggle()"<?php endif; ?>
            aria-haspopup="menu">
      <?php if (!empty($trigger['icon'])): ?>
        <?= $this->insert('qahera::icon', ['name' => $trigger['icon'], 'size' => 16]) ?>
      <?php endif; ?>
      <span><?= $this->e($trigger['label'] ?? '') ?></span>
      <?php if (!$noCaret): ?>
        <?= $this->insert('qahera::icon', ['name' => $dropup ? 'chevron-up' : 'chevron-down', 'size' => 14, 'class' => 'qhr-dropdown-caret']) ?>
      <?php endif; ?>
    </button>
  <?php else: ?>
    <?= $trigger ?>
  <?php endif; ?>

  <div class="<?= $this->e($menuClassAttr) ?>" 
       <?php if ($alpine): ?>
         x-ref="menu" 
         x-show="open" 
         x-cloak
       <?php endif; ?>
       role="menu">
    <?php if (!empty($items)): ?>
      <?php foreach ($items as $item): ?>
        <?php if (!empty($item['header'])): ?>
          <div class="qhr-dropdown-header"><?= $this->e($item['label'] ?? $item['header']) ?></div>
        <?php elseif (!empty($item['separator']) || !empty($item['divider'])): ?>
          <div class="qhr-dropdown-divider" role="separator"></div>
        <?php else: ?>
          <?php
            $itemClasses = ['qhr-dropdown-item'];
            if (!empty($item['destructive'])) $itemClasses[] = 'qhr-dropdown-item--destructive';
            if (!empty($item['active'])) $itemClasses[] = 'active is-active';
            if (!empty($item['disabled'])) $itemClasses[] = 'disabled is-disabled';
            $itemClassAttr = implode(' ', $itemClasses);
            $isDisabled = !empty($item['disabled']);
          ?>
          <?php if (!empty($item['href']) && !$isDisabled): ?>
            <a href="<?= $this->e($item['href']) ?>" 
               class="<?= $itemClassAttr ?>" 
               role="menuitem">
              <?php if (!empty($item['icon'])): ?>
                <span class="qhr-dropdown-item-icon">
                  <?= $this->insert('qahera::icon', ['name' => $item['icon'], 'size' => 15]) ?>
                </span>
              <?php endif; ?>
              <span style="flex: 1;"><?= $this->e($item['label'] ?? '') ?></span>
              <?php if (!empty($item['badge'])): ?>
                <span class="qhr-dropdown-item-badge">
                  <span class="qhr-badge qhr-badge--<?= $this->e($item['badgeTone'] ?? 'primary') ?> qhr-badge--sm"><?= $this->e($item['badge']) ?></span>
                </span>
              <?php endif; ?>
            </a>
          <?php else: ?>
            <button type="button" 
                    class="<?= $itemClassAttr ?>" 
                    <?php if ($isDisabled): ?>disabled aria-disabled="true"<?php endif; ?>
                    <?php if (!empty($item['action']) && !$isDisabled): ?>onclick="<?= $this->e($item['action']) ?>"<?php endif; ?>
                    role="menuitem">
              <?php if (!empty($item['icon'])): ?>
                <span class="qhr-dropdown-item-icon">
                  <?= $this->insert('qahera::icon', ['name' => $item['icon'], 'size' => 15]) ?>
                </span>
              <?php endif; ?>
              <span style="flex: 1;"><?= $this->e($item['label'] ?? '') ?></span>
              <?php if (!empty($item['badge'])): ?>
                <span class="qhr-dropdown-item-badge">
                  <span class="qhr-badge qhr-badge--<?= $this->e($item['badgeTone'] ?? 'primary') ?> qhr-badge--sm"><?= $this->e($item['badge']) ?></span>
                </span>
              <?php endif; ?>
            </button>
          <?php endif; ?>
        <?php endif; ?>
      <?php endforeach; ?>
    <?php else: ?>
      <?= $slot ?>
    <?php endif; ?>
  </div>
</div>

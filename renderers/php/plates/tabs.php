<?php
/**
 * Qahera UI Kit — Tabs Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $tabs Array of tabs [['label' => '...', 'content' => '...']]
 * @var int $defaultTab Default active tab index (default 0)
 * @var bool $alpine Whether to include Alpine.js qhrTabs() bindings (default true)
 * @var string $class Additional CSS classes
 * @var string $slot Raw HTML content if custom tabs structure is used
 */

$tabs = $tabs ?? [];
$defaultTab = (int)($defaultTab ?? 0);
$alpine = $alpine ?? true;
$class = $class ?? '';
$slot = $slot ?? '';

$classes = ['qhr-tabs'];
if ($class) {
    $classes[] = $class;
}
$classAttr = implode(' ', $classes);
?>
<div class="<?= $this->e($classAttr) ?>" 
     <?php if ($alpine): ?>x-data="qhrTabs(<?= $defaultTab ?>)"<?php endif; ?>>
  <?php if (!empty($tabs)): ?>
    <div class="qhr-tablist" role="tablist" <?php if ($alpine): ?>@keydown="nextTab($event)"<?php endif; ?>>
      <?php foreach ($tabs as $idx => $tab): ?>
        <button type="button" 
                role="tab" 
                class="qhr-tab-btn <?= (!$alpine && $idx === $defaultTab) ? 'is-active' : '' ?>"
                <?php if ($alpine): ?>
                  :class="{ 'is-active': activeTab === <?= $idx ?> }"
                  @click="setTab(<?= $idx ?>)"
                <?php endif; ?>
                aria-selected="<?= $idx === $defaultTab ? 'true' : 'false' ?>">
          <?php if (!empty($tab['icon'])): ?>
            <?= $this->insert('qahera::icon', ['name' => $tab['icon'], 'size' => 16]) ?>
          <?php endif; ?>
          <span><?= $this->e($tab['label'] ?? '') ?></span>
        </button>
      <?php endforeach; ?>
    </div>

    <?php foreach ($tabs as $idx => $tab): ?>
      <div class="qhr-tabpanel <?= (!$alpine && $idx === $defaultTab) ? 'is-active' : '' ?>" 
           role="tabpanel"
           <?php if ($alpine): ?>
             :class="{ 'is-active': activeTab === <?= $idx ?> }"
             x-show="activeTab === <?= $idx ?>"
           <?php endif; ?>>
        <?= $tab['content'] ?? '' ?>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <?= $slot ?>
  <?php endif; ?>
</div>

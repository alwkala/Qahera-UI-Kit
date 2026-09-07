<?php
/**
 * Qahera UI Kit — Accordion Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $items Array of accordion items [['id' => 'item-1', 'title' => '...', 'content' => '...']]
 * @var bool $multiple Whether multiple items can be expanded simultaneously (default false)
 * @var bool $alpine Whether to include Alpine.js qhrAccordion() bindings (default true)
 * @var string $class Additional CSS classes
 * @var string $slot Raw HTML content if custom accordion markup is used
 */

$items = $items ?? [];
$multiple = $multiple ?? false;
$alpine = $alpine ?? true;
$class = $class ?? '';
$slot = $slot ?? '';

$classes = ['qhr-accordion'];
if ($class) {
    $classes[] = $class;
}
$classAttr = implode(' ', $classes);
?>
<div class="<?= $this->e($classAttr) ?>" 
     <?php if ($alpine): ?>x-data="qhrAccordion(<?= $multiple ? 'true' : 'false' ?>)"<?php endif; ?>>
  <?php if (!empty($items)): ?>
    <?php foreach ($items as $idx => $item): ?>
      <?php 
        $itemId = $item['id'] ?? 'accordion-item-' . $idx;
        $isExpanded = !empty($item['expanded']);
      ?>
      <div class="qhr-accordion-item <?= $isExpanded ? 'is-expanded' : '' ?>" 
           <?php if ($alpine): ?>:class="{ 'is-expanded': isOpen('<?= $this->e($itemId) ?>') }"<?php endif; ?>>
        <button type="button" 
                class="qhr-accordion-header"
                <?php if ($alpine): ?>@click="toggle('<?= $this->e($itemId) ?>')"<?php endif; ?>
                aria-expanded="<?= $isExpanded ? 'true' : 'false' ?>">
          <span class="qhr-accordion-title"><?= $this->e($item['title'] ?? '') ?></span>
          <span class="qhr-accordion-icon">
            <?= $this->insert('qahera::icon', ['name' => 'chevron-down', 'size' => 16]) ?>
          </span>
        </button>
        <div class="qhr-accordion-content" 
             <?php if ($alpine): ?>x-show="isOpen('<?= $this->e($itemId) ?>')" x-cloak<?php endif; ?>>
          <?= $item['content'] ?? '' ?>
        </div>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <?= $slot ?>
  <?php endif; ?>
</div>

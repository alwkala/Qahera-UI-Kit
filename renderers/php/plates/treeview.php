<?php
/**
 * Qahera UI Kit — Treeview Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$items = $items ?? [];
$label = $label ?? 'شجرة المستندات والتصنيفات';
?>
<ul class="qhr-treeview" role="tree" aria-label="<?= $this->e($label) ?>">
  <?php foreach ($items as $item): ?>
    <li class="qhr-treeview-item" role="treeitem" <?= !empty($item['children']) ? 'data-expanded="false"' : '' ?>>
      <div class="qhr-treeview-node" <?= !empty($item['selected']) ? 'data-selected="true"' : '' ?>>
        <?php if (!empty($item['children'])): ?>
          <span class="qhr-treeview-toggle">▶</span>
        <?php endif; ?>
        <span><?= $this->e($item['label'] ?? '') ?></span>
      </div>
      <?php if (!empty($item['children'])): ?>
        <ul class="qhr-treeview-children" role="group">
          <?php foreach ($item['children'] as $child): ?>
            <li class="qhr-treeview-item" role="treeitem">
              <div class="qhr-treeview-node">
                <span><?= $this->e($child['label'] ?? '') ?></span>
              </div>
            </li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    </li>
  <?php endforeach; ?>
</ul>

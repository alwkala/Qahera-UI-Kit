<?php
/**
 * Qahera UI Kit — Sortable Reorderable List Pattern (League/Plates Template)
 * 
 * Reorderable list for priorities, tasks, and menus.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $items List of items
 */

$items = $items ?? [
    ['order' => 1, 'title' => 'تهيئة ميثاق التوكنات وتعيين لوحة الألوان الأساسية', 'sub' => 'الأولوية العليا'],
    ['order' => 2, 'title' => 'مراجعة التماثل الاتجاهي 100% Logical CSS للأزرار', 'sub' => 'الأولوية الفائقة'],
    ['order' => 3, 'title' => 'اختبار قراءة الشاشة والتنقل بلوحة المفاتيح عبر أزرار Tab', 'sub' => 'الوصولية A11y'],
];
?>
<div class="qhr-sortable-list" role="list" aria-label="قائمة قابلة لإعادة الترتيب">
  <?php foreach ($items as $item): ?>
    <div class="qhr-card is-draggable" role="listitem" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; margin-block-end: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm"><?= $item['order'] ?></span>
        <div>
          <div style="font-weight: 700; font-size: 13px;"><?= htmlspecialchars($item['title'], ENT_QUOTES, 'UTF-8') ?></div>
          <div style="font-size: 11px; color: var(--qhr-color-neutral-500);"><?= htmlspecialchars($item['sub'], ENT_QUOTES, 'UTF-8') ?></div>
        </div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--xs" aria-label="أعلى">&uarr;</button>
        <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--xs" aria-label="أسفل">&darr;</button>
      </div>
    </div>
  <?php endforeach; ?>
</div>

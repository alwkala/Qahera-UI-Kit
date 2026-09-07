<?php
/**
 * Qahera UI Kit — Kanban Board Pattern (League/Plates Template)
 * 
 * Multi-column agile workflow board for task pipelines.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $columns Columns array with cards
 */

$columns = $columns ?? [
    [
        'title' => 'قيد الانتظار',
        'count' => 2,
        'cards' => [
            ['id' => 'TK-1082', 'title' => 'فشل توثيق استجابة الدفع في فوري', 'priority' => 'danger', 'priorityLabel' => 'عاجل'],
            ['id' => 'TK-1085', 'title' => 'تأخر مزامنة فواتير ضريبة القيمة المضافة', 'priority' => 'warning', 'priorityLabel' => 'مرتفع'],
        ]
    ],
    [
        'title' => 'جاري المعالجة',
        'count' => 1,
        'cards' => [
            ['id' => 'TK-1079', 'title' => 'مزامنة مخازن الإسكندرية مع المستودع', 'priority' => 'primary', 'priorityLabel' => 'متوسط'],
        ]
    ],
    [
        'title' => 'تم الإنجاز',
        'count' => 1,
        'cards' => [
            ['id' => 'TK-1074', 'title' => 'تفعيل دعم شهادات SSL وتحديث المفاتيح', 'priority' => 'success', 'priorityLabel' => 'مكتمل'],
        ]
    ],
];
?>
<div class="qhr-kanban-board" role="region" aria-label="لوحة كانبان إدارة المهام">
  <?php foreach ($columns as $col): ?>
    <section class="qhr-kanban-column">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-block-end: 14px;">
        <h3 style="margin: 0; font-size: 14px; font-weight: 700;"><?= htmlspecialchars($col['title'], ENT_QUOTES, 'UTF-8') ?></h3>
        <span class="qhr-badge qhr-badge--sm"><?= $col['count'] ?></span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <?php foreach ($col['cards'] as $card): ?>
          <article class="qhr-card" style="padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-block-end: 6px;">
              <span class="qhr-badge qhr-badge--<?= $card['priority'] ?> qhr-badge--xs"><?= htmlspecialchars($card['priorityLabel'], ENT_QUOTES, 'UTF-8') ?></span>
              <span style="font-family: monospace; font-size: 11px;"><?= htmlspecialchars($card['id'], ENT_QUOTES, 'UTF-8') ?></span>
            </div>
            <div style="font-weight: 700; font-size: 13px;"><?= htmlspecialchars($card['title'], ENT_QUOTES, 'UTF-8') ?></div>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endforeach; ?>
</div>

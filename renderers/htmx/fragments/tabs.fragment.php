<?php
/**
 * Qahera UI Kit — HTMX Server-Driven Tabs Fragment
 * 
 * Lazy loads tab content from the server via hx-get.
 * 
 * @var array $tabs Array of tabs [['id' => 'tab-1', 'label' => '...', 'url' => '/api/tabs/1', 'active' => true]]
 * @var string $panelContent Content of the initially active tab panel
 */

$tabs = $tabs ?? [
    ['id' => 'tab-info', 'label' => 'المعلومات العامة', 'url' => '/api/tabs/info', 'active' => true],
    ['id' => 'tab-security', 'label' => 'إعدادات الأمان', 'url' => '/api/tabs/security', 'active' => false],
    ['id' => 'tab-logs', 'label' => 'سجل النشاطات', 'url' => '/api/tabs/logs', 'active' => false],
];
$panelContent = $panelContent ?? 'محتوى التبويب الافتراضي المحمل من الخادم.';
?>
<div class="qhr-tabs qhr-tabs--htmx">
  <div class="qhr-tabs-list" role="tablist">
    <?php foreach ($tabs as $t): ?>
      <button 
        type="button" 
        class="qhr-tab <?= ($t['active'] ?? false) ? 'is-active' : '' ?>"
        role="tab"
        aria-selected="<?= ($t['active'] ?? false) ? 'true' : 'false' ?>"
        hx-get="<?= htmlspecialchars($t['url'] ?? '#', ENT_QUOTES, 'UTF-8') ?>"
        hx-target="#htmx-tab-panel"
        hx-swap="innerHTML"
        onclick="this.closest('.qhr-tabs-list').querySelectorAll('.qhr-tab').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); }); this.classList.add('is-active'); this.setAttribute('aria-selected', 'true');"
      >
        <?= htmlspecialchars($t['label'] ?? '', ENT_QUOTES, 'UTF-8') ?>
      </button>
    <?php endforeach; ?>
  </div>

  <div id="htmx-tab-panel" class="qhr-tab-panel" role="tabpanel">
    <?= $panelContent ?>
  </div>
</div>

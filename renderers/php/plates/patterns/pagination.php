<?php
/**
 * Qahera UI Kit — Pagination Control Pattern (League/Plates Template)
 * 
 * Provides structured multi-page navigation, page jump buttons, and range summary.
 * 
 * @var \League\Plates\Template\Template $this
 * @var int $currentPage Current page number (1-based)
 * @var int $totalPages Total number of pages
 * @var int $totalItems Total record count
 * @var int $pageSize Records per page
 * @var string $baseUrl Base URL with placeholder ':page' or query string
 * @var string $class Additional CSS classes
 */

$currentPage = (int)($currentPage ?? 1);
$totalPages = max(1, (int)($totalPages ?? 1));
$totalItems = isset($totalItems) ? (int)$totalItems : null;
$pageSize = (int)($pageSize ?? 10);
$baseUrl = $baseUrl ?? '?page=:page';
$class = $class ?? '';

function getPageUrl(string $base, int $page): string {
    if (strpos($base, ':page') !== false) {
        return str_replace(':page', (string)$page, $base);
    }
    $separator = strpos($base, '?') !== false ? '&' : '?';
    return $base . $separator . 'page=' . $page;
}
?>
<nav class="qhr-pagination <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     role="navigation" 
     aria-label="تنقل الصفحات"
     style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--qhr-space-3); padding: var(--qhr-space-4) 0;">
  
  <?php if ($totalItems !== null): ?>
    <div class="qhr-pagination-summary" style="font-size: var(--qhr-text-sm); color: var(--qhr-color-neutral-600);">
      عرض <strong><?= ($currentPage - 1) * $pageSize + 1 ?></strong> إلى <strong><?= min($totalItems, $currentPage * $pageSize) ?></strong> من أصل <strong><?= $totalItems ?></strong> سجل
    </div>
  <?php endif; ?>

  <div class="qhr-pagination-controls" style="display: inline-flex; align-items: center; gap: var(--qhr-space-1);">
    <!-- Previous Button -->
    <?php if ($currentPage > 1): ?>
      <a href="<?= htmlspecialchars(getPageUrl($baseUrl, $currentPage - 1), ENT_QUOTES, 'UTF-8') ?>" 
         class="qhr-btn qhr-btn--secondary qhr-btn--sm" 
         aria-label="الصفحة السابقة">
        <?= $this->insert('qahera::icon', ['name' => 'chevron-right', 'size' => 16]) ?>
        <span>السابق</span>
      </a>
    <?php else: ?>
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" disabled aria-disabled="true">
        <?= $this->insert('qahera::icon', ['name' => 'chevron-right', 'size' => 16]) ?>
        <span>السابق</span>
      </button>
    <?php endif; ?>

    <!-- Page Number Chips -->
    <?php for ($p = max(1, $currentPage - 2); $p <= min($totalPages, $currentPage + 2); $p++): ?>
      <?php if ($p === $currentPage): ?>
        <button type="button" 
                class="qhr-btn qhr-btn--primary qhr-btn--sm" 
                aria-current="page" 
                style="min-width: 36px; padding: 0 var(--qhr-space-2);">
          <?= $p ?>
        </button>
      <?php else: ?>
        <a href="<?= htmlspecialchars(getPageUrl($baseUrl, $p), ENT_QUOTES, 'UTF-8') ?>" 
           class="qhr-btn qhr-btn--ghost qhr-btn--sm" 
           style="min-width: 36px; padding: 0 var(--qhr-space-2);">
          <?= $p ?>
        </a>
      <?php endif; ?>
    <?php endfor; ?>

    <!-- Next Button -->
    <?php if ($currentPage < $totalPages): ?>
      <a href="<?= htmlspecialchars(getPageUrl($baseUrl, $currentPage + 1), ENT_QUOTES, 'UTF-8') ?>" 
         class="qhr-btn qhr-btn--secondary qhr-btn--sm" 
         aria-label="الصفحة التالية">
        <span>التالي</span>
        <?= $this->insert('qahera::icon', ['name' => 'chevron-left', 'size' => 16]) ?>
      </a>
    <?php else: ?>
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" disabled aria-disabled="true">
        <span>التالي</span>
        <?= $this->insert('qahera::icon', ['name' => 'chevron-left', 'size' => 16]) ?>
      </button>
    <?php endif; ?>
  </div>

</nav>

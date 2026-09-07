<?php
/**
 * Qahera UI Kit — HTMX Pagination Fragment
 * 
 * Server-driven pagination controls with hx-get swapping.
 * 
 * @var int $currentPage Current active page number (1-based)
 * @var int $totalPages Total number of pages
 * @var string $baseUrl Base URL for page requests (e.g. /users?page=)
 * @var string $target CSS selector of content to swap (e.g. #data-table-body)
 */

$currentPage = (int)($currentPage ?? 1);
$totalPages = (int)($totalPages ?? 5);
$baseUrl = $baseUrl ?? '/items?page=';
$target = $target ?? '#table-container';
?>
<nav class="qhr-pagination qhr-pagination--htmx" role="navigation" aria-label="ترقيم الصفحات">
  <div style="display: flex; align-items: center; gap: var(--qhr-space-1);">
    <!-- Previous Button -->
    <button 
      type="button" 
      class="qhr-btn qhr-btn--secondary qhr-btn--sm"
      <?= $currentPage > 1 ? 'hx-get="' . htmlspecialchars($baseUrl . ($currentPage - 1), ENT_QUOTES, 'UTF-8') . '" hx-target="' . htmlspecialchars($target, ENT_QUOTES, 'UTF-8') . '" hx-swap="innerHTML"' : 'disabled' ?>
      aria-label="الصفحة السابقة"
    >
      <svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 5l7 7-7 7" />
      </svg>
      <span>السابق</span>
    </button>

    <!-- Page Buttons -->
    <?php for ($p = 1; $p <= $totalPages; $p++): ?>
      <?php if ($p === $currentPage): ?>
        <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm" aria-current="page"><?= $p ?></button>
      <?php else: ?>
        <button 
          type="button" 
          class="qhr-btn qhr-btn--ghost qhr-btn--sm"
          hx-get="<?= htmlspecialchars($baseUrl . $p, ENT_QUOTES, 'UTF-8') ?>"
          hx-target="<?= htmlspecialchars($target, ENT_QUOTES, 'UTF-8') ?>"
          hx-swap="innerHTML"
        ><?= $p ?></button>
      <?php endif; ?>
    <?php endfor; ?>

    <!-- Next Button -->
    <button 
      type="button" 
      class="qhr-btn qhr-btn--secondary qhr-btn--sm"
      <?= $currentPage < $totalPages ? 'hx-get="' . htmlspecialchars($baseUrl . ($currentPage + 1), ENT_QUOTES, 'UTF-8') . '" hx-target="' . htmlspecialchars($target, ENT_QUOTES, 'UTF-8') . '" hx-swap="innerHTML"' : 'disabled' ?>
      aria-label="الصفحة التالية"
    >
      <span>التالي</span>
      <svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
</nav>

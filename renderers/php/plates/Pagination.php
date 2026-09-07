<?php
/**
 * Qahera UI Kit — Plates Template Partial: Pagination
 *
 * @var League\Plates\Template\Template $this
 * @var int $currentPage
 * @var int $totalPages
 * @var int|null $totalItems
 * @var int|null $startIndex
 * @var int|null $endIndex
 * @var int|string $pageSize
 * @var array|null $pageSizeOptions
 * @var string $extraClass
 * @var bool $showSummary
 * @var bool $showSizePicker
 */
$currentPage = $currentPage ?? 1;
$totalPages = max(1, $totalPages ?? 1);
$pageSize = $pageSize ?? 10;
$pageSizeOptions = $pageSizeOptions ?? [10, 25, 50];
$extraClass = $extraClass ?? '';
$showSummary = $showSummary ?? true;
$showSizePicker = $showSizePicker ?? false;

$calcStart = $startIndex ?? (($currentPage - 1) * (int)$pageSize + 1);
$calcEnd = $endIndex ?? min($currentPage * (int)$pageSize, $totalItems ?? ($totalPages * (int)$pageSize));

// Calculate windowed pages
$pages = [];
if ($totalPages <= 7) {
    $pages = range(1, $totalPages);
} elseif ($currentPage <= 4) {
    $pages = [1, 2, 3, 4, 5, '...', $totalPages];
} elseif ($currentPage >= $totalPages - 3) {
    $pages = [1, '...', $totalPages - 4, $totalPages - 3, $totalPages - 2, $totalPages - 1, $totalPages];
} else {
    $pages = [1, '...', $currentPage - 1, $currentPage, $currentPage + 1, '...', $totalPages];
}
?>
<nav class="qhr-pagination <?= $this->e($extraClass) ?>" role="navigation" aria-label="ترقيم الصفحات">
  <?php if ($showSummary): ?>
    <div class="qhr-pagination__summary">
      <span>عرض</span>
      <strong><?= (int)$calcStart ?> إلى <?= (int)$calcEnd ?></strong>
      <?php if (isset($totalItems)): ?>
        <span>من أصل</span>
        <strong class="qhr-pagination__summary-accent"><?= (int)$totalItems ?></strong>
        <span>عنصراً</span>
      <?php endif; ?>
    </div>
  <?php endif; ?>

  <div class="qhr-pagination__controls">
    <button type="button" class="qhr-pagination__btn qhr-pagination__btn--prev" aria-label="الصفحة السابقة" <?= $currentPage <= 1 ? 'disabled' : '' ?>>
      <svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span>السابق</span>
    </button>

    <div class="qhr-pagination__pages">
      <?php foreach ($pages as $p): ?>
        <?php if ($p === '...'): ?>
          <span class="qhr-pagination__ellipsis" aria-hidden="true">&hellip;</span>
        <?php else: ?>
          <?php $isActive = ((int)$p === $currentPage); ?>
          <button type="button" class="qhr-pagination__page <?= $isActive ? 'is-active' : '' ?>" <?= $isActive ? 'aria-current="page"' : '' ?>>
            <?= (int)$p ?>
          </button>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>

    <button type="button" class="qhr-pagination__btn qhr-pagination__btn--next" aria-label="الصفحة التالية" <?= $currentPage >= $totalPages ? 'disabled' : '' ?>>
      <span>التالي</span>
      <svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>

  <?php if ($showSizePicker): ?>
    <div class="qhr-pagination__size">
      <label for="qhrPhpPageSize">عناصر الصفحة:</label>
      <select id="qhrPhpPageSize" class="qhr-pagination__select">
        <?php foreach ($pageSizeOptions as $opt): ?>
          <option value="<?= (int)$opt ?>" <?= (int)$pageSize === (int)$opt ? 'selected' : '' ?>>
            <?= (int)$opt ?> عنصر
          </option>
        <?php endforeach; ?>
      </select>
    </div>
  <?php endif; ?>
</nav>

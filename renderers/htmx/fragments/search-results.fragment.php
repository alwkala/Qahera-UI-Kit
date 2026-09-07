<?php
/**
 * Qahera UI Kit — HTMX Search Results Fragment
 * 
 * Target container for live search inputs with debounced keyup trigger.
 * 
 * @var array $items Array of search result items [['title' => '...', 'subtitle' => '...', 'href' => '#', 'badge' => '...']]
 * @var string $query The searched query string
 */

$items = $items ?? [];
$query = $query ?? '';
?>
<div class="qhr-search-results" role="region" aria-live="polite">
  <?php if (empty($items)): ?>
    <div class="qhr-empty-state qhr-empty-state--compact" style="padding: var(--qhr-space-6); text-align: center;">
      <p style="color: var(--qhr-color-neutral-500); margin: 0;">
        لا توجد نتائج مطابقة للبحث عن "<strong><?= htmlspecialchars($query, ENT_QUOTES, 'UTF-8') ?></strong>"
      </p>
    </div>
  <?php else: ?>
    <ul class="qhr-search-results-list" style="list-style: none; margin: 0; padding: 0;">
      <?php foreach ($items as $item): ?>
        <li style="border-bottom: 1px solid var(--qhr-border-subtle);">
          <a href="<?= htmlspecialchars($item['href'] ?? '#', ENT_QUOTES, 'UTF-8') ?>" 
             class="qhr-search-result-item" 
             style="display: flex; align-items: center; justify-content: space-between; padding: var(--qhr-space-3) var(--qhr-space-4); text-decoration: none; color: inherit; transition: background var(--qhr-duration-fast);"
             onmouseover="this.style.backgroundColor='var(--qhr-color-neutral-50)'"
             onmouseout="this.style.backgroundColor='transparent'">
            <div>
              <div style="font-weight: 600; color: var(--qhr-color-neutral-900);">
                <?= htmlspecialchars($item['title'] ?? '', ENT_QUOTES, 'UTF-8') ?>
              </div>
              <?php if (!empty($item['subtitle'])): ?>
                <div style="font-size: var(--qhr-text-xs); color: var(--qhr-color-neutral-500);">
                  <?= htmlspecialchars($item['subtitle'], ENT_QUOTES, 'UTF-8') ?>
                </div>
              <?php endif; ?>
            </div>
            <?php if (!empty($item['badge'])): ?>
              <span class="qhr-badge qhr-badge--neutral qhr-badge--sm">
                <?= htmlspecialchars($item['badge'], ENT_QUOTES, 'UTF-8') ?>
              </span>
            <?php endif; ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>
</div>

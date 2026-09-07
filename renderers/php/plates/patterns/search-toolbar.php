<?php
/**
 * Qahera UI Kit — Search Toolbar Pattern (League/Plates Template)
 * 
 * Provides an accessible search input, category selector, and submit action.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $query Current search query
 * @var string $placeholder Input placeholder text
 * @var string $action Form submit action URL
 * @var string $method Form HTTP method (default 'GET')
 * @var array $categories Optional array of category options [['value' => '', 'label' => '']]
 * @var string $selectedCategory Currently selected category value
 * @var array $activeFilters Optional array of active filter label strings
 * @var string $buttonLabel Submit button label (default 'بحث')
 * @var string $class Additional CSS classes
 */

$query = $query ?? '';
$placeholder = $placeholder ?? 'ابحث في السجلات...';
$action = $action ?? '';
$method = strtoupper($method ?? 'GET');
$categories = $categories ?? [];
$selectedCategory = $selectedCategory ?? '';
$activeFilters = $activeFilters ?? [];
$buttonLabel = $buttonLabel ?? 'بحث';
$class = $class ?? '';
?>
<form action="<?= htmlspecialchars($action, ENT_QUOTES, 'UTF-8') ?>" 
      method="<?= htmlspecialchars($method, ENT_QUOTES, 'UTF-8') ?>" 
      role="search" 
      class="qhr-search-toolbar <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>"
      style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--qhr-space-3);">
  
  <?php if (!empty($categories)): ?>
    <div class="qhr-search-category" style="min-width: 140px;">
      <select name="category" class="qhr-select qhr-select--md" aria-label="تحديد تصنيف البحث">
        <option value="">كافة التصنيفات</option>
        <?php foreach ($categories as $cat): ?>
          <?php 
            $cVal = is_array($cat) ? ($cat['value'] ?? '') : $cat;
            $cLabel = is_array($cat) ? ($cat['label'] ?? $cVal) : $cat;
          ?>
          <option value="<?= htmlspecialchars($cVal, ENT_QUOTES, 'UTF-8') ?>" <?= $cVal === $selectedCategory ? 'selected' : '' ?>>
            <?= htmlspecialchars($cLabel, ENT_QUOTES, 'UTF-8') ?>
          </option>
        <?php endforeach; ?>
      </select>
    </div>
  <?php endif; ?>

  <div class="qhr-search-input-wrapper" style="flex: 1; min-width: 220px; position: relative; display: flex; align-items: center;">
    <span style="position: absolute; inset-inline-start: var(--qhr-space-3); color: var(--qhr-color-neutral-400); pointer-events: none; display: inline-flex;">
      <?= $this->insert('qahera::icon', ['name' => 'search', 'size' => 18]) ?>
    </span>
    <input 
      type="search" 
      name="q" 
      value="<?= htmlspecialchars($query, ENT_QUOTES, 'UTF-8') ?>"
      placeholder="<?= htmlspecialchars($placeholder, ENT_QUOTES, 'UTF-8') ?>"
      class="qhr-input qhr-input--md"
      style="width: 100%; padding-inline-start: var(--qhr-space-9);"
      aria-label="<?= htmlspecialchars($placeholder, ENT_QUOTES, 'UTF-8') ?>"
    />
  </div>

  <div class="qhr-search-actions" style="display: inline-flex; gap: var(--qhr-space-2);">
    <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--md">
      <span><?= htmlspecialchars($buttonLabel, ENT_QUOTES, 'UTF-8') ?></span>
    </button>
  </div>

  <?php if (!empty($activeFilters)): ?>
    <div class="qhr-search-active-filters" style="width: 100%; display: flex; flex-wrap: wrap; align-items: center; gap: var(--qhr-space-2); margin-top: var(--qhr-space-1);">
      <span style="font-size: var(--qhr-text-xs); color: var(--qhr-color-neutral-500);">الفلاتر النشطة:</span>
      <?php foreach ($activeFilters as $filter): ?>
        <span class="qhr-badge qhr-badge--neutral qhr-badge--sm" style="display: inline-flex; align-items: center; gap: var(--qhr-space-1);">
          <?= htmlspecialchars($filter, ENT_QUOTES, 'UTF-8') ?>
        </span>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</form>

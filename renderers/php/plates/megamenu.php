<?php
/**
 * Qahera UI Kit — Megamenu Component (League/Plates Template)
 * 
 * Expansive multi-column navigation panel hosting categorized links and promotional media.
 * 
 * @var \League\Plates\Template\Template|object $this
 * @var array $columns Array of columns [['title' => '...', 'links' => [['label' => '...', 'href' => '#', 'description' => '', 'icon' => '']]]]
 * @var string|null $trigger Custom trigger button HTML or label string (default null)
 * @var string|null $featured HTML content for promotional/featured card
 * @var string $variant 'default' | '2-cols' | '3-cols' | '4-cols' | 'with-featured' | 'full-width' | 'glass' (default '3-cols')
 * @var string $size 'md' | 'lg' | 'xl' (default 'md')
 * @var bool $isOpen Initial open state when server-rendered (default false)
 * @var bool $alpine Whether to wrap in Alpine.js dropdown toggle logic (default true)
 * @var string $ariaLabel Accessible label (default 'القائمة الموسعة')
 * @var string $class Additional CSS classes
 */

$columns = $columns ?? [];
$trigger = $trigger ?? null;
$featured = $featured ?? null;
$variant = $variant ?? '3-cols';
$size = $size ?? 'md';
$isOpen = $isOpen ?? false;
$alpine = $alpine ?? true;
$ariaLabel = $ariaLabel ?? 'القائمة الموسعة';
$class = $class ?? '';

$navClasses = ['qhr-megamenu'];
if ($variant && $variant !== 'default') {
    $navClasses[] = 'qhr-megamenu--' . $variant;
}
if ($size && $size !== 'md') {
    $navClasses[] = 'qhr-megamenu--' . $size;
}
if ($isOpen) {
    $navClasses[] = 'is-open';
}
if ($class) {
    $navClasses[] = $class;
}
$navClassAttr = implode(' ', $navClasses);
?>
<?php if ($trigger !== null): ?>
<div class="qhr-megamenu-wrapper" <?php if ($alpine): ?>x-data="{ open: <?= $isOpen ? 'true' : 'false' ?> }"<?php endif; ?>>
  <?php if (str_starts_with(trim((string) $trigger), '<')): ?>
    <?= $trigger ?>
  <?php else: ?>
    <button type="button" 
            class="qhr-btn qhr-btn--ghost qhr-btn--sm" 
            <?php if ($alpine): ?>@click="open = !open" :aria-expanded="open.toString()"<?php endif; ?> 
            aria-haspopup="true" 
            aria-label="<?= $this->e($trigger) ?>">
      <span><?= $this->e($trigger) ?></span>
      <?= $this->insert('qahera::icon', ['name' => 'chevron-down', 'size' => 14]) ?>
    </button>
  <?php endif; ?>

  <nav class="<?= $this->e($navClassAttr) ?>" 
       <?php if ($alpine): ?>:class="{ 'is-open': open }" @click.outside="open = false"<?php endif; ?> 
       aria-label="<?= $this->e($ariaLabel) ?>">
    <div class="qhr-megamenu-grid">
      <?php foreach ($columns as $col): ?>
        <div class="qhr-megamenu-col">
          <?php if (!empty($col['title'])): ?>
            <div class="qhr-megamenu-col-header">
              <h3 class="qhr-megamenu-col-title"><?= $this->e($col['title']) ?></h3>
            </div>
          <?php endif; ?>

          <?php if (!empty($col['links'])): ?>
            <ul class="qhr-megamenu-list">
              <?php foreach ($col['links'] as $link): ?>
                <li class="qhr-megamenu-item">
                  <a href="<?= $this->e($link['href'] ?? '#') ?>" class="qhr-megamenu-link">
                    <?php if (!empty($link['icon'])): ?>
                      <span class="qhr-megamenu-icon">
                        <?php if (str_starts_with(trim($link['icon']), '<svg')): ?>
                          <?= $link['icon'] ?>
                        <?php else: ?>
                          <?= $this->insert('qahera::icon', ['name' => $link['icon'], 'size' => 18]) ?>
                        <?php endif; ?>
                      </span>
                    <?php endif; ?>
                    <div class="qhr-megamenu-content">
                      <span class="qhr-megamenu-label"><?= $this->e($link['label'] ?? '') ?></span>
                      <?php if (!empty($link['description'])): ?>
                        <span class="qhr-megamenu-desc"><?= $this->e($link['description']) ?></span>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>

      <?php if ($featured): ?>
        <div class="qhr-megamenu-featured">
          <?= $featured ?>
        </div>
      <?php endif; ?>
    </div>
  </nav>
</div>
<?php else: ?>
<nav class="<?= $this->e($navClassAttr) ?>" aria-label="<?= $this->e($ariaLabel) ?>">
  <div class="qhr-megamenu-grid">
    <?php foreach ($columns as $col): ?>
      <div class="qhr-megamenu-col">
        <?php if (!empty($col['title'])): ?>
          <div class="qhr-megamenu-col-header">
            <h3 class="qhr-megamenu-col-title"><?= $this->e($col['title']) ?></h3>
          </div>
        <?php endif; ?>

        <?php if (!empty($col['links'])): ?>
          <ul class="qhr-megamenu-list">
            <?php foreach ($col['links'] as $link): ?>
              <li class="qhr-megamenu-item">
                <a href="<?= $this->e($link['href'] ?? '#') ?>" class="qhr-megamenu-link">
                  <?php if (!empty($link['icon'])): ?>
                    <span class="qhr-megamenu-icon">
                      <?php if (str_starts_with(trim($link['icon']), '<svg')): ?>
                        <?= $link['icon'] ?>
                      <?php else: ?>
                        <?= $this->insert('qahera::icon', ['name' => $link['icon'], 'size' => 18]) ?>
                      <?php endif; ?>
                    </span>
                  <?php endif; ?>
                  <div class="qhr-megamenu-content">
                    <span class="qhr-megamenu-label"><?= $this->e($link['label'] ?? '') ?></span>
                    <?php if (!empty($link['description'])): ?>
                      <span class="qhr-megamenu-desc"><?= $this->e($link['description']) ?></span>
                    <?php endif; ?>
                  </div>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>

    <?php if ($featured): ?>
      <div class="qhr-megamenu-featured">
        <?= $featured ?>
      </div>
    <?php endif; ?>
  </div>
</nav>
<?php endif; ?>

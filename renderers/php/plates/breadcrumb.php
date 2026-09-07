<?php
/**
 * Qahera UI Kit — Plates Template Partial: Breadcrumb
 *
 * @var League\Plates\Template\Template $this
 * @var array $items [ ['label' => '...', 'href' => '...', 'current' => false] ]
 * @var string $separator
 * @var string $extraClass
 */
$items = $items ?? [];
$separator = $separator ?? '/';
$extraClass = $extraClass ?? '';
?>
<nav class="qhr-breadcrumb <?= $this->e($extraClass) ?>" aria-label="breadcrumb">
  <ol class="qhr-breadcrumb-list">
    <?php foreach ($items as $index => $item): ?>
      <?php $isLast = ($item['current'] ?? false) || ($index === count($items) - 1); ?>
      <li class="qhr-breadcrumb-item">
        <?php if ($isLast): ?>
          <span class="qhr-breadcrumb-current" aria-current="page"><?= $this->e($item['label'] ?? '') ?></span>
        <?php else: ?>
          <a href="<?= $this->e($item['href'] ?? '#') ?>" class="qhr-breadcrumb-link"><?= $this->e($item['label'] ?? '') ?></a>
          <span class="qhr-breadcrumb-separator" aria-hidden="true"><?= $this->e($separator) ?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>

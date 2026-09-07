<?php
/**
 * Qahera UI Kit — HTMX Progress Bar Fragment
 * 
 * Supports polling (`hx-trigger="every 1s"`) or lazy updates.
 *
 * @var int $value Current progress percentage (0..100)
 * @var string $pollUrl URL for polling progress updates
 * @var string $target Target selector to update
 */
$value = max(0, min(100, $value ?? 0));
$pollUrl = $pollUrl ?? '/api/task/progress';
$target = $target ?? 'this';
$isComplete = $value >= 100;
?>
<div 
  class="qhr-progress qhr-progress--md <?= $isComplete ? 'qhr-progress--success' : '' ?>"
  role="progressbar" 
  aria-valuenow="<?= $value ?>" 
  aria-valuemin="0" 
  aria-valuemax="100"
  <?php if (!$isComplete): ?>
    hx-get="<?= htmlspecialchars($pollUrl, ENT_QUOTES, 'UTF-8') ?>"
    hx-trigger="every 1.5s"
    hx-target="<?= htmlspecialchars($target, ENT_QUOTES, 'UTF-8') ?>"
    hx-swap="outerHTML"
  <?php endif; ?>
>
  <div class="qhr-progress-bar" style="width: <?= $value ?>%;"></div>
</div>

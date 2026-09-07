<?php
/**
 * Qahera UI Kit — HTMX Timeline Activity Fragment
 * 
 * Injects a new real-time activity node into an existing timeline feed (`hx-swap-oob="afterbegin:#activity-feed"`).
 *
 * @var string $title Event description
 * @var string $time Timestamp or relative time
 * @var string $targetListId Timeline element ID
 */
$title = $title ?? 'تم إتمام عملية جديدة';
$time = $time ?? 'الآن';
$targetListId = $targetListId ?? 'activity-feed';
?>
<li class="qhr-timeline-item" hx-swap-oob="afterbegin:#<?= htmlspecialchars($targetListId, ENT_QUOTES, 'UTF-8') ?>">
  <div class="qhr-timeline-dot">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
  <div class="qhr-timeline-content">
    <div class="qhr-timeline-title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></div>
    <div class="qhr-timeline-time"><?= htmlspecialchars($time, ENT_QUOTES, 'UTF-8') ?></div>
  </div>
</li>

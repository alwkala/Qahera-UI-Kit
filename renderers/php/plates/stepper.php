<?php
/**
 * Qahera UI Kit — Plates Template Partial: Stepper
 *
 * @var League\Plates\Template\Template $this
 * @var array $steps [ ['label' => '...', 'desc' => '...'] ]
 * @var int $current (0-indexed)
 * @var string $extraClass
 */
$steps = $steps ?? [];
$current = $current ?? 0;
$extraClass = $extraClass ?? '';
?>
<ol class="qhr-stepper <?= $this->e($extraClass) ?>" aria-label="خطوات العملية">
  <?php foreach ($steps as $idx => $step): ?>
    <?php
      $isCurrent = ($idx === $current);
      $isCompleted = ($idx < $current);
      $itemClasses = array_filter([
          'qhr-step-item',
          $isCurrent ? 'is-current' : '',
          $isCompleted ? 'is-completed' : ''
      ]);
    ?>
    <li class="<?= implode(' ', $itemClasses) ?>" <?= $isCurrent ? 'aria-current="step"' : '' ?>>
      <div class="qhr-step-indicator">
        <?= $isCompleted ? '✓' : ($idx + 1) ?>
      </div>
      <div style="display: flex; flex-direction: column;">
        <span class="qhr-step-label"><?= $this->e($step['label'] ?? '') ?></span>
        <?php if (!empty($step['desc'])): ?>
          <span style="font-size: var(--qhr-text-xs, 11px); color: var(--qhr-text-muted, #94a3b8);"><?= $this->e($step['desc']) ?></span>
        <?php endif; ?>
      </div>
      <?php if ($idx < count($steps) - 1): ?>
        <div class="qhr-step-line"></div>
      <?php endif; ?>
    </li>
  <?php endforeach; ?>
</ol>

<?php
/**
 * Qahera UI Kit — Plates Template Partial: Card
 *
 * @var League\Plates\Template\Template $this
 * @var string $title
 * @var string|null $description
 * @var string|null $body
 * @var string|null $footer
 * @var string|null $headerAction
 * @var string $variant (elevated|outlined|muted)
 * @var string $extraClass
 */
$variant = $variant ?? 'elevated';
$extraClass = $extraClass ?? '';
?>
<div class="qhr-card qhr-card--<?= $this->e($variant) ?> <?= $this->e($extraClass) ?>">
  <?php if (!empty($title) || !empty($description) || !empty($headerAction)): ?>
    <div class="qhr-card-header">
      <div>
        <?php if (!empty($title)): ?>
          <h3 class="qhr-card-title"><?= $this->e($title) ?></h3>
        <?php endif; ?>
        <?php if (!empty($description)): ?>
          <p class="qhr-card-desc"><?= $this->e($description) ?></p>
        <?php endif; ?>
      </div>
      <?php if (!empty($headerAction)): ?>
        <div class="qhr-card-header-action"><?= $headerAction ?></div>
      <?php endif; ?>
    </div>
  <?php endif; ?>

  <?php if (!empty($body)): ?>
    <div class="qhr-card-body">
      <?= $body ?>
    </div>
  <?php endif; ?>

  <?php if (!empty($footer)): ?>
    <div class="qhr-card-footer">
      <?= $footer ?>
    </div>
  <?php endif; ?>
</div>

<?php
/**
 * Qahera UI Kit — Questionnaire & Multi-Step Assessment Pattern (League/Plates Template)
 *
 * @var \League\Plates\Template\Template $this
 * @var int $currentStep Current question step (1-based)
 * @var int $totalSteps Total questions in questionnaire
 * @var string $title Question prompt text
 * @var string|null $description Explanatory instructions
 * @var string|null $category Subject / category badge text
 * @var int|null $points Question score points
 * @var array $choices List of choices [['id' => 'c1', 'text' => '...', 'shortcut' => 'أ', 'selected' => false]]
 * @var string $submitLabel Label for primary action (default 'التالي')
 * @var string $prevLabel Label for back action (default 'السابق')
 * @var bool $canSkip Whether question is skippable
 * @var string $class Additional CSS classes
 */

$currentStep = $currentStep ?? 1;
$totalSteps = $totalSteps ?? 1;
$title = $title ?? '';
$description = $description ?? null;
$category = $category ?? null;
$points = $points ?? null;
$choices = $choices ?? [];
$submitLabel = $submitLabel ?? ($currentStep === $totalSteps ? 'إنهاء وتسليم' : 'التالي');
$prevLabel = $prevLabel ?? 'السابق';
$canSkip = $canSkip ?? false;
$class = $class ?? '';

$pct = Math.round(($currentStep / $totalSteps) * 100);
?>
<div class="qhr-questionnaire <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" role="region" aria-label="استبيان واختبار تفاعلي">

  <!-- شريط التقدم العلوي -->
  <div class="qhr-progress-wrapper" style="margin-block-end: 20px;">
    <div class="qhr-progress-header">
      <span class="qhr-progress-title">السؤال <?= $currentStep ?> من <?= $totalSteps ?></span>
      <span class="qhr-progress-val"><?= round(($currentStep / $totalSteps) * 100) ?>%</span>
    </div>
    <div class="qhr-progress qhr-progress--luxury qhr-progress--sm" role="progressbar" aria-valuenow="<?= round(($currentStep / $totalSteps) * 100) ?>" aria-valuemin="0" aria-valuemax="100">
      <div class="qhr-progress-bar" style="width: <?= round(($currentStep / $totalSteps) * 100) ?>%;"></div>
    </div>
  </div>

  <!-- بطاقة السؤال -->
  <div class="qhr-questionnaire-card">
    <?php if ($category || $points !== null): ?>
      <div class="qhr-questionnaire-header">
        <?php if ($category): ?>
          <span class="qhr-questionnaire-category"><?= htmlspecialchars($category) ?></span>
        <?php endif; ?>
        <?php if ($points !== null): ?>
          <span class="qhr-questionnaire-points"><?= $points ?> درجات</span>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <h2 class="qhr-questionnaire-title"><?= htmlspecialchars($title) ?></h2>
    <?php if ($description): ?>
      <p class="qhr-questionnaire-desc"><?= htmlspecialchars($description) ?></p>
    <?php endif; ?>

    <!-- خيارات الإجابة -->
    <div class="qhr-questionnaire-choices">
      <?php foreach ($choices as $idx => $choice): ?>
        <?php
          $isSelected = !empty($choice['selected']);
          $shortcut = $choice['shortcut'] ?? ['أ', 'ب', 'ج', 'د', 'هـ'][$idx] ?? ($idx + 1);
        ?>
        <label class="qhr-questionnaire-choice <?= $isSelected ? 'is-selected' : '' ?>">
          <input type="radio" name="question_choice" value="<?= htmlspecialchars($choice['id'] ?? $idx) ?>" style="display: none;" <?= $isSelected ? 'checked' : '' ?>>
          <span class="qhr-questionnaire-choice-badge"><?= htmlspecialchars($shortcut) ?></span>
          <span class="qhr-questionnaire-choice-text"><?= htmlspecialchars($choice['text'] ?? '') ?></span>
          <span class="qhr-questionnaire-choice-indicator">
            <span class="qhr-questionnaire-choice-dot"></span>
          </span>
        </label>
      <?php endforeach; ?>
    </div>

    <!-- أزرار التنقل -->
    <div class="qhr-questionnaire-actions">
      <button type="button" class="ctrl-btn" style="padding: 8px 16px; border-radius: 8px; background: var(--qhr-surface-muted, #f1f5f9);" <?= $currentStep <= 1 ? 'disabled' : '' ?>>
        <?= htmlspecialchars($prevLabel) ?>
      </button>

      <div style="display: flex; gap: 8px;">
        <?php if ($canSkip): ?>
          <button type="button" class="ctrl-btn" style="padding: 8px 16px; border-radius: 8px; color: var(--qhr-content-secondary, #64748b);">
            تخطي
          </button>
        <?php endif; ?>
        <button type="submit" class="ctrl-btn" style="padding: 8px 20px; border-radius: 8px; background: var(--qhr-color-primary-500, #c7a35a); color: #ffffff; font-weight: 700;">
          <?= htmlspecialchars($submitLabel) ?>
        </button>
      </div>
    </div>
  </div>

</div>

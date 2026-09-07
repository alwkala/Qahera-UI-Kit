<?php
/**
 * Qahera UI Kit — HTMX Stepper Step Navigation Fragment
 * 
 * Switches the active step and loads next step form content without full page reload.
 *
 * @var int $currentStep
 * @var string $stepUrl
 */
$currentStep = $currentStep ?? 1;
$stepUrl = $stepUrl ?? '/api/wizard/step';
?>
<div class="qhr-wizard-container">
  <ol class="qhr-stepper" aria-label="خطوات التسجيل">
    <li class="qhr-step-item <?= $currentStep > 0 ? 'is-completed' : ($currentStep === 0 ? 'is-current' : '') ?>">
      <div class="qhr-step-indicator"><?= $currentStep > 0 ? '<svg class="qhr-icon qhr-step-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>' : '١' ?></div>
      <div class="qhr-step-label">الحساب</div>
      <div class="qhr-step-line"></div>
    </li>
    <li class="qhr-step-item <?= $currentStep > 1 ? 'is-completed' : ($currentStep === 1 ? 'is-current' : '') ?>">
      <div class="qhr-step-indicator"><?= $currentStep > 1 ? '<svg class="qhr-icon qhr-step-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>' : '٢' ?></div>
      <div class="qhr-step-label">البيانات</div>
      <div class="qhr-step-line"></div>
    </li>
    <li class="qhr-step-item <?= $currentStep === 2 ? 'is-current' : '' ?>">
      <div class="qhr-step-indicator">٣</div>
      <div class="qhr-step-label">التأكيد</div>
    </li>
  </ol>
</div>

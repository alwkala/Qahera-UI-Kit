<?php
/**
 * Qahera UI Kit — HTMX Real-time Field Validation Fragment
 * 
 * Returned upon keystroke or blur to dynamically render inline errors.
 * 
 * @var string $fieldName Field name/id
 * @var string $fieldValue Current value
 * @var bool $isValid Whether validation passed
 * @var string $errorMessage Error message if invalid
 * @var string $successMessage Success hint if valid
 */

$fieldName = $fieldName ?? 'email';
$fieldValue = $fieldValue ?? '';
$isValid = (bool)($isValid ?? false);
$errorMessage = $errorMessage ?? 'يرجى إدخال عنوان بريد إلكتروني صحيح ومطابق للمواصفات.';
$successMessage = $successMessage ?? 'البريد الإلكتروني متاح وجاهز للاستخدام.';
?>
<div class="qhr-form-group qhr-form-group--htmx" id="group-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>">
  <label for="field-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>" class="qhr-label">
    البريد الإلكتروني <span class="qhr-label-required">*</span>
  </label>
  
  <div class="qhr-input-wrapper">
    <input 
      type="email" 
      id="field-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>" 
      name="<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>" 
      value="<?= htmlspecialchars($fieldValue, ENT_QUOTES, 'UTF-8') ?>"
      class="qhr-input <?= $isValid ? 'is-valid' : 'is-invalid' ?>"
      aria-invalid="<?= $isValid ? 'false' : 'true' ?>"
      aria-describedby="msg-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>"
      hx-post="/api/validate/<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>"
      hx-trigger="keyup changed delay:400ms"
      hx-target="#group-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>"
      hx-swap="outerHTML"
      style="<?= $isValid ? 'border-color: var(--qhr-color-success-500);' : 'border-color: var(--qhr-color-danger-500);' ?>"
    />
  </div>

  <div id="msg-<?= htmlspecialchars($fieldName, ENT_QUOTES, 'UTF-8') ?>" 
       class="qhr-form-feedback" 
       style="font-size: var(--qhr-text-xs); margin-top: var(--qhr-space-1); color: <?= $isValid ? 'var(--qhr-color-success-600)' : 'var(--qhr-color-danger-600)' ?>;">
    <?= htmlspecialchars($isValid ? $successMessage : $errorMessage, ENT_QUOTES, 'UTF-8') ?>
  </div>
</div>

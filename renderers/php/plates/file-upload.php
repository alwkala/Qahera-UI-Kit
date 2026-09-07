<?php
/**
 * Qahera UI Kit — FileUpload Partial (PHP Plates)
 * @var League\Plates\Template\Template $this
 */
$id = $id ?? 'qhr-upload-' . bin2hex(random_bytes(4));
$name = $name ?? 'files[]';
$label = $label ?? 'اسحب الملفات هنا أو اضغط للاختيار';
$hint = $hint ?? 'يدعم مختلف الصيغ الشائعة بحد أقصى 25 ميجابايت';
$multiple = $multiple ?? true;
?>
<div class="qhr-file-upload" role="region" aria-label="<?= $this->e($label) ?>">
  <input type="file" id="<?= $this->e($id) ?>" name="<?= $this->e($name) ?>" class="qhr-file-upload-input" <?= $multiple ? 'multiple' : '' ?> />
  <svg class="qhr-file-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
  <div class="qhr-file-upload-label"><?= $this->e($label) ?></div>
  <div class="qhr-file-upload-hint"><?= $this->e($hint) ?></div>
</div>

<?php
/**
 * Qahera UI Kit — File Manager Grid Pattern (League/Plates Template)
 * 
 * Cloud storage and digital asset manager browser.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $files List of files
 * @var int $storageUsed Storage used percentage
 */

$files = $files ?? [
    ['name' => 'ميثاق_قاهرة_المعماري.pdf', 'ext' => 'PDF', 'size' => '4.2 MB', 'time' => 'منذ ساعتين'],
    ['name' => 'شعار_الوكالة_الذهبي.png', 'ext' => 'PNG', 'size' => '1.8 MB', 'time' => 'أمس'],
    ['name' => 'عقد_المكونات_v1.yaml', 'ext' => 'YAML', 'size' => '64 KB', 'time' => '3 سبتمبر'],
];
$storageUsed = $storageUsed ?? 68;
?>
<div class="qhr-file-manager" role="region" aria-label="مدير الملفات السحابي">
  <aside class="qhr-file-sidebar">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <span class="qhr-badge qhr-badge--primary qhr-badge--sm">كافة الملفات</span>
      <span class="qhr-badge qhr-badge--neutral qhr-badge--sm">أصول التصميم</span>
      <span class="qhr-badge qhr-badge--neutral qhr-badge--sm">وثائق العقود</span>
    </div>
    <div style="margin-block-start: 24px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px; margin-block-end: 4px;">
        <span>سعة التخزين</span>
        <span><?= $storageUsed ?>%</span>
      </div>
      <div class="qhr-progress qhr-progress--luxury qhr-progress--xs" role="progressbar" aria-valuenow="<?= $storageUsed ?>" aria-valuemin="0" aria-valuemax="100">
        <div class="qhr-progress-bar" style="width: <?= $storageUsed ?>%;"></div>
      </div>
    </div>
  </aside>

  <div class="qhr-file-content">
    <div class="qhr-file-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
      <?php foreach ($files as $file): ?>
        <div class="qhr-card" style="padding: 16px;">
          <span class="qhr-badge qhr-badge--sm"><?= htmlspecialchars($file['ext'], ENT_QUOTES, 'UTF-8') ?></span>
          <div style="font-weight: 700; font-size: 13px; margin-block: 8px;"><?= htmlspecialchars($file['name'], ENT_QUOTES, 'UTF-8') ?></div>
          <div style="font-size: 11px; color: var(--qhr-color-neutral-500);"><?= htmlspecialchars($file['size'], ENT_QUOTES, 'UTF-8') ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

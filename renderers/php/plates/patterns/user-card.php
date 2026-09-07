<?php
/**
 * Qahera UI Kit — User Profile Card Pattern (League/Plates Template)
 * 
 * Rich profile card for authors, team members, and leaders.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $name User display name
 * @var string $role User role title
 * @var string $location User location
 * @var string $bio Brief bio summary
 * @var array $stats Array of metrics
 */

$name = $name ?? 'م. أحمد عبد الرحمن';
$role = $role ?? 'كبير المعماريين';
$location = $location ?? 'القاهرة';
$bio = $bio ?? 'متخصص في هندسة أنظمة التصميم الشاملة وتطوير الويب فائق السرعة ثنائي الاتجاه RTL/LTR.';
$stats = $stats ?? [
    ['label' => 'مساهمة', 'value' => '142'],
    ['label' => 'مشروعاً', 'value' => '24'],
    ['label' => 'تقييم', 'value' => '4.9'],
];
?>
<div class="qhr-card qhr-user-card" role="region" aria-label="بطاقة الملف الشخصي">
  <div style="text-align: center; padding: 24px;">
    <div class="qhr-avatar qhr-avatar--xl" style="margin: 0 auto 16px auto;">
      <div class="qhr-avatar-fallback">ع</div>
    </div>
    <h3 style="margin: 0 0 4px 0; font-size: 1.15rem; font-weight: 800;"><?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?></h3>
    <div style="display: flex; justify-content: center; align-items: center; gap: 6px; margin-block-end: 14px;">
      <span class="qhr-badge qhr-badge--primary qhr-badge--sm"><?= htmlspecialchars($role, ENT_QUOTES, 'UTF-8') ?></span>
      <span style="font-size: 12px; color: var(--qhr-color-neutral-500);">· <?= htmlspecialchars($location, ENT_QUOTES, 'UTF-8') ?></span>
    </div>
    <p style="font-size: 13px; color: var(--qhr-color-neutral-600); margin: 0 0 20px 0; line-height: 1.6;"><?= htmlspecialchars($bio, ENT_QUOTES, 'UTF-8') ?></p>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); padding-block: 12px; border-block: 1px solid var(--qhr-border-subtle); margin-block-end: 20px;">
      <?php foreach ($stats as $s): ?>
        <div>
          <div style="font-weight: 800; font-size: 16px;"><?= htmlspecialchars($s['value'], ENT_QUOTES, 'UTF-8') ?></div>
          <div style="font-size: 11px; color: var(--qhr-color-neutral-500);"><?= htmlspecialchars($s['label'], ENT_QUOTES, 'UTF-8') ?></div>
        </div>
      <?php endforeach; ?>
    </div>

    <div style="display: flex; gap: 8px;">
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--md" style="flex: 1;">الملف الكامل</button>
      <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md" style="flex: 1;">تواصل الآن</button>
    </div>
  </div>
</div>

<?php
/**
 * Qahera UI Kit — VIP Membership Pattern (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $title Card title
 * @var string $tierName Tier badge text
 * @var string $description Narrative description
 * @var array $perks List of perk strings
 * @var string $actionUrl Form submit URL
 * @var string $class Additional CSS classes
 */

$title = $title ?? 'نادي العضوية والمقتنيات الخاصة';
$tierName = $tierName ?? 'GOLD TIER VIP';
$description = $description ?? 'انضم إلى مجتمع صفوة المقتنين لتصلك الإصدارات المحدودة قبل طرحها العام، مع شحن مخصص وتغليف ملكي خاص.';
$perks = $perks ?? [
    'أولوية حجز الإصدارات المحدودة (Limited Drops)',
    'تغليف ملكي فاخر بشمع الختم وقفل أمان',
    'دعوات خاصة للمعارض ولقاء الحرفيين في القاهرة',
    'شحن مجاني مخصص لجميع المحافظات'
];
$actionUrl = $actionUrl ?? '/api/vip-subscribe';
$class = $class ?? '';
?>
<div class="qhr-card qhr-vip-membership <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     style="background: linear-gradient(135deg, #17120F 0%, #221A15 50%, #0F0B09 100%); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 16px; padding: 40px; max-width: 800px; margin: 0 auto; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7); position: relative; overflow: hidden;">
  
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
    <span class="qhr-badge qhr-badge--outline qhr-badge--sm" style="border-color: #D4AF37; color: #D4AF37; letter-spacing: 0.15em;">
      <?= htmlspecialchars($tierName, ENT_QUOTES, 'UTF-8') ?>
    </span>
    <span style="color: rgba(212, 175, 55, 0.4);">
      <?= $this->insert('qahera::icon', ['name' => 'award', 'size' => 24]) ?>
    </span>
  </div>

  <h3 style="font-family: var(--qhr-font-family-display, serif); font-size: 28px; font-weight: 700; color: #F7F3ED; margin-bottom: 12px;">
    <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
  </h3>

  <p style="font-size: 14px; color: #B9A896; line-height: 1.7; margin-bottom: 24px;">
    <?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>
  </p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 28px;">
    <?php foreach ($perks as $perk): ?>
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #F7F3ED;">
        <span style="color: #D4AF37; display: inline-flex;">
          <?= $this->insert('qahera::icon', ['name' => 'check', 'size' => 16]) ?>
        </span>
        <span><?= htmlspecialchars($perk, ENT_QUOTES, 'UTF-8') ?></span>
      </div>
    <?php endforeach; ?>
  </div>

  <form action="<?= htmlspecialchars($actionUrl, ENT_QUOTES, 'UTF-8') ?>" method="POST" style="display: flex; gap: 12px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 240px;">
      <input 
        type="email" 
        name="email" 
        placeholder="أدخل بريدك الإلكتروني الخاص..." 
        class="qhr-input"
        required 
        style="background-color: rgba(15, 11, 9, 0.7); border-color: rgba(212, 175, 55, 0.3); color: #F7F3ED; width: 100%;"
      />
    </div>
    <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--md" style="background-color: #D4AF37; border-color: #D4AF37; color: #0F0B09; font-weight: 700; min-width: 150px;">
      <span>انضم الآن للمقتنين</span>
      <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 16]) ?>
    </button>
  </form>
</div>

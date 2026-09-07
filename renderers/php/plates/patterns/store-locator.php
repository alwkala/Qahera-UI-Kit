<?php
/**
 * Qahera UI Kit — Store Locator Pattern (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $stores List of store associative arrays
 * @var string $title Section headline
 * @var string $subtitle Section description
 * @var string $class Additional CSS classes
 */

$title = $title ?? 'فروعنا وصالات العرض';
$subtitle = $subtitle ?? 'تفضل بزيارتنا في القاهرة والمدن الإقليمية لتجربة مقتنياتنا يدوياً';
$stores = $stores ?? [
    [
        'id' => 'cairo-flagship',
        'city' => 'القاهرة',
        'name' => 'صالة العرض الرئيسية — الزمالك',
        'address' => 'شارع حسن صبري، الزمالك، القاهرة',
        'hours' => 'يومياً: 10:00 ص - 10:00 م',
        'phone' => '+20 2 2736 0000',
        'isOpenNow' => true,
    ],
    [
        'id' => 'alex-boutique',
        'city' => 'الإسكندرية',
        'name' => 'بوتيك الإسكندرية — كفر عبده',
        'address' => 'شارع خليل خياط، كفر عبده، الإسكندرية',
        'hours' => 'يومياً: 11:00 ص - 10:00 م',
        'phone' => '+20 3 545 0000',
        'isOpenNow' => false,
    ]
];
$class = $class ?? '';
?>
<section class="qhr-store-locator <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" style="padding: 60px 0;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h3 style="font-family: var(--qhr-font-family-display, serif); font-size: 32px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">
      <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
    </h3>
    <p style="color: #B9A896; font-size: 15px;"><?= htmlspecialchars($subtitle, ENT_QUOTES, 'UTF-8') ?></p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; maxWidth: 1200px; margin: 0 auto; padding: 0 20px;">
    <?php foreach ($stores as $store): ?>
      <div class="qhr-card" style="background-color: #17120F; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 12px; color: #D4AF37; font-weight: 600;"><?= htmlspecialchars($store['city'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
            <span class="qhr-badge qhr-badge--outline qhr-badge--xs" style="<?= ($store['isOpenNow'] ?? false) ? 'color: var(--qhr-color-success-500); border-color: var(--qhr-color-success-500);' : 'color: #8C7E70; border-color: #8C7E70;' ?>">
              <?= ($store['isOpenNow'] ?? false) ? 'مفتوح الآن' : 'مغلق' ?>
            </span>
          </div>

          <h4 style="font-size: 18px; font-weight: 700; color: #F7F3ED; margin-bottom: 8px;">
            <?= htmlspecialchars($store['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>
          </h4>

          <p style="font-size: 13px; color: #B9A896; line-height: 1.6; margin-bottom: 12px;">
            <?= htmlspecialchars($store['address'] ?? '', ENT_QUOTES, 'UTF-8') ?>
          </p>

          <div style="font-size: 12px; color: #8C7E70; display: flex; flex-direction: column; gap: 4px;">
            <div>ساعات العمل: <?= htmlspecialchars($store['hours'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
            <div>الهاتف: <?= htmlspecialchars($store['phone'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
          </div>
        </div>

        <div style="margin-top: 20px; display: flex; gap: 8px;">
          <button type="button" class="qhr-btn qhr-btn--outline qhr-btn--sm" style="flex: 1; border-color: rgba(212, 175, 55, 0.3); color: #D4AF37;">
            <span>تفاصيل الفرع</span>
          </button>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>

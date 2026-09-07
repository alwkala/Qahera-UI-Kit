<?php
/**
 * Qahera UI Kit — Luxury Product Card Pattern (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $title Product title
 * @var string $collection Collection name
 * @var string $price Formatted current price
 * @var string $originalPrice Optional crossed-out original price
 * @var string $badgeText Material badge (e.g. ستيل 316L)
 * @var string $material Material specification
 * @var string $imageUrl Optional product image URL
 * @var string $class Additional CSS classes
 */

$title = $title ?? 'خاتم الأفق الذهبي';
$collection = $collection ?? 'مجموعة القاهرة الحصرية';
$price = $price ?? '1,850 ر.س';
$originalPrice = $originalPrice ?? null;
$badgeText = $badgeText ?? 'ستيل 316L مقاوم للصدأ';
$material = $material ?? 'Steel 316L · مطلي ذهب عيار 18';
$imageUrl = $imageUrl ?? null;
$class = $class ?? '';
?>
<div class="qhr-luxury-product-card <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
     style="background-color: #17120F; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; overflow: hidden; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);">
  
  <div style="position: relative; width: 100%; height: 260px; background-color: #0F0B09; display: flex; align-items: center; justify-content: center; overflow: hidden;">
    <?php if (!empty($imageUrl)): ?>
      <img src="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" style="width: 100%; height: 100%; object-fit: cover;">
    <?php else: ?>
      <div style="color: rgba(212, 175, 55, 0.4); text-align: center;">
        <?= $this->insert('qahera::icon', ['name' => 'tag', 'size' => 48]) ?>
      </div>
    <?php endif; ?>

    <?php if (!empty($badgeText)): ?>
      <div style="position: absolute; top: 12px; inset-inline-end: 12px;">
        <span class="qhr-badge qhr-badge--outline qhr-badge--sm" style="background-color: rgba(15, 11, 9, 0.8); border-color: rgba(212, 175, 55, 0.4); color: #D4AF37;">
          <?= htmlspecialchars($badgeText, ENT_QUOTES, 'UTF-8') ?>
        </span>
      </div>
    <?php endif; ?>
  </div>

  <div style="padding: 20px;">
    <div style="font-size: 12px; color: #B9A896; margin-bottom: 4px;">
      <?= htmlspecialchars($collection, ENT_QUOTES, 'UTF-8') ?>
    </div>
    <h4 style="font-size: 18px; font-weight: 700; color: #F7F3ED; margin: 0 0 8px 0; font-family: var(--qhr-font-family-display, serif);">
      <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
    </h4>
    <div style="font-size: 12px; color: #8C7E70; margin-bottom: 16px;">
      <?= htmlspecialchars($material, ENT_QUOTES, 'UTF-8') ?>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div>
        <span style="font-size: 20px; font-weight: 700; color: #D4AF37; font-family: monospace;">
          <?= htmlspecialchars($price, ENT_QUOTES, 'UTF-8') ?>
        </span>
        <?php if (!empty($originalPrice)): ?>
          <span style="font-size: 13px; color: #8C7E70; text-decoration: line-through; margin-inline-start: 8px;">
            <?= htmlspecialchars($originalPrice, ENT_QUOTES, 'UTF-8') ?>
          </span>
        <?php endif; ?>
      </div>

      <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm" style="background-color: #D4AF37; color: #0F0B09; font-weight: 600;">
        <?= $this->insert('qahera::icon', ['name' => 'cart', 'size' => 14]) ?>
        <span>طلب مقتنى</span>
      </button>
    </div>
  </div>
</div>

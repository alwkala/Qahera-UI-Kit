<?php
/**
 * Qahera UI Kit — Editorial Story Pattern (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $kicker Category kicker badge
 * @var string $headline Main display title
 * @var string $subheadline Subtitle text
 * @var array $paragraphs Narrative text paragraphs
 * @var string $quote Optional italic quote
 * @var string $quoteAuthor Optional quote author
 * @var string $actionLabel CTA button label
 * @var string $imageUrl Media image URL
 * @var string $class Additional CSS classes
 */

$kicker = $kicker ?? 'فلسفة الصنعة';
$headline = $headline ?? 'حكاية مسبوكة بالذهب والأصالة المصرية';
$subheadline = $subheadline ?? 'حيث تلتقي صلابة الفولاذ الملكي مع رقة الحلية المعاصرة';
$paragraphs = $paragraphs ?? [
    'في قلب القاهرة، تصاغ المقتنيات ليس كمجرد زينة، بل كوثيقة جمالية تعبر عن شخصية مقتنيها وثباته.',
    'نستخدم في تشكيل كل قطعة أجود أنواع الفولاذ المقاوم للصدأ بدرجة 316L مع طلاء الذهب عيار 18 المقاوم للتلاشي.'
];
$quote = $quote ?? 'الجمال الحقيقي هو ما يدوم معك دون أن يفقده الزمن بريقه.';
$quoteAuthor = $quoteAuthor ?? 'حرفيو القاهرة';
$actionLabel = $actionLabel ?? 'اكتشف الحكاية كاملة';
$imageUrl = $imageUrl ?? null;
$class = $class ?? '';
?>
<section class="qhr-editorial-story <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>" 
         style="padding: 80px 0; background-color: #0F0B09; border-top: 1px solid rgba(255, 255, 255, 0.06); border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center;">
    <div>
      <?php if (!empty($kicker)): ?>
        <span class="qhr-badge qhr-badge--outline qhr-badge--sm" style="border-color: rgba(212, 175, 55, 0.3); color: #D4AF37; margin-bottom: 16px;">
          <?= htmlspecialchars($kicker, ENT_QUOTES, 'UTF-8') ?>
        </span>
      <?php endif; ?>

      <h2 style="font-family: var(--qhr-font-family-display, serif); font-size: 36px; font-weight: 700; color: #F7F3ED; line-height: 1.3; margin: 0 0 12px 0;">
        <?= htmlspecialchars($headline, ENT_QUOTES, 'UTF-8') ?>
      </h2>

      <?php if (!empty($subheadline)): ?>
        <p style="font-size: 18px; color: #D4AF37; margin-bottom: 24px;">
          <?= htmlspecialchars($subheadline, ENT_QUOTES, 'UTF-8') ?>
        </p>
      <?php endif; ?>

      <?php foreach ($paragraphs as $p): ?>
        <p style="font-size: 15px; line-height: 1.8; color: #B9A896; margin-bottom: 16px;">
          <?= htmlspecialchars($p, ENT_QUOTES, 'UTF-8') ?>
        </p>
      <?php endforeach; ?>

      <?php if (!empty($quote)): ?>
        <blockquote style="margin: 28px 0; padding-inline-start: 20px; border-inline-start: 2px solid #D4AF37; font-style: italic; color: #F7F3ED; font-size: 16px;">
          "<?= htmlspecialchars($quote, ENT_QUOTES, 'UTF-8') ?>"
          <?php if (!empty($quoteAuthor)): ?>
            <footer style="font-size: 13px; color: #8C7E70; margin-top: 6px; font-style: normal;">
              — <?= htmlspecialchars($quoteAuthor, ENT_QUOTES, 'UTF-8') ?>
            </footer>
          <?php endif; ?>
        </blockquote>
      <?php endif; ?>

      <?php if (!empty($actionLabel)): ?>
        <button type="button" class="qhr-btn qhr-btn--outline qhr-btn--md" style="border-color: rgba(212, 175, 55, 0.4); color: #D4AF37; margin-top: 12px;">
          <span><?= htmlspecialchars($actionLabel, ENT_QUOTES, 'UTF-8') ?></span>
          <?= $this->insert('qahera::icon', ['name' => 'arrow-end', 'size' => 16]) ?>
        </button>
      <?php endif; ?>
    </div>

    <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.2); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); height: 480px; background-color: #17120F; display: flex; align-items: center; justify-content: center;">
      <?php if (!empty($imageUrl)): ?>
        <img src="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($headline, ENT_QUOTES, 'UTF-8') ?>" style="width: 100%; height: 100%; object-fit: cover;">
      <?php else: ?>
        <div style="text-align: center; color: rgba(212, 175, 55, 0.3);">
          <?= $this->insert('qahera::icon', ['name' => 'tag', 'size' => 64]) ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php
/**
 * Qahera UI Kit — Hero Skyline Panorama Pattern (League/Plates Template)
 * 
 * Full-bleed architectural brand hero layout pairing a clean typography column
 * with a bottom-anchored architectural skyline illustration and feathered gradient mask.
 * 
 * @var \League\Plates\Template\Template $this
 * @var string $title Main headline text
 * @var string $kicker Optional kicker or category badge text
 * @var string $statement Subheading or bold value statement
 * @var string $body Descriptive body copy
 * @var string $primaryAction Primary CTA button label
 * @var string $secondaryAction Secondary CTA button label
 * @var string $primaryHref Primary CTA link url
 * @var string $secondaryHref Secondary CTA link url
 * @var string $backgroundImage Background skyline illustration URL
 * @var string $class Additional CSS classes
 */

$title = $title ?? 'منظومة التصميم المعماري لعصر الذكاء الاصطناعي';
$kicker = $kicker ?? '';
$statement = $statement ?? '';
$body = $body ?? '';
$primaryAction = $primaryAction ?? '';
$secondaryAction = $secondaryAction ?? '';
$primaryHref = $primaryHref ?? '#';
$secondaryHref = $secondaryHref ?? '#';
$backgroundImage = $backgroundImage ?? '';
$class = $class ?? '';
?>
<section role="banner"
         aria-label="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>"
         class="qhr-hero-skyline-panorama <?= htmlspecialchars($class, ENT_QUOTES, 'UTF-8') ?>"
         style="position: relative; height: clamp(500px, 62vh, 588px); max-height: 588px; overflow: hidden; display: flex; align-items: center;">

  <?php if (!empty($backgroundImage)): ?>
    <div aria-hidden="true" style="position: absolute; inset: 0; z-index: 0;">
      <img src="<?= htmlspecialchars($backgroundImage, ENT_QUOTES, 'UTF-8') ?>"
           alt=""
           style="width: 100%; height: 100%; object-fit: cover; object-position: bottom;" />
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 70%, transparent);"></div>
    </div>
  <?php endif; ?>

  <div style="position: relative; z-index: 1; max-width: 1200px; margin-inline: auto; padding-inline: var(--qhr-space-6); display: grid; grid-template-columns: 1fr 1fr; gap: var(--qhr-space-8); align-items: center; width: 100%;">
    <div style="max-width: min(100%, 540px);">
      <?php if (!empty($kicker)): ?>
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm" style="margin-block-end: var(--qhr-space-3); display: inline-flex;">
          <?= htmlspecialchars($kicker, ENT_QUOTES, 'UTF-8') ?>
        </span>
      <?php endif; ?>

      <h1 style="font-family: var(--qhr-font-family-primary); font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: var(--qhr-color-neutral-50); line-height: 1.2; margin: 0 0 var(--qhr-space-3) 0;">
        <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
      </h1>

      <?php if (!empty($statement)): ?>
        <p style="font-size: var(--qhr-text-lg); color: var(--qhr-color-primary-300); margin-block-end: var(--qhr-space-3); font-weight: 500;">
          <?= htmlspecialchars($statement, ENT_QUOTES, 'UTF-8') ?>
        </p>
      <?php endif; ?>

      <?php if (!empty($body)): ?>
        <p style="font-size: var(--qhr-text-base); color: var(--qhr-color-neutral-300); line-height: 1.6; margin-block-end: var(--qhr-space-6);">
          <?= htmlspecialchars($body, ENT_QUOTES, 'UTF-8') ?>
        </p>
      <?php endif; ?>

      <?php if (!empty($primaryAction) || !empty($secondaryAction)): ?>
        <div style="display: flex; gap: var(--qhr-space-3); flex-wrap: wrap;">
          <?php if (!empty($primaryAction)): ?>
            <a href="<?= htmlspecialchars($primaryHref, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--primary qhr-btn--lg">
              <?= htmlspecialchars($primaryAction, ENT_QUOTES, 'UTF-8') ?>
            </a>
          <?php endif; ?>
          <?php if (!empty($secondaryAction)): ?>
            <a href="<?= htmlspecialchars($secondaryHref, ENT_QUOTES, 'UTF-8') ?>" class="qhr-btn qhr-btn--outline qhr-btn--lg" style="border-color: rgba(255,255,255,0.3); color: var(--qhr-color-neutral-50);">
              <?= htmlspecialchars($secondaryAction, ENT_QUOTES, 'UTF-8') ?>
            </a>
          <?php endif; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

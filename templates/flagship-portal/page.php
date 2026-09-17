<?php
/**
 * Qahera UI Kit — Flagship Portal Page View Fragment
 *
 * @package   Qahera\Templates
 * @category  Foundation
 * @author    Alwkala Studio
 */

declare(strict_types=1);

namespace Qahera\Templates;

class FlagshipPortalPage
{
    /**
     * Render the template view
     *
     * @param array<string, mixed> $data Template context data
     * @return string Rendered HTML
     */
    public static function render(array $data = []): string
    {
        $lang = $data['lang'] ?? 'ar';
        $theme = $data['theme'] ?? 'zamalek';
        $dir = $lang === 'ar' ? 'rtl' : 'ltr';

        ob_start();
        ?>
        <div class="qhr-flagship-portal" data-theme="<?php echo htmlspecialchars($theme, ENT_QUOTES); ?>" dir="<?php echo htmlspecialchars($dir, ENT_QUOTES); ?>">
            <section class="portal-hero" style="text-align: center; padding-block: 60px 40px;">
                <div class="portal-container">
                    <span class="qhr-badge qhr-badge--solid qhr-badge--sm" style="background: var(--qhr-color-nebu); color: #181307;">
                        <?php echo $lang === 'ar' ? '15 معياراً صارماً' : '15 Invariants'; ?>
                    </span>
                    <h1 style="font-family: var(--qhr-font-heading); font-size: 2.5rem; font-weight: 900; margin-block: 16px 8px;">
                        <?php echo $lang === 'ar' ? 'صمّم اللغة.. ودع الذكاء الاصطناعي يتحدث بها' : 'Design the Language. Let AI Speak It.'; ?>
                    </h1>
                    <p style="color: var(--qhr-text-secondary); max-width: 640px; margin: 0 auto 24px;">
                        <?php echo $lang === 'ar' ? 'لغة تصميم قابلة للتنفيذ تمنح المطورين ووكلاء الذكاء الاصطناعي مفردات موحدة.' : 'An executable design language for modern AI-assisted web platforms.'; ?>
                    </p>
                    <div style="display: flex; justify-content: center; gap: 12px;">
                        <a href="/showcase" class="qhr-btn qhr-btn--primary qhr-btn--md">
                            <span><?php echo $lang === 'ar' ? 'استكشف المعرض' : 'Explore Showcase'; ?></span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
        <?php
        return (string) ob_get_clean();
    }
}

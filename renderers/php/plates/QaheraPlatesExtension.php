<?php

namespace Qahera\Renderers\Plates;

/**
 * Qahera UI Kit — League/Plates Extension
 * 
 * Seamlessly integrates Qahera UI Kit components with League/Plates template engine
 * for modern PHP 8.x applications (Flight, Laravel, Slim, WordPress, TidyFactor Kernel).
 * 
 * Usage:
 * ```php
 * $engine = new \League\Plates\Engine('/path/to/views');
 * \Qahera\Renderers\Plates\QaheraPlatesExtension::register($engine);
 * 
 * // In templates:
 * <?= $this->qhrButton(['label' => 'حفظ', 'variant' => 'primary']) ?>
 * <?= $this->qhrIcon('check', 18) ?>
 * <?= $this->qhrAlert(['message' => 'تم الحفظ بنجاح', 'tone' => 'success']) ?>
 * ```
 */
class QaheraPlatesExtension
{
    /**
     * Component methods mapping to template files
     */
    protected const COMPONENTS = [
        'qhrAccordion'    => 'accordion',
        'qhrAlert'        => 'alert',
        'qhrAvatar'       => 'avatar',
        'qhrBackToTop'    => 'back-to-top',
        'qhrBadge'        => 'badge',
        'qhrBreadcrumb'   => 'breadcrumb',
        'qhrButton'       => 'button',
        'qhrCallout'      => 'callout',
        'qhrCanvasSparks' => 'canvas-sparks',
        'qhrCard'         => 'card',
        'qhrCarousel'     => 'carousel',
        'qhrCheckbox'     => 'checkbox',
        'qhrChip'         => 'chip',
        'qhrDivider'      => 'divider',
        'qhrDock'         => 'dock',
        'qhrDrawer'       => 'drawer',
        'qhrDropdown'     => 'dropdown',
        'qhrFileUpload'   => 'file-upload',
        'qhrIcon'         => 'icon',
        'qhrInput'        => 'input',
        'qhrKbd'          => 'kbd',
        'qhrMegamenu'     => 'megamenu',
        'qhrMenu'         => 'menu',
        'qhrModal'        => 'modal',
        'qhrNavbar'       => 'navbar',
        'qhrPaginationComponent' => 'pagination',
        'qhrPreloader'    => 'preloader',
        'qhrProgress'     => 'progress',
        'qhrRadio'        => 'radio',
        'qhrRating'       => 'rating',
        'qhrRibbon'       => 'ribbon',
        'qhrSelect'       => 'select',
        'qhrSkeleton'     => 'skeleton',
        'qhrSpinner'      => 'spinner',
        'qhrStepper'      => 'stepper',
        'qhrSwitch'       => 'switch',
        'qhrTable'        => 'table',
        'qhrTabs'         => 'tabs',
        'qhrTextarea'     => 'textarea',
        'qhrTimeline'     => 'timeline',
        'qhrToast'        => 'toast',
        'qhrTooltip'      => 'tooltip',
        'qhrTreeview'     => 'treeview',
    ];

    protected const PATTERNS = [
        'qhrChatStream'          => 'patterns/chat-stream',
        'qhrConfirmation'        => 'patterns/confirmation',
        'qhrDashboardStat'       => 'patterns/dashboard-stat',
        'qhrDataTableToolbar'    => 'patterns/data-table-toolbar',
        'qhrDatePaginator'       => 'patterns/date-paginator',
        'qhrEditorialStory'      => 'patterns/editorial-story',
        'qhrEmptyState'          => 'patterns/empty-state',
        'qhrFileManagerGrid'     => 'patterns/file-manager-grid',
        'qhrFilterBar'           => 'patterns/filter-bar',
        'qhrFormActions'         => 'patterns/form-actions',
        'qhrKanbanBoard'         => 'patterns/kanban-board',
        'qhrLuxuryProductCard'   => 'patterns/luxury-product-card',
        'qhrMetricComparisonGrid' => 'patterns/metric-comparison-grid',
        'qhrPagination'          => 'patterns/pagination',
        'qhrPaginationPattern'   => 'patterns/pagination',
        'qhrQuestionnaire'       => 'patterns/questionnaire',
        'qhrSearchToolbar'       => 'patterns/search-toolbar',
        'qhrSortableList'        => 'patterns/sortable-list',
        'qhrStoreLocator'        => 'patterns/store-locator',
        'qhrUserCard'            => 'patterns/user-card',
        'qhrVipMembership'       => 'patterns/vip-membership',
    ];

    /**
     * Register Qahera folder alias and template helper functions in a Plates Engine instance.
     *
     * @param object $engine \League\Plates\Engine instance
     * @param string|null $templatesPath Optional custom path to plates templates
     * @return object
     */
    public static function register(object $engine, ?string $templatesPath = null): object
    {
        $dir = $templatesPath ?? __DIR__;

        // Register folder namespace 'qahera'
        if (method_exists($engine, 'addFolder')) {
            $engine->addFolder('qahera', $dir);
        }

        // Register shorthand helper functions
        if (method_exists($engine, 'registerFunction')) {
            // Icon shorthand: qhrIcon('name', size: 20, class: '')
            $engine->registerFunction('qhrIcon', function (string $name, int $size = 20, string $class = '') use ($engine) {
                return $engine->render('qahera::icon', [
                    'name'  => $name,
                    'size'  => $size,
                    'class' => $class,
                ]);
            });

            // Register remaining component helpers
            foreach (self::COMPONENTS as $fnName => $templateName) {
                if ($fnName === 'qhrIcon') {
                    continue;
                }

                $engine->registerFunction($fnName, function (array $props = []) use ($engine, $templateName) {
                    return $engine->render("qahera::{$templateName}", $props);
                });
            }

            // Register composite pattern helpers
            foreach (self::PATTERNS as $fnName => $templateName) {
                $engine->registerFunction($fnName, function (array $props = []) use ($engine, $templateName) {
                    return $engine->render("qahera::{$templateName}", $props);
                });
            }
        }

        return $engine;
    }
}

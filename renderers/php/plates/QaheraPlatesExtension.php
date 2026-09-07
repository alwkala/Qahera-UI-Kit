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
        'qhrButton'    => 'button',
        'qhrIcon'      => 'icon',
        'qhrBadge'     => 'badge',
        'qhrAlert'     => 'alert',
        'qhrAvatar'    => 'avatar',
        'qhrCard'      => 'card',
        'qhrInput'     => 'input',
        'qhrTextarea'  => 'textarea',
        'qhrSelect'    => 'select',
        'qhrCheckbox'  => 'checkbox',
        'qhrRadio'     => 'radio',
        'qhrTable'     => 'table',
        'qhrModal'     => 'modal',
        'qhrDropdown'  => 'dropdown',
        'qhrTabs'      => 'tabs',
        'qhrAccordion' => 'accordion',
        'qhrToast'     => 'toast',
        'qhrTooltip'   => 'tooltip',
        'qhrNavbar'    => 'navbar',
        'qhrBreadcrumb'=> 'breadcrumb',
        'qhrCarousel'  => 'carousel',
        'qhrProgress'  => 'progress',
        'qhrSpinner'   => 'spinner',
        'qhrStepper'   => 'stepper',
        'qhrSwitch'    => 'switch',
        'qhrTimeline'  => 'timeline',
        'qhrCallout'   => 'callout',
        'qhrRibbon'    => 'ribbon',
    ];

    protected const PATTERNS = [
        'qhrSearchToolbar'   => 'patterns/search-toolbar',
        'qhrConfirmation'    => 'patterns/confirmation',
        'qhrDashboardStat'   => 'patterns/dashboard-stat',
        'qhrEmptyState'      => 'patterns/empty-state',
        'qhrFilterBar'       => 'patterns/filter-bar',
        'qhrFormActions'     => 'patterns/form-actions',
        'qhrPagination'      => 'patterns/pagination',
        'qhrDataTableToolbar'=> 'patterns/data-table-toolbar',
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

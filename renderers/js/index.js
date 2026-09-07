/**
 * Qahera UI Kit — Vanilla JS Web Components: Auto-Registration Bundle
 *
 * Import this single file to register all 42 Qahera Custom Elements.
 * Each component self-registers via customElements.define() on import.
 *
 * Usage:
 *   <script type="module" src="renderers/js/index.js"></script>
 *
 * Or individual imports:
 *   import 'renderers/js/components/qhr-button.js';
 *
 * @module renderers/js/index
 * @version 1.5.0
 */

// ─── Core Base ───────────────────────────────────────────────────────
export { QaheraElement, QHR_ICON_PATHS, QHR_VARIANTS, QHR_SIZES, QHR_TONES, qhrIconSVG, qhrUniqueId } from './qhr-core.js';

// ─── Tier 1: Primitives ─────────────────────────────────────────────
export { QhrIcon }         from './components/qhr-icon.js';
export { QhrButton }       from './components/qhr-button.js';
export { QhrBadge }        from './components/qhr-badge.js';
export { QhrAvatar }       from './components/qhr-avatar.js';
export { QhrChip }         from './components/qhr-chip.js';
export { QhrDivider }      from './components/qhr-divider.js';
export { QhrKbd }          from './components/qhr-kbd.js';
export { QhrSkeleton }     from './components/qhr-skeleton.js';

// ─── Tier 2: Form Controls ──────────────────────────────────────────
export { QhrInput }        from './components/qhr-input.js';
export { QhrSelect }       from './components/qhr-select.js';
export { QhrTextarea }     from './components/qhr-textarea.js';
export { QhrCheckbox }     from './components/qhr-checkbox.js';
export { QhrRadio }        from './components/qhr-radio.js';
export { QhrFileUpload }   from './components/qhr-file-upload.js';
export { QhrRating }       from './components/qhr-rating.js';

// ─── Tier 3: Feedback ────────────────────────────────────────────────
export { QhrAlert }        from './components/qhr-alert.js';
export { QhrToast }        from './components/qhr-toast.js';
export { QhrTooltip }      from './components/qhr-tooltip.js';
export { QhrPreloader }    from './components/qhr-preloader.js';

// ─── Tier 4: Layout ─────────────────────────────────────────────────
export { QhrCard }         from './components/qhr-card.js';
export { QhrTable }        from './components/qhr-table.js';
export { QhrNavbar }       from './components/qhr-navbar.js';

// ─── Tier 5: Interactive ─────────────────────────────────────────────
export { QhrModal }        from './components/qhr-modal.js';
export { QhrDrawer }       from './components/qhr-drawer.js';
export { QhrDropdown }     from './components/qhr-dropdown.js';
export { QhrTabs }         from './components/qhr-tabs.js';
export { QhrAccordion }    from './components/qhr-accordion.js';
export { QhrCarousel }     from './components/qhr-carousel.js';
export { QhrTreeview }     from './components/qhr-treeview.js';

// ─── Tier 6: Extended Components ─────────────────────────────────────
export { QhrBreadcrumb }   from './components/qhr-breadcrumb.js';
export { QhrProgress }     from './components/qhr-progress.js';
export { QhrSpinner }      from './components/qhr-spinner.js';
export { QhrSwitch }       from './components/qhr-switch.js';
export { QhrTimeline }     from './components/qhr-timeline.js';
export { QhrCallout }      from './components/qhr-callout.js';
export { QhrRibbon }       from './components/qhr-ribbon.js';
export { QhrStepper }      from './components/qhr-stepper.js';

// ─── Tier 7: Utilities ──────────────────────────────────────────────
export { QhrBackToTop }    from './components/qhr-back-to-top.js';
export { QhrCanvasSparks } from './components/qhr-canvas-sparks.js';

// ─── Registration Verification ──────────────────────────────────────
const QHR_COMPONENTS = [
  'qhr-icon', 'qhr-btn', 'qhr-badge', 'qhr-avatar', 'qhr-chip', 'qhr-divider', 'qhr-kbd', 'qhr-skeleton',
  'qhr-input', 'qhr-select', 'qhr-textarea', 'qhr-checkbox', 'qhr-radio', 'qhr-file-upload', 'qhr-rating',
  'qhr-alert', 'qhr-toast', 'qhr-tooltip', 'qhr-preloader',
  'qhr-card', 'qhr-table', 'qhr-navbar',
  'qhr-modal', 'qhr-drawer', 'qhr-dropdown', 'qhr-tabs', 'qhr-accordion', 'qhr-carousel', 'qhr-treeview',
  'qhr-breadcrumb', 'qhr-progress', 'qhr-spinner', 'qhr-switch', 'qhr-timeline', 'qhr-callout', 'qhr-ribbon', 'qhr-stepper',
  'qhr-back-to-top', 'qhr-canvas-sparks',
];

if (typeof window !== 'undefined') {
  console.info(
    `%c⚡ Qahera Web Components v1.0%c — ${QHR_COMPONENTS.length} elements registered`,
    'color: #d4a853; font-weight: bold;',
    'color: inherit;'
  );
}

/**
 * Qahera UI Kit — React 19 & Next.js 16 Package Entry
 * 
 * Multi-target canonical renderer supporting React Server Components (RSC)
 * and leaf-level Client Components.
 */

// Types
export * from './types';

// Canonical Icon Component
export * from './Icon';

// React Server Components (RSC - 0kb client JS footprint)
export * from './Button';
export * from './Badge';
export * from './Card';
export * from './Alert';
export * from './Avatar';
export * from './Input';
export * from './Textarea';
export * from './Checkbox';
export * from './Radio';
export * from './Table';
export * from './Navbar';

// Interactive Client Components ('use client')
export * from './Modal';
export * from './Dropdown';
export * from './Tabs';
export * from './Accordion';
export * from './Select';
export * from './Toast';
export * from './Tooltip';
export * from './Carousel';

// Extended Components
export * from './Breadcrumb';
export * from './Progress';
export * from './Spinner';
export * from './Switch';
export * from './Timeline';
export * from './Callout';
export * from './Ribbon';
export * from './Stepper';
export * from './Pagination';

// New Advanced Primitives (38 Total Components)
export * from './Drawer';
export * from './FileUpload';
export * from './Rating';
export * from './Chip';
export * from './Kbd';
export * from './Divider';
export * from './Skeleton';
export * from './Treeview';

// Heritage Architectural Primitives
export * from './Cartouche';
export * from './Frieze';
export * from './Seal';

// Composite Patterns (Excluding primitive Pagination collision)
export {
  SearchToolbar,
  ConfirmationDialog,
  DashboardStat,
  EmptyState,
  FilterBar,
  FormActions,
  DataTableToolbar,
  LuxuryProductCard,
  EditorialStory,
  StoreLocator,
  VipMembership,
} from './patterns';
export type {
  SearchToolbarProps,
  ConfirmationDialogProps,
  DashboardStatProps,
  EmptyStateProps,
  FilterBarProps,
  FormActionsProps,
  DataTableToolbarProps,
  LuxuryProductCardProps,
  EditorialStoryProps,
  StoreLocatorProps,
  VipMembershipProps,
} from './patterns';
export { Pagination as PaginationPattern } from './patterns';
export type { PaginationProps as PaginationPatternProps } from './patterns';


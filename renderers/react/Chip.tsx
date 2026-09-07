import React from 'react';

export interface ChipProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'outline';
  onRemove?: () => void;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  size = 'md',
  variant = 'default',
  onRemove,
  onClick
}) => {
  return (
    <div
      className={`qhr-chip qhr-chip--${size} qhr-chip--${variant}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          className="qhr-chip-remove"
          aria-label={`إزالة ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

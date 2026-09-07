'use client';

import React from 'react';

export interface RatingProps {
  value: number;
  max?: number;
  isReadonly?: boolean;
  onChange?: (value: number) => void;
  showLabel?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  isReadonly = true,
  onChange,
  showLabel = false
}) => {
  return (
    <div 
      className={`qhr-rating ${isReadonly ? 'qhr-rating--readonly' : ''}`}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={1}
      aria-valuemax={max}
      aria-label={`تقييم ${value} من ${max}`}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          className={`qhr-rating-star ${star <= value ? 'qhr-rating-star--filled' : ''}`}
          aria-label={`نجمة ${star}`}
          disabled={isReadonly}
          onClick={() => !isReadonly && onChange?.(star)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {showLabel && <span className="qhr-rating-label">{value.toFixed(1)}</span>}
    </div>
  );
};

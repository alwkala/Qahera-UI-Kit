import React from 'react';

export interface SkeletonProps {
  shape?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  shape = 'rectangular',
  width,
  height,
  className = ''
}) => {
  const style: React.CSSProperties = {
    width: width !== undefined ? width : '100%',
    height: height !== undefined ? height : (shape === 'text' ? '1rem' : '20px')
  };

  return (
    <div
      className={`qhr-skeleton ${shape !== 'rectangular' ? `qhr-skeleton--${shape}` : ''} ${className}`}
      style={style}
      role="status"
      aria-busy="true"
      aria-label="جاري تحميل المحتوى"
    />
  );
};

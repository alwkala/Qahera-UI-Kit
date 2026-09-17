import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Progress } from '../Progress';
import { Divider } from '../Divider';
import { Icon } from '../Icon';

export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  previousValue?: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  benchmark?: number;
  unit?: string;
}

export interface MetricComparisonGridProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: MetricItem[];
  title?: string;
}

export function MetricComparisonGrid({
  metrics,
  title = 'مقارنة المؤشرات',
  className = '',
  ...props
}: MetricComparisonGridProps) {
  const trendTone = (t?: string) =>
    t === 'up' ? 'success' : t === 'down' ? 'danger' : 'neutral';

  return (
    <div
      role="region"
      aria-label={title}
      className={`qhr-metric-comparison-grid ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--qhr-space-5)',
      }}
      {...props}
    >
      {metrics.map((m) => (
        <Card
          key={m.id}
          style={{
            padding: 'var(--qhr-space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--qhr-space-3)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: 'var(--qhr-text-sm)',
                color: 'var(--qhr-color-neutral-600)',
                fontWeight: 500,
              }}
            >
              {m.label}
            </span>
            {m.delta && (
              <Badge tone={trendTone(m.trend)} size="sm">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  {m.trend === 'up' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  )}
                  {m.trend === 'down' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                  {m.delta}
                </span>
              </Badge>
            )}
          </div>

          {/* Value */}
          <div
            style={{
              fontSize: 'var(--qhr-text-2xl)',
              fontWeight: 700,
              color: 'var(--qhr-color-neutral-900)',
              letterSpacing: '-0.02em',
            }}
          >
            {m.value}
            {m.unit && (
              <span style={{ fontSize: 'var(--qhr-text-sm)', fontWeight: 400, marginInlineStart: 'var(--qhr-space-1)' }}>
                {m.unit}
              </span>
            )}
          </div>

          {/* Previous Value */}
          {m.previousValue !== undefined && (
            <>
              <Divider />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--qhr-text-xs)',
                  color: 'var(--qhr-color-neutral-500)',
                }}
              >
                <span>الفترة السابقة</span>
                <span>{m.previousValue}</span>
              </div>
            </>
          )}

          {/* Benchmark Bar */}
          {m.benchmark !== undefined && (
            <Progress value={m.benchmark} size="sm" />
          )}
        </Card>
      ))}
    </div>
  );
}

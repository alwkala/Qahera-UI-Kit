import React from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export interface HeroSkylinePanoramaProps extends React.HTMLAttributes<HTMLElement> {
  kicker?: string;
  title: string;
  statement?: string;
  body?: string;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  backgroundImage?: string;
}

export function HeroSkylinePanorama({
  kicker,
  title,
  statement,
  body,
  primaryAction,
  secondaryAction,
  onPrimary,
  onSecondary,
  backgroundImage,
  className = '',
  ...props
}: HeroSkylinePanoramaProps) {
  return (
    <section
      role="banner"
      aria-label={title}
      className={`qhr-hero-skyline-panorama ${className}`.trim()}
      style={{
        position: 'relative',
        height: 'clamp(500px, 62vh, 588px)',
        maxHeight: '588px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      {...props}
    >
      {/* Background Layer */}
      {backgroundImage && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src={backgroundImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 70%, transparent)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--qhr-space-6)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--qhr-space-8)',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Text Column */}
        <div style={{ maxWidth: 'min(100%, 540px)' }}>
          {kicker && (
            <Badge tone="primary" size="sm" style={{ marginBlockEnd: 'var(--qhr-space-3)' }}>
              {kicker}
            </Badge>
          )}

          <h1
            style={{
              fontFamily: 'var(--qhr-font-family-primary)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: 'var(--qhr-color-neutral-50)',
              lineHeight: 1.2,
              margin: '0 0 var(--qhr-space-3) 0',
            }}
          >
            {title}
          </h1>

          {statement && (
            <p
              style={{
                fontSize: 'var(--qhr-text-lg)',
                color: 'var(--qhr-color-primary-300)',
                marginBlockEnd: 'var(--qhr-space-3)',
                fontWeight: 500,
              }}
            >
              {statement}
            </p>
          )}

          {body && (
            <p
              style={{
                fontSize: 'var(--qhr-text-sm)',
                color: 'var(--qhr-color-neutral-400)',
                lineHeight: 1.8,
                marginBlockEnd: 'var(--qhr-space-5)',
              }}
            >
              {body}
            </p>
          )}

          <div style={{ display: 'flex', gap: 'var(--qhr-space-3)', flexWrap: 'wrap' }}>
            {primaryAction && (
              <Button variant="primary" size="lg" onClick={onPrimary}>
                <span>{primaryAction}</span>
                <Icon name="arrow-end" size={18} />
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" size="lg" onClick={onSecondary}>
                <span>{secondaryAction}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

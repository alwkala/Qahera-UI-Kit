import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface EditorialStoryProps {
  kicker?: string;
  headline: string;
  subheadline?: string;
  paragraphs: string[];
  quote?: string;
  quoteAuthor?: string;
  actionLabel?: string;
  onAction?: () => void;
  imageUrl?: string;
  className?: string;
}

export function EditorialStory({
  kicker = 'فلسفة الصنعة',
  headline,
  subheadline,
  paragraphs,
  quote,
  quoteAuthor,
  actionLabel = 'اكتشف الحكاية كاملة',
  onAction,
  imageUrl,
  className = '',
}: EditorialStoryProps) {
  return (
    <section 
      className={`qhr-editorial-story ${className}`}
      style={{
        padding: '80px 0',
        backgroundColor: '#0F0B09',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '48px',
        alignItems: 'center',
      }}>
        {/* Narrative Column */}
        <div>
          {kicker && (
            <Badge 
              tone="primary" 
              size="sm" 
              style={{ borderColor: 'rgba(212, 175, 55, 0.3)', color: '#D4AF37', marginBottom: '16px' }}
            >
              {kicker}
            </Badge>
          )}

          <h2 style={{
            fontFamily: 'var(--qhr-font-family-display, serif)',
            fontSize: '36px',
            fontWeight: 700,
            color: '#F7F3ED',
            lineHeight: 1.3,
            margin: '0 0 12px 0',
          }}>
            {headline}
          </h2>

          {subheadline && (
            <p style={{ fontSize: '18px', color: '#D4AF37', marginBottom: '24px' }}>
              {subheadline}
            </p>
          )}

          {paragraphs.map((p, idx) => (
            <p key={idx} style={{ fontSize: '15px', lineHeight: 1.8, color: '#B9A896', marginBottom: '16px' }}>
              {p}
            </p>
          ))}

          {quote && (
            <blockquote style={{
              margin: '28px 0',
              paddingInlineStart: '20px',
              borderInlineStart: '2px solid #D4AF37',
              fontStyle: 'italic',
              color: '#F7F3ED',
              fontSize: '16px',
            }}>
              "{quote}"
              {quoteAuthor && (
                <footer style={{ fontSize: '13px', color: '#8C7E70', marginTop: '6px', fontStyle: 'normal' }}>
                  — {quoteAuthor}
                </footer>
              )}
            </blockquote>
          )}

          {actionLabel && (
            <Button 
              variant="outline" 
              size="md"
              onClick={onAction}
              style={{
                borderColor: 'rgba(212, 175, 55, 0.4)',
                color: '#D4AF37',
                marginTop: '12px',
              }}
            >
              <span>{actionLabel}</span>
              <Icon name="arrow-end" size={16} />
            </Button>
          )}
        </div>

        {/* Media Frame Column */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          height: '480px',
          backgroundColor: '#17120F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={headline} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(212, 175, 55, 0.3)' }}>
              <Icon name="image" size={64} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

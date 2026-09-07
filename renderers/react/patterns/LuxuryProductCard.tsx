import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface LuxuryProductCardProps {
  title: string;
  collection?: string;
  price: string;
  originalPrice?: string;
  badgeText?: string;
  material?: string;
  imageUrl?: string;
  onAddToCart?: () => void;
  className?: string;
}

export function LuxuryProductCard({
  title,
  collection = 'المجموعة الخاصة',
  price,
  originalPrice,
  badgeText = 'ستيل 316L مقاوم للصدأ',
  material = 'Steel 316L · مطلي ذهب',
  imageUrl,
  onAddToCart,
  className = '',
}: LuxuryProductCardProps) {
  return (
    <Card 
      className={`qhr-luxury-product-card ${className}`}
      style={{
        backgroundColor: '#17120F',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      {/* Product Image Media Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          backgroundColor: '#0F0B09',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <div style={{ color: 'rgba(212, 175, 55, 0.4)', textAlign: 'center' }}>
            <Icon name="image" size={48} />
          </div>
        )}

        {/* Material Badge */}
        {badgeText && (
          <div style={{ position: 'absolute', top: '12px', insetInlineEnd: '12px' }}>
            <Badge 
              tone="primary" 
              size="sm"
              style={{
                backgroundColor: 'rgba(15, 11, 9, 0.8)',
                borderColor: 'rgba(212, 175, 55, 0.4)',
                color: '#D4AF37',
              }}
            >
              {badgeText}
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '12px', color: '#B9A896', marginBottom: '4px' }}>
          {collection}
        </div>
        <h4 style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          color: '#F7F3ED', 
          margin: '0 0 8px 0',
          fontFamily: 'var(--qhr-font-family-display, serif)',
        }}>
          {title}
        </h4>
        <div style={{ fontSize: '12px', color: '#8C7E70', marginBottom: '16px' }}>
          {material}
        </div>

        {/* Pricing and CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 700, 
              color: '#D4AF37',
              fontFamily: 'monospace',
            }}>
              {price}
            </span>
            {originalPrice && (
              <span style={{ 
                fontSize: '13px', 
                color: '#8C7E70', 
                textDecoration: 'line-through',
                marginInlineStart: '8px',
              }}>
                {originalPrice}
              </span>
            )}
          </div>

          <Button 
            variant="primary" 
            size="sm"
            onClick={onAddToCart}
            style={{
              backgroundColor: '#D4AF37',
              color: '#0F0B09',
              fontWeight: 600,
            }}
          >
            <Icon name="arrow-end" size={14} />
            <span>طلب مقتنى</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

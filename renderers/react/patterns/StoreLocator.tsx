import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  isOpenNow?: boolean;
  mapUrl?: string;
}

export interface StoreLocatorProps {
  stores: StoreLocation[];
  title?: string;
  subtitle?: string;
  onSelectStore?: (store: StoreLocation) => void;
  className?: string;
}

export function StoreLocator({
  stores,
  title = 'فروعنا وصالات العرض',
  subtitle = 'تفضل بزيارتنا في القاهرة والمدن الإقليمية لتجربة مقتنياتنا يدوياً',
  onSelectStore,
  className = '',
}: StoreLocatorProps) {
  return (
    <section className={`qhr-store-locator ${className}`} style={{ padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{
          fontFamily: 'var(--qhr-font-family-display, serif)',
          fontSize: '32px',
          fontWeight: 700,
          color: '#F7F3ED',
          marginBottom: '8px',
        }}>
          {title}
        </h3>
        <p style={{ color: '#B9A896', fontSize: '15px' }}>{subtitle}</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        {stores.map((store) => (
          <Card
            key={store.id}
            style={{
              backgroundColor: '#17120F',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 600 }}>{store.city}</span>
                <Badge
                  tone={store.isOpenNow ? 'success' : 'neutral'}
                  size="xs"
                >
                  {store.isOpenNow ? 'مفتوح الآن' : 'مغلق'}
                </Badge>
              </div>

              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>
                {store.name}
              </h4>

              <p style={{ fontSize: '13px', color: '#B9A896', lineHeight: 1.6, marginBottom: '12px' }}>
                {store.address}
              </p>

              <div style={{ fontSize: '12px', color: '#8C7E70', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>ساعات العمل: {store.hours}</div>
                <div>الهاتف: {store.phone}</div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectStore?.(store)}
                style={{ flex: 1, borderColor: 'rgba(212, 175, 55, 0.3)', color: '#D4AF37' }}
              >
                <span>تفاصيل الفرع</span>
              </Button>
              {store.mapUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(store.mapUrl, '_blank')}
                  aria-label="الموقع على الخريطة"
                >
                  <Icon name="external-link" size={16} />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

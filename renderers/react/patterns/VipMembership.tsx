import React, { useState } from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Input } from '../Input';
import { Icon } from '../Icon';

export interface VipMembershipProps {
  title?: string;
  tierName?: string;
  description?: string;
  perks: string[];
  onSubscribe?: (email: string) => void;
  className?: string;
}

export function VipMembership({
  title = 'نادي العضوية والمقتنيات الخاصة',
  tierName = 'GOLD TIER VIP',
  description = 'انضم إلى مجتمع صفوة المقتنين لتصلك الإصدارات المحدودة قبل طرحها العام، مع شحن مخصص وتغليف ملكي خاص.',
  perks,
  onSubscribe,
  className = '',
}: VipMembershipProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <Card
      className={`qhr-vip-membership ${className}`}
      style={{
        background: 'linear-gradient(135deg, #17120F 0%, #221A15 50%, #0F0B09 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Badge
          tone="primary"
          size="sm"
          style={{ borderColor: '#D4AF37', color: '#D4AF37', letterSpacing: '0.15em' }}
        >
          {tierName}
        </Badge>
        <span style={{ color: 'rgba(212, 175, 55, 0.4)' }}>
          <Icon name="check" size={24} />
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--qhr-font-family-display, serif)',
        fontSize: '28px',
        fontWeight: 700,
        color: '#F7F3ED',
        marginBottom: '12px',
      }}>
        {title}
      </h3>

      <p style={{ fontSize: '14px', color: '#B9A896', lineHeight: 1.7, marginBottom: '24px' }}>
        {description}
      </p>

      {/* Perks List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
        marginBottom: '28px',
      }}>
        {perks.map((perk, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#F7F3ED' }}>
            <span style={{ color: '#D4AF37', display: 'inline-flex' }}>
              <Icon name="check" size={16} />
            </span>
            <span>{perk}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <Input
            type="email"
            placeholder="أدخل بريدك الإلكتروني الخاص..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={subscribed}
            style={{
              backgroundColor: 'rgba(15, 11, 9, 0.7)',
              borderColor: 'rgba(212, 175, 55, 0.3)',
              color: '#F7F3ED',
            }}
          />
        </div>
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={subscribed}
          style={{
            backgroundColor: subscribed ? '#27AE60' : '#D4AF37',
            borderColor: subscribed ? '#27AE60' : '#D4AF37',
            color: '#0F0B09',
            fontWeight: 700,
            minWidth: '150px',
          }}
        >
          {subscribed ? (
            <>
              <Icon name="check" size={16} />
              <span>تم الانضمام بنجاح!</span>
            </>
          ) : (
            <>
              <span>انضم الآن للمقتنين</span>
              <Icon name="arrow-end" size={16} />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

'use client';

import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Progress } from '../Progress';
import { Icon } from '../Icon';

export interface QuestionChoice {
  id: string;
  label: string;
  shortcut?: string;
}

export interface QuestionnaireProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  category?: string;
  points?: number;
  prompt: string;
  description?: string;
  choices: QuestionChoice[];
  selectedId?: string;
  currentStep: number;
  totalSteps: number;
  onSelect?: (choiceId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  feedback?: string;
  feedbackType?: 'correct' | 'incorrect' | 'neutral';
}

export function Questionnaire({
  category,
  points,
  prompt,
  description,
  choices,
  selectedId,
  currentStep,
  totalSteps,
  onSelect,
  onNext,
  onPrev,
  onSkip,
  feedback,
  feedbackType = 'neutral',
  className = '',
  ...props
}: QuestionnaireProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div
      role="form"
      aria-label={`السؤال ${currentStep} من ${totalSteps}`}
      className={`qhr-questionnaire ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--qhr-space-6)',
        maxWidth: '720px',
        margin: '0 auto',
      }}
      {...props}
    >
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--qhr-space-3)' }}>
        <Progress value={progressPercent} size="sm" style={{ flex: 1 }} />
        <span style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)', whiteSpace: 'nowrap' }}>
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* Question Card */}
      <Card style={{ padding: 'var(--qhr-space-6)' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: 'var(--qhr-space-2)', marginBlockEnd: 'var(--qhr-space-4)' }}>
          {category && <Badge tone="info" size="sm">{category}</Badge>}
          {points !== undefined && (
            <Badge tone="neutral" size="sm">
              {points} نقاط
            </Badge>
          )}
        </div>

        {/* Prompt */}
        <h3
          style={{
            fontSize: 'var(--qhr-text-lg)',
            fontWeight: 700,
            color: 'var(--qhr-color-neutral-900)',
            margin: '0 0 var(--qhr-space-2) 0',
          }}
        >
          {prompt}
        </h3>

        {description && (
          <p style={{ fontSize: 'var(--qhr-text-sm)', color: 'var(--qhr-color-neutral-600)', marginBlockEnd: 'var(--qhr-space-4)', lineHeight: 1.6 }}>
            {description}
          </p>
        )}

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--qhr-space-2)' }}>
          {choices.map((choice) => {
            const isSelected = selectedId === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelect?.(choice.id)}
                className="qhr-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--qhr-space-3)',
                  padding: 'var(--qhr-space-3) var(--qhr-space-4)',
                  borderRadius: 'var(--qhr-radius-md)',
                  border: `2px solid ${isSelected ? 'var(--qhr-color-primary-500)' : 'var(--qhr-border-subtle)'}`,
                  background: isSelected ? 'var(--qhr-color-primary-50)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'start',
                  width: '100%',
                  fontSize: 'var(--qhr-text-sm)',
                  transition: 'all var(--qhr-transition-fast)',
                  color: 'var(--qhr-color-neutral-800)',
                }}
              >
                {choice.shortcut && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--qhr-radius-sm)',
                      background: isSelected ? 'var(--qhr-color-primary-500)' : 'var(--qhr-color-neutral-100)',
                      color: isSelected ? '#fff' : 'var(--qhr-color-neutral-600)',
                      fontSize: 'var(--qhr-text-xs)',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {choice.shortcut}
                  </span>
                )}
                <span>{choice.label}</span>
                {isSelected && (
                  <Icon name="check" size={16} style={{ marginInlineStart: 'auto', color: 'var(--qhr-color-primary-600)' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role="alert"
            style={{
              marginBlockStart: 'var(--qhr-space-4)',
              padding: 'var(--qhr-space-3)',
              borderRadius: 'var(--qhr-radius-md)',
              fontSize: 'var(--qhr-text-sm)',
              background:
                feedbackType === 'correct'
                  ? 'var(--qhr-color-success-50)'
                  : feedbackType === 'incorrect'
                    ? 'var(--qhr-color-danger-50)'
                    : 'var(--qhr-color-neutral-50)',
              color:
                feedbackType === 'correct'
                  ? 'var(--qhr-color-success-700)'
                  : feedbackType === 'incorrect'
                    ? 'var(--qhr-color-danger-700)'
                    : 'var(--qhr-color-neutral-700)',
            }}
          >
            {feedback}
          </div>
        )}
      </Card>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--qhr-space-3)',
        }}
      >
        <Button variant="ghost" size="md" onClick={onPrev} disabled={currentStep <= 1}>
          <Icon name="chevron-right" size={16} />
          <span>السابق</span>
        </Button>

        <div style={{ display: 'flex', gap: 'var(--qhr-space-2)' }}>
          {onSkip && (
            <Button variant="ghost" size="md" onClick={onSkip}>
              تخطي
            </Button>
          )}
          <Button variant="primary" size="md" onClick={onNext} disabled={!selectedId}>
            <span>{currentStep >= totalSteps ? 'إنهاء' : 'التالي'}</span>
            <Icon name="chevron-left" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

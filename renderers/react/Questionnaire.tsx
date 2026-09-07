import React from 'react';
import { Progress } from './Progress';

export interface QuestionnaireProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  totalQuestions: number;
  children: React.ReactNode;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentIndex = 0,
  totalQuestions,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`qhr-questionnaire ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface QuestionnaireProgressProps {
  current: number;
  total: number;
  label?: string;
  tone?: 'primary' | 'luxury' | 'info' | 'success';
}

export const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
  current,
  total,
  label,
  tone = 'luxury',
}) => {
  const pct = Math.round((current / total) * 100);
  const displayLabel = label || `السؤال ${current} من ${total}`;

  return (
    <div className="qhr-progress-wrapper" style={{ marginBlockEnd: '20px' }}>
      <div className="qhr-progress-header">
        <span className="qhr-progress-title">{displayLabel}</span>
        <span className="qhr-progress-val">{pct}%</span>
      </div>
      <Progress value={pct} tone={tone} size="sm" />
    </div>
  );
};

export interface QuestionnaireItemProps extends React.HTMLAttributes<HTMLDivElement> {
  category?: string;
  points?: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const QuestionnaireItem: React.FC<QuestionnaireItemProps> = ({
  category,
  points,
  title,
  description,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`qhr-questionnaire-card ${className}`} {...props}>
      {(category || points !== undefined) && (
        <div className="qhr-questionnaire-header">
          {category && <span className="qhr-questionnaire-category">{category}</span>}
          {points !== undefined && (
            <span className="qhr-questionnaire-points">{points} درجات</span>
          )}
        </div>
      )}
      <h2 className="qhr-questionnaire-title">{title}</h2>
      {description && <p className="qhr-questionnaire-desc">{description}</p>}
      <div className="qhr-questionnaire-choices">{children}</div>
    </div>
  );
};

export interface QuestionnaireChoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcut?: string;
  selected?: boolean;
  correct?: boolean;
  wrong?: boolean;
  children: React.ReactNode;
}

export const QuestionnaireChoice: React.FC<QuestionnaireChoiceProps> = ({
  shortcut,
  selected = false,
  correct = false,
  wrong = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'qhr-questionnaire-choice',
    selected ? 'is-selected' : '',
    correct ? 'is-correct' : '',
    wrong ? 'is-wrong' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="checkbox" aria-checked={selected} tabIndex={0} {...props}>
      {shortcut && <span className="qhr-questionnaire-choice-badge">{shortcut}</span>}
      <span className="qhr-questionnaire-choice-text">{children}</span>
      <span className="qhr-questionnaire-choice-indicator">
        <span className="qhr-questionnaire-choice-dot" />
      </span>
    </div>
  );
};

export const QuestionnaireActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`qhr-questionnaire-actions ${className}`} {...props}>
      {children}
    </div>
  );
};

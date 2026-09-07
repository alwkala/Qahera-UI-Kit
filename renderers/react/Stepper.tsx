import React from 'react';

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepItem[];
  currentStep: number; // 0-indexed
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className = '',
  ...props
}) => {
  return (
    <ol className={`qhr-stepper ${className}`} {...props}>
      {steps.map((step, idx) => {
        const isCurrent = idx === currentStep;
        const isCompleted = idx < currentStep;

        const itemClasses = [
          'qhr-step-item',
          isCurrent ? 'is-current' : '',
          isCompleted ? 'is-completed' : '',
        ].filter(Boolean).join(' ');

        return (
          <li key={idx} className={itemClasses} aria-current={isCurrent ? 'step' : undefined}>
            <div className="qhr-step-indicator">
              {isCompleted ? '✓' : idx + 1}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="qhr-step-label">{step.label}</span>
              {step.description && (
                <span style={{ fontSize: '11px', color: 'var(--qhr-text-muted, #94a3b8)' }}>
                  {step.description}
                </span>
              )}
            </div>
            {idx < steps.length - 1 && <div className="qhr-step-line" />}
          </li>
        );
      })}
    </ol>
  );
};

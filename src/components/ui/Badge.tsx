import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'manual_table'
  | 'manual_method_example'
  | 'configurable'
  | 'upload_required'
  | 'external_required';

const BADGE_CONFIG: Record<BadgeVariant, { label: string; className: string }> = {
  manual_table: { label: '문서 표 명시', className: styles.variantManualTable },
  manual_method_example: { label: '방법 예시 기준', className: styles.variantManualMethodExample },
  configurable: { label: '운영 협의 필요', className: styles.variantConfigurable },
  upload_required: { label: '사전 계산 업로드', className: styles.variantUploadRequired },
  external_required: { label: '외부 평가기 필요', className: styles.variantExternalRequired },
};

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, className }) => {
  const config = BADGE_CONFIG[variant];
  return (
    <span className={`${styles.badge} ${config.className} ${className ?? ''}`}>
      {config.label}
    </span>
  );
};

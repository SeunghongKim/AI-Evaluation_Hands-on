import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, BadgeVariant } from './Badge';
import { FormulaPanel } from './FormulaPanel';
import styles from './MetricPageLayout.module.css';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface MetricPageLayoutProps {
  title: string;
  sectionId: string;
  breadcrumbs: BreadcrumbItem[];
  what: string;
  why: string;
  how: string;
  passRule: string;
  passRuleSource: BadgeVariant;
  formula?: string;
  formulaExplanation?: string;
  documentRef?: string;
  children: React.ReactNode;
  warning?: string;
}

export const MetricPageLayout: React.FC<MetricPageLayoutProps> = ({
  title,
  sectionId,
  breadcrumbs,
  what,
  why,
  how,
  passRule,
  passRuleSource,
  formula,
  formulaExplanation,
  documentRef,
  children,
  warning,
}) => {
  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
            {b.to ? (
              <Link to={b.to} className={styles.breadcrumbLink}>{b.label}</Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{b.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Title */}
      <div className={styles.titleRow}>
        <div>
          <span className={styles.sectionId}>{sectionId}</span>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <Badge variant={passRuleSource} />
      </div>

      {/* Info sections */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>무엇을 측정하나요?</div>
          <p className={styles.infoText}>{what}</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>왜 중요한가요?</div>
          <p className={styles.infoText}>{why}</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>어떻게 계산하나요?</div>
          <p className={styles.infoText}>{how}</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>통과 기준</div>
          <p className={`${styles.infoText} ${styles.passRule}`}>{passRule}</p>
          <Badge variant={passRuleSource} className={styles.passSourceBadge} />
        </div>
      </div>

      {/* Warning */}
      {warning && (
        <div className={styles.warning}>
          <span className={styles.warningIcon}>⚠</span>
          <p>{warning}</p>
        </div>
      )}

      {/* Formula */}
      {formula && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>수식</h2>
          <FormulaPanel formula={formula} explanation={formulaExplanation} />
        </div>
      )}

      {/* Main content (input + results) */}
      <div className={styles.section}>
        {children}
      </div>

      {/* Document reference */}
      {documentRef && (
        <div className={styles.docRef}>
          <span className={styles.docRefLabel}>문서 참조</span>
          <span className={styles.docRefText}>{documentRef}</span>
        </div>
      )}
    </div>
  );
};

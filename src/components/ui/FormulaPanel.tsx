import React, { useState } from 'react';
import styles from './FormulaPanel.module.css';

interface FormulaPanelProps {
  formula: string;
  explanation?: string;
  defaultOpen?: boolean;
}

export const FormulaPanel: React.FC<FormulaPanelProps> = ({
  formula,
  explanation,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.panel}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.toggleIcon}>{open ? '▼' : '▶'}</span>
        <span className={styles.toggleLabel}>수식 보기</span>
        {!open && <span className={styles.formulaPreview}>{formula.slice(0, 60)}{formula.length > 60 ? '…' : ''}</span>}
      </button>
      {open && (
        <div className={styles.body}>
          <div className={styles.formulaBox}>
            <code className={styles.formula}>{formula}</code>
          </div>
          {explanation && (
            <p className={styles.explanation}>{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

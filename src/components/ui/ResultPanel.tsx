import React from 'react';
import { PassFailChip } from './PassFailChip';
import styles from './ResultPanel.module.css';

interface ResultPanelProps {
  label: string;
  value: number | string;
  threshold?: string;
  pass?: boolean | null;
  interpretation?: string;
  unit?: string;
  higherIsBetter?: boolean;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  label,
  value,
  threshold,
  pass,
  interpretation,
  unit = '',
  higherIsBetter = true,
}) => {
  const numVal = typeof value === 'number' ? value : parseFloat(value as string);
  const displayValue = typeof value === 'number' ? value.toFixed(4) : value;

  return (
    <div className={`${styles.panel} ${pass === true ? styles.passBorder : pass === false ? styles.failBorder : ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {pass !== undefined && pass !== null && <PassFailChip pass={pass} />}
        {pass === null && <PassFailChip pass={null} />}
      </div>
      <div className={styles.value}>
        {displayValue}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {threshold && (
        <div className={styles.threshold}>
          기준: {threshold}
          {higherIsBetter !== undefined && (
            <span className={styles.direction}>{higherIsBetter ? ' (높을수록 좋음)' : ' (낮을수록 좋음)'}</span>
          )}
        </div>
      )}
      {interpretation && (
        <p className={styles.interpretation}>{interpretation}</p>
      )}
      {typeof numVal === 'number' && !isNaN(numVal) && (
        <div className={styles.barWrap}>
          <div
            className={`${styles.bar} ${pass === true ? styles.barPass : pass === false ? styles.barFail : styles.barNeutral}`}
            style={{ width: `${Math.min(Math.abs(numVal) * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

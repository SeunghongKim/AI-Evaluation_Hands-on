import React from 'react';
import styles from './PassFailChip.module.css';

interface PassFailChipProps {
  pass: boolean | null;
  className?: string;
}

export const PassFailChip: React.FC<PassFailChipProps> = ({ pass, className }) => {
  if (pass === null) {
    return (
      <span className={`${styles.chip} ${styles.null} ${className ?? ''}`}>
        <span className={styles.icon}>—</span>
        <span className={styles.text}>미평가</span>
      </span>
    );
  }
  return pass ? (
    <span className={`${styles.chip} ${styles.pass} ${className ?? ''}`}>
      <span className={styles.icon}>✓</span>
      <span className={styles.text}>통과</span>
    </span>
  ) : (
    <span className={`${styles.chip} ${styles.fail} ${className ?? ''}`}>
      <span className={styles.icon}>✗</span>
      <span className={styles.text}>미달</span>
    </span>
  );
};

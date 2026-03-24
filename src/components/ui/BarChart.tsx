import React from 'react';
import styles from './BarChart.module.css';

interface BarDatum {
  label: string;
  value: number;
  color?: string;
  threshold?: number;
}

interface BarChartProps {
  data: BarDatum[];
  maxValue?: number;
  title?: string;
  thresholdLabel?: string;
  higherIsBetter?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  title,
  thresholdLabel,
  higherIsBetter = true,
}) => {
  const max = maxValue ?? Math.max(...data.map(d => d.value), 0.01);
  const threshold = data[0]?.threshold;

  return (
    <div className={styles.chart}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.bars}>
        {data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 100 : 0;
          const thresholdPct = threshold != null ? (threshold / max) * 100 : null;
          const isGood = threshold != null
            ? (higherIsBetter ? d.value >= threshold : d.value <= threshold)
            : undefined;
          return (
            <div key={i} className={styles.barRow}>
              <div className={styles.barLabel} title={d.label}>{d.label}</div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.bar} ${isGood === true ? styles.barGood : isGood === false ? styles.barBad : styles.barNeutral}`}
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: d.color,
                  }}
                />
                {thresholdPct != null && (
                  <div
                    className={styles.thresholdLine}
                    style={{ left: `${Math.min(thresholdPct, 100)}%` }}
                    title={thresholdLabel ?? `기준: ${threshold}`}
                  />
                )}
              </div>
              <div className={styles.barValue}>{d.value.toFixed(4)}</div>
            </div>
          );
        })}
      </div>
      {threshold != null && thresholdLabel && (
        <div className={styles.legend}>
          <span className={styles.thresholdLegend}>|</span>
          {thresholdLabel}
        </div>
      )}
    </div>
  );
};

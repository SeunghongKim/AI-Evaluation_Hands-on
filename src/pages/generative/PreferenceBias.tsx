import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { BarChart } from '../../components/ui/BarChart';
import { calcKLDivergence } from '../../lib/metrics/klDivergence';
import { klDivergenceExample, klDivergenceUniformExample, klDivergenceSkewedExample } from '../../data/examples/klDivergence';
import styles from './PreferenceBias.module.css';

type ClusterEntry = { label: string; proportion: number };

const toCluster = (e: typeof klDivergenceExample): ClusterEntry[] =>
  e.clusters.map(c => ({ label: c.label, proportion: c.proportion }));

const DEFAULT_CLUSTERS = toCluster(klDivergenceExample);

export const PreferenceBias: React.FC = () => {
  const [clusters, setClusters] = useState<ClusterEntry[]>(DEFAULT_CLUSTERS);

  const result = calcKLDivergence(clusters);

  const addCluster = () => setClusters(prev => [...prev, { label: `클러스터 ${prev.length + 1}`, proportion: 0.1 }]);
  const removeCluster = (i: number) => setClusters(prev => prev.filter((_, idx) => idx !== i));
  const updateCluster = (i: number, field: keyof ClusterEntry, val: string) => {
    setClusters(prev => prev.map((c, idx) =>
      idx !== i ? c : { ...c, [field]: field === 'label' ? val : parseFloat(val) || 0 }
    ));
  };

  const totalProportion = clusters.reduce((s, c) => s + c.proportion, 0);
  const barData = result.clusters.map(c => ({
    label: c.label,
    value: c.kl,
    threshold: result.threshold,
  }));

  return (
    <MetricPageLayout
      title="선호 편향 (Preference Bias)"
      sectionId="LLM-D-03"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '생성형 AI', to: '/generative' },
        { label: '선호 편향' },
      ]}
      what="LLM 학습 데이터에서 특정 선호/관점/감성이 과도하게 반영되는지 KL Divergence로 측정합니다."
      why="특정 감성이나 관점이 편향되면 LLM이 편향된 텍스트를 생성하게 됩니다."
      how="데이터를 클러스터(감성, 주제 등)별로 분류하여 비율을 계산합니다. 이상적인 균일 분포와의 KL Divergence를 구하여 기준 미만이면 통과입니다."
      passRule="KL Divergence < 0.2"
      passRuleSource="manual_table"
      formula="KL(P || Q) = Σᵢ P(i) × ln(P(i) / Q(i))

여기서:
  P(i) = 실제 클러스터 i의 비율
  Q(i) = 이상적 균일 분포 = 1/k (k: 클러스터 수)"
      formulaExplanation="KL Divergence가 0이면 완전 균일 분포, 값이 클수록 특정 클러스터에 편향됩니다."
      documentRef="AI 평가검증 가이드 v1.0 표 2.3.6 (LLM-D-03)"
    >
      <div className={styles.inputSection}>
        <div className={styles.topBar}>
          <span className={styles.hint}>클러스터별 비율을 입력하세요 (합계: {totalProportion.toFixed(3)})</span>
          <div className={styles.actions}>
            <button className={styles.exBtn} onClick={() => setClusters(toCluster(klDivergenceUniformExample))} type="button">
              균일 예시 (통과)
            </button>
            <button className={styles.exBtn} onClick={() => setClusters(toCluster(klDivergenceSkewedExample))} type="button">
              편향 예시 (실패)
            </button>
            <button className={styles.addBtn} onClick={addCluster} type="button">+ 클러스터</button>
          </div>
        </div>

        {Math.abs(totalProportion - 1) > 0.01 && (
          <div className={styles.warning}>
            비율 합계가 1.0이 아닙니다 (현재: {totalProportion.toFixed(3)}). 합계를 1.0으로 맞춰주세요.
          </div>
        )}

        <table className={styles.inputTable}>
          <thead>
            <tr>
              <th>클러스터</th>
              <th>비율 (proportion)</th>
              <th>이상 비율 (1/k)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clusters.map((c, i) => (
              <tr key={i}>
                <td>
                  <input className={styles.inputField} value={c.label} onChange={e => updateCluster(i, 'label', e.target.value)} />
                </td>
                <td>
                  <input
                    className={styles.inputField}
                    type="number" min="0" max="1" step="0.01"
                    value={c.proportion}
                    onChange={e => updateCluster(i, 'proportion', e.target.value)}
                  />
                </td>
                <td className={styles.idealCell}>{(1 / clusters.length).toFixed(4)}</td>
                <td>
                  <button className={styles.removeBtn} onClick={() => removeCluster(i)} type="button">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.metricsRow}>
          <ResultPanel
            label="KL Divergence 합계"
            value={result.total}
            threshold="< 0.2"
            pass={result.pass}
            higherIsBetter={false}
          />
        </div>
        <BarChart
          data={barData}
          title="클러스터별 KL 기여값"
          thresholdLabel="기준: 0.2"
          higherIsBetter={false}
        />
      </div>
    </MetricPageLayout>
  );
};

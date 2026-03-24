import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { calcFairness, FairnessMetric, GroupCM } from '../../lib/metrics/fairness';
import { fairnessGenderExample } from '../../data/examples/fairness';
import styles from './Fairness.module.css';

const METRIC_OPTIONS: { value: FairnessMetric; label: string; desc: string }[] = [
  { value: 'FPR', label: 'FPR (위양성률)', desc: 'FP / (FP+TN) — 음성을 양성으로 잘못 예측할 확률' },
  { value: 'FNR', label: 'FNR (위음성률)', desc: 'FN / (TP+FN) — 양성을 음성으로 잘못 예측할 확률' },
  { value: 'FDR', label: 'FDR (위발견율)', desc: 'FP / (TP+FP) — 양성 예측 중 실제 음성 비율' },
  { value: 'FOR', label: 'FOR (위무발견율)', desc: 'FN / (TN+FN) — 음성 예측 중 실제 양성 비율' },
  { value: 'PPV', label: 'PPV (양성예측도)', desc: 'TP / (TP+FP) — 양성 예측 정확도 (Precision)' },
  { value: 'NPV', label: 'NPV (음성예측도)', desc: 'TN / (TN+FN) — 음성 예측 정확도' },
];

const DEFAULT_GROUPS: GroupCM[] = [
  { groupName: '그룹 A', tp: 80, fp: 10, fn: 10, tn: 100 },
  { groupName: '그룹 B', tp: 75, fp: 15, fn: 15, tn: 95 },
];

export const Fairness: React.FC = () => {
  const [metric, setMetric] = useState<FairnessMetric>('PPV');
  const [groups, setGroups] = useState<GroupCM[]>(DEFAULT_GROUPS);

  const result = calcFairness(groups, metric);
  const selectedMetricInfo = METRIC_OPTIONS.find(m => m.value === metric)!;

  const addGroup = () => {
    setGroups(prev => [...prev, { groupName: `그룹 ${prev.length + 1}`, tp: 50, fp: 10, fn: 10, tn: 50 }]);
  };

  const removeGroup = (i: number) => setGroups(prev => prev.filter((_, idx) => idx !== i));

  const updateGroup = (i: number, field: keyof GroupCM, val: string) => {
    setGroups(prev => prev.map((g, idx) =>
      idx !== i ? g : { ...g, [field]: field === 'groupName' ? val : parseInt(val) || 0 }
    ));
  };

  return (
    <MetricPageLayout
      title="모델 공정성"
      sectionId="ML-M-02"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '모델 공정성' },
      ]}
      what="AI 모델의 출력 결과가 보호변수 그룹에 미치는 영향을 혼동행렬로 측정합니다. Fairness Tree를 활용하여 서비스 특성에 맞는 공정성 지표를 선택합니다."
      why="모델이 성별, 연령 등 보호변수 그룹에 따라 다른 오류 패턴을 보인다면 특정 집단이 불이익을 받을 수 있습니다."
      how="보호변수를 기준으로 그룹별 혼동행렬을 구성합니다. 선택한 공정성 지표를 그룹별로 계산하여 최저/최고 비율(4/5 Rule)이 0.8 이상이면 통과입니다."
      passRule="선택 지표의 최저/최고 비중 ≥ 0.8 (4/5 Rule)"
      passRuleSource="manual_table"
      formula="4/5 Rule: min(그룹별 지표값) / max(그룹별 지표값) ≥ 0.8

예시 (PPV):
  PPV_그룹A = TP_A / (TP_A + FP_A)
  PPV_그룹B = TP_B / (TP_B + FP_B)
  비율 = min(PPV_A, PPV_B) / max(PPV_A, PPV_B)"
      formulaExplanation="Fairness Tree에서 서비스 맥락(오류 비용, 의사결정 방향)을 고려해 적절한 지표를 선택합니다."
      documentRef="AI 평가검증 가이드 v1.0 표 2.2.13"
    >
      {/* Fairness Tree guide */}
      <div className={styles.fairnessTree}>
        <h4 className={styles.treeTitle}>공정성 지표 선택 가이드 (Fairness Tree)</h4>
        <div className={styles.treeGrid}>
          {METRIC_OPTIONS.map(m => (
            <button
              key={m.value}
              className={`${styles.metricBtn} ${metric === m.value ? styles.metricBtnActive : ''}`}
              onClick={() => setMetric(m.value)}
              type="button"
            >
              <span className={styles.metricBtnCode}>{m.value}</span>
              <span className={styles.metricBtnLabel}>{m.label.split('(')[1]?.replace(')', '') || m.label}</span>
              <span className={styles.metricBtnDesc}>{m.desc}</span>
            </button>
          ))}
        </div>
        <p className={styles.selectedInfo}>
          선택된 지표: <strong>{selectedMetricInfo.label}</strong> — {selectedMetricInfo.desc}
        </p>
      </div>

      {/* Groups input */}
      <div className={styles.inputSection}>
        <div className={styles.inputHeader}>
          <span className={styles.inputTitle}>그룹별 혼동행렬 입력</span>
          <div className={styles.inputActions}>
            <button
              className={styles.exBtn}
              onClick={() => setGroups(fairnessGenderExample)}
              type="button"
            >
              성별 예시 데이터
            </button>
            <button className={styles.addBtn} onClick={addGroup} type="button">
              + 그룹 추가
            </button>
          </div>
        </div>
        <div className={styles.groupsGrid}>
          {groups.map((g, i) => (
            <div key={i} className={styles.groupCard}>
              <div className={styles.groupCardHeader}>
                <input
                  className={styles.groupNameInput}
                  value={g.groupName}
                  onChange={e => updateGroup(i, 'groupName', e.target.value)}
                />
                <button className={styles.removeBtn} onClick={() => removeGroup(i)} type="button">✕</button>
              </div>
              <div className={styles.cmMini}>
                {(['tp', 'fp', 'fn', 'tn'] as const).map(field => (
                  <div key={field} className={styles.cmMiniCell}>
                    <label className={styles.cmMiniLabel}>{field.toUpperCase()}</label>
                    <input
                      className={styles.cmMiniInput}
                      type="number" min="0"
                      value={g[field]}
                      onChange={e => updateGroup(i, field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        <div className={styles.overallResult}>
          <span className={styles.overallLabel}>전체 판정 ({metric})</span>
          <PassFailChip pass={result.pass} />
          <span className={styles.ratioDisplay}>
            비율: {result.ratio.toFixed(4)} (min: {result.minVal.toFixed(4)}, max: {result.maxVal.toFixed(4)})
          </span>
        </div>
        <div className={styles.groupMetrics}>
          {result.groups.map((g, i) => (
            <ResultPanel
              key={i}
              label={`${g.name} (${metric})`}
              value={g.value}
              threshold={`4/5 Rule (비율 ≥ 0.8)`}
              pass={undefined}
            />
          ))}
        </div>
      </div>
    </MetricPageLayout>
  );
};

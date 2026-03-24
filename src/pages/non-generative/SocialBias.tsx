import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { BarChart } from '../../components/ui/BarChart';
import { calcPSI, PSIBin } from '../../lib/metrics/psi';
import styles from './SocialBias.module.css';

const PSI_SOCIAL_THRESHOLD = 0.2;

const DEFAULT_BINS: PSIBin[] = [
  { label: '20대', expected: 0.20, actual: 0.22 },
  { label: '30대', expected: 0.25, actual: 0.27 },
  { label: '40대', expected: 0.28, actual: 0.26 },
  { label: '50대', expected: 0.18, actual: 0.16 },
  { label: '60대 이상', expected: 0.09, actual: 0.09 },
];

const EXAMPLE_BINS: PSIBin[] = [
  { label: '20대', expected: 0.35, actual: 0.12 },
  { label: '30대', expected: 0.30, actual: 0.18 },
  { label: '40대', expected: 0.20, actual: 0.45 },
  { label: '50대', expected: 0.10, actual: 0.17 },
  { label: '60대 이상', expected: 0.05, actual: 0.08 },
];

export const SocialBias: React.FC = () => {
  const [bins, setBins] = useState<PSIBin[]>(DEFAULT_BINS);
  const [groupALabel, setGroupALabel] = useState('남성');
  const [groupBLabel, setGroupBLabel] = useState('여성');
  const [attribute, setAttribute] = useState('연령대');

  const result = calcPSI(bins);
  const pass = result.total < PSI_SOCIAL_THRESHOLD;

  const addBin = () => {
    setBins(prev => [...prev, { label: `구간 ${prev.length + 1}`, expected: 0.1, actual: 0.1 }]);
  };

  const removeBin = (i: number) => setBins(prev => prev.filter((_, idx) => idx !== i));

  const updateBin = (i: number, field: keyof PSIBin, value: string) => {
    setBins(prev => prev.map((b, idx) =>
      idx === i ? { ...b, [field]: field === 'label' ? value : parseFloat(value) || 0 } : b
    ));
  };

  const barData = result.bins.map(b => ({
    label: b.label,
    value: b.psi,
    threshold: PSI_SOCIAL_THRESHOLD,
  }));

  return (
    <MetricPageLayout
      title="사회적 편향"
      sectionId="ML-D-03"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '사회적 편향' },
      ]}
      what="보호변수를 기준으로 그룹화했을 때 그룹 간 속성 분포에 통계적 차이가 있는지 측정합니다. 표본 편향(원천↔학습 비교)과 달리 보호변수 그룹 간(예: 남성↔여성) 비교입니다."
      why="특정 보호변수 그룹(성별, 연령 등)이 다른 속성 분포를 보인다면 모델이 그룹에 따라 다른 예측을 할 수 있어 공정성 문제가 발생합니다."
      how="보호변수를 기준으로 두 그룹을 나눈 뒤, 측정 대상 속성(예: 연령대)의 구성비를 각 그룹별로 계산합니다. 그룹 A의 분포를 Expected, 그룹 B의 분포를 Actual로 놓고 PSI를 계산합니다."
      passRule="PSI < 0.2"
      passRuleSource="manual_method_example"
      formula="PSI(그룹A vs 그룹B) = Σᵢ (B_i - A_i) × ln(B_i / A_i)

여기서:
  A_i = 그룹A의 i번째 속성 구간 비율 (Expected)
  B_i = 그룹B의 i번째 속성 구간 비율 (Actual)"
      formulaExplanation="표본 편향(ML-D-01)과 동일한 PSI 공식을 사용하나, Expected/Actual이 원천/학습 데이터가 아니라 그룹A/그룹B입니다."
      documentRef="AI 평가검증 가이드 v1.0 p.192 (방법 설명 예시)"
      warning="이 기준(PSI < 0.2)은 문서 본문 예시에서 언급된 값으로, 표 형태로 공식 명시된 기준이 아닙니다. 표 2.2.3의 표본 편향 기준(0.25)과 다름에 주의하십시오. 실제 평가 시 조직 내 협의를 통해 기준을 확정하십시오."
    >
      <div className={styles.inputSection}>
        <div className={styles.configRow}>
          <div className={styles.configItem}>
            <label className={styles.configLabel}>보호변수 그룹 A (Expected)</label>
            <input
              className={styles.configInput}
              value={groupALabel}
              onChange={e => setGroupALabel(e.target.value)}
            />
          </div>
          <div className={styles.configItem}>
            <label className={styles.configLabel}>보호변수 그룹 B (Actual)</label>
            <input
              className={styles.configInput}
              value={groupBLabel}
              onChange={e => setGroupBLabel(e.target.value)}
            />
          </div>
          <div className={styles.configItem}>
            <label className={styles.configLabel}>측정 대상 속성</label>
            <input
              className={styles.configInput}
              value={attribute}
              onChange={e => setAttribute(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.exampleRow}>
          <button className={styles.exBtn} onClick={() => setBins(DEFAULT_BINS)} type="button">
            기본 예시 (통과)
          </button>
          <button className={styles.exBtn} onClick={() => setBins(EXAMPLE_BINS)} type="button">
            편향 예시 (실패)
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>{attribute} 구간</th>
                <th>{groupALabel} 비율 (Expected)</th>
                <th>{groupBLabel} 비율 (Actual)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bins.map((b, i) => (
                <tr key={i}>
                  <td>
                    <input
                      className={styles.inputField}
                      value={b.label}
                      onChange={e => updateBin(i, 'label', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.inputField}
                      type="number"
                      step="0.001"
                      value={b.expected}
                      onChange={e => updateBin(i, 'expected', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.inputField}
                      type="number"
                      step="0.001"
                      value={b.actual}
                      onChange={e => updateBin(i, 'actual', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className={styles.removeBtn} onClick={() => removeBin(i)} type="button">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addBtn} onClick={addBin} type="button">+ 구간 추가</button>
        </div>
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.totalResult}>
          <span className={styles.totalLabel}>PSI 합계</span>
          <span className={styles.totalValue}>{result.total.toFixed(4)}</span>
          <PassFailChip pass={pass} />
          <span className={styles.totalThreshold}>기준: PSI &lt; {PSI_SOCIAL_THRESHOLD}</span>
        </div>

        <BarChart
          data={barData}
          title={`${attribute} 구간별 PSI (${groupALabel} vs ${groupBLabel})`}
          thresholdLabel={`기준: ${PSI_SOCIAL_THRESHOLD}`}
          higherIsBetter={false}
        />
      </div>
    </MetricPageLayout>
  );
};

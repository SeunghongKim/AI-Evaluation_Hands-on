import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { BarChart } from '../../components/ui/BarChart';
import { calcPSI, PSIBin } from '../../lib/metrics/psi';
import { allSampleBiasExamples } from '../../data/examples/sampleBias';
import styles from './SampleBias.module.css';

const DEFAULT_BINS: PSIBin[] = [
  { label: '그룹 A', expected: 0.5, actual: 0.5 },
  { label: '그룹 B', expected: 0.5, actual: 0.5 },
];

export const SampleBias: React.FC = () => {
  const [bins, setBins] = useState<PSIBin[]>(DEFAULT_BINS);
  const [datasetLabel, setDatasetLabel] = useState('학습 데이터');
  const [exampleIdx, setExampleIdx] = useState<number | null>(null);

  const result = calcPSI(bins);

  const addBin = () => {
    setBins(prev => [...prev, { label: `그룹 ${prev.length + 1}`, expected: 0.1, actual: 0.1 }]);
  };

  const removeBin = (i: number) => {
    setBins(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateBin = (i: number, field: keyof PSIBin, value: string) => {
    setBins(prev => prev.map((b, idx) =>
      idx === i
        ? { ...b, [field]: field === 'label' ? value : parseFloat(value) || 0 }
        : b
    ));
  };

  const loadExample = (idx: number) => {
    setExampleIdx(idx);
    const ex = allSampleBiasExamples[idx];
    setBins(ex.bins);
    setDatasetLabel(ex.label);
  };

  const barData = result.bins.map(b => ({
    label: b.label,
    value: b.psi,
    threshold: result.threshold,
  }));

  return (
    <MetricPageLayout
      title="표본 편향 (PSI)"
      sectionId="ML-D-01"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '표본 편향' },
      ]}
      what="학습/검증/시험 데이터가 원천데이터(모집단)를 통계적으로 잘 대표하는지 보호변수 기준으로 측정합니다."
      why="데이터 분포가 원천데이터와 크게 다르면 모델이 실제 환경에서 제대로 작동하지 않을 수 있습니다. 특히 성별, 연령, 학력 등 보호변수 기준의 편향은 공정성 문제를 유발합니다."
      how="보호변수를 기준으로 그룹화한 뒤, 각 그룹의 원천데이터 비율(Expected)과 학습/검증/시험 데이터 비율(Actual)을 비교하여 PSI를 계산합니다. 모든 그룹의 PSI 합이 기준치 미만이면 통과입니다."
      passRule="PSI 합계 < 0.25"
      passRuleSource="manual_table"
      formula="PSI = Σᵢ (Aᵢ - Eᵢ) × ln(Aᵢ / Eᵢ)

여기서:
  Aᵢ = i번째 그룹의 평가 대상 데이터(학습/검증/시험) 비율
  Eᵢ = i번째 그룹의 원천데이터(모집단) 비율
  ln  = 자연로그"
      formulaExplanation="PSI < 0.10: 분포 변화 없음 (우수) | 0.10~0.25: 소폭 변화 (주의) | PSI ≥ 0.25: 큰 변화 (편향 존재)"
      documentRef="AI 평가검증 가이드 v1.0 표 2.2.3 (p.191)"
    >
      {/* Dataset type selector */}
      <div className={styles.inputSection}>
        <div className={styles.row}>
          <label className={styles.inputLabel}>평가 대상 데이터셋</label>
          <select
            className={styles.select}
            value={datasetLabel}
            onChange={e => setDatasetLabel(e.target.value)}
          >
            <option>학습 데이터</option>
            <option>검증 데이터</option>
            <option>1차 시험 데이터</option>
            <option>2차 시험 데이터</option>
          </select>
        </div>

        <div className={styles.exampleRow}>
          <span className={styles.exampleLabel}>예시 데이터:</span>
          {allSampleBiasExamples.map((ex, i) => (
            <button
              key={i}
              className={`${styles.exBtn} ${exampleIdx === i ? styles.exBtnActive : ''}`}
              onClick={() => loadExample(i)}
              type="button"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Bins table */}
        <div className={styles.tableWrap}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>그룹 라벨</th>
                <th>원천데이터 비율 (Expected)</th>
                <th>{datasetLabel} 비율 (Actual)</th>
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
                      min="0"
                      max="1"
                      step="0.001"
                      value={b.expected}
                      onChange={e => updateBin(i, 'expected', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.inputField}
                      type="number"
                      min="0"
                      max="1"
                      step="0.001"
                      value={b.actual}
                      onChange={e => updateBin(i, 'actual', e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeBin(i)}
                      type="button"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addBtn} onClick={addBin} type="button">
            + 그룹 추가
          </button>
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        <h3 className={styles.resultsTitle}>계산 결과</h3>

        <div className={styles.totalResult}>
          <div className={styles.totalLabel}>PSI 합계</div>
          <div className={styles.totalValue}>{result.total.toFixed(4)}</div>
          <PassFailChip pass={result.pass} />
          <div className={styles.totalThreshold}>기준: PSI &lt; {result.threshold}</div>
        </div>

        <BarChart
          data={barData}
          title="그룹별 PSI 값"
          thresholdLabel={`기준: ${result.threshold}`}
          higherIsBetter={false}
        />

        {/* Bin details */}
        <div className={styles.binDetails}>
          <table className={styles.resultTable}>
            <thead>
              <tr>
                <th>그룹</th>
                <th>Expected (Eᵢ)</th>
                <th>Actual (Aᵢ)</th>
                <th>PSI 기여값</th>
                <th>판정</th>
              </tr>
            </thead>
            <tbody>
              {result.bins.map((b, i) => (
                <tr key={i}>
                  <td>{b.label}</td>
                  <td>{b.expected.toFixed(4)}</td>
                  <td>{b.actual.toFixed(4)}</td>
                  <td>{b.psi.toFixed(4)}</td>
                  <td>
                    <span className={b.psi < 0.025 ? styles.ok : styles.warn}>
                      {b.psi < 0.025 ? '양호' : b.psi < 0.1 ? '주의' : '위험'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.interpretation}>
          <h4>해석</h4>
          {result.pass ? (
            <p className={styles.passText}>
              PSI 합계({result.total.toFixed(4)})가 기준치 {result.threshold}보다 낮습니다.
              데이터 분포가 원천데이터를 잘 대표하며 표본 편향이 없는 것으로 판단됩니다.
            </p>
          ) : (
            <p className={styles.failText}>
              PSI 합계({result.total.toFixed(4)})가 기준치 {result.threshold}를 초과합니다.
              데이터 분포가 원천데이터와 유의미하게 다르며 표본 편향이 존재합니다.
              데이터 수집 방식을 검토하거나 재샘플링을 고려하십시오.
            </p>
          )}
        </div>
      </div>
    </MetricPageLayout>
  );
};

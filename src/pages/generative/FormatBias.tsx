import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { BarChart } from '../../components/ui/BarChart';
import { calcEntropy } from '../../lib/metrics/entropy';
import { formatEntropyExample } from '../../data/examples/entropy';
import styles from './EntropyPage.module.css';

const PRESET_FORMATS = ['JSON 구조', '대화형 (DIALOG)', '테이블 형식', 'MARKDOWN', '일반 텍스트', '코드 (Code)', '목록 (List)'];

type BinEntry = { label: string; count: number };

const DEFAULT_BINS: BinEntry[] = [
  { label: 'JSON 구조', count: 200 },
  { label: '대화형 (DIALOG)', count: 180 },
  { label: '테이블 형식', count: 120 },
  { label: 'MARKDOWN', count: 160 },
  { label: '일반 텍스트', count: 340 },
];

export const FormatBias: React.FC = () => {
  const [bins, setBins] = useState<BinEntry[]>(DEFAULT_BINS);

  const result = calcEntropy(bins);

  const loadExample = () => setBins(formatEntropyExample.bins);

  const addPreset = (label: string) => {
    if (!bins.find(b => b.label === label)) {
      setBins(prev => [...prev, { label, count: 100 }]);
    }
  };

  const addBin = () => setBins(prev => [...prev, { label: `형식 ${prev.length + 1}`, count: 100 }]);
  const removeBin = (i: number) => setBins(prev => prev.filter((_, idx) => idx !== i));
  const updateBin = (i: number, field: keyof BinEntry, val: string) => {
    setBins(prev => prev.map((b, idx) =>
      idx !== i ? b : { ...b, [field]: field === 'label' ? val : parseInt(val) || 0 }
    ));
  };

  const barData = result.bins.map(b => ({ label: b.label, value: b.proportion }));

  return (
    <MetricPageLayout
      title="형식 편향 (Format Bias)"
      sectionId="LLM-D-02"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '생성형 AI', to: '/generative' },
        { label: '형식 편향' },
      ]}
      what="LLM 학습 데이터에서 특정 텍스트 형식(JSON, 대화체, 테이블 등)이 과도하게 집중되는지 Shannon Entropy로 측정합니다."
      why="특정 형식이 과도하게 많으면 LLM이 해당 형식에 편향된 응답을 생성할 수 있습니다."
      how="형식별 데이터 수를 집계하여 Shannon Entropy를 계산하고 최대 엔트로피로 정규화합니다."
      passRule="정규화 Shannon Entropy ≥ 0.8"
      passRuleSource="manual_method_example"
      formula="H = -Σᵢ p(xᵢ) × log₂ p(xᵢ)
정규화 H = H / log₂(n)"
      documentRef="AI 평가검증 가이드 v1.0 p.339 방법 설명 예시 (LLM-D-02)"
      warning="이 기준(≥ 0.8)은 문서 방법 설명 예시에서 언급된 값입니다. 표 형태로 공식 명시된 기준이 아닙니다."
    >
      <div className={styles.inputSection}>
        <div className={styles.topBar}>
          <span className={styles.hint}>텍스트 형식별 데이터 수를 입력하세요.</span>
          <div className={styles.actions}>
            <button className={styles.exBtn} onClick={loadExample} type="button">예시 데이터</button>
            <button className={styles.addBtn} onClick={addBin} type="button">+ 형식 추가</button>
          </div>
        </div>

        <div className={styles.presetRow}>
          <span className={styles.presetLabel}>형식 프리셋:</span>
          {PRESET_FORMATS.map(f => (
            <button
              key={f}
              className={styles.presetBtn}
              onClick={() => addPreset(f)}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        <table className={styles.inputTable}>
          <thead>
            <tr>
              <th>형식 라벨</th>
              <th>데이터 수 (count)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bins.map((b, i) => (
              <tr key={i}>
                <td>
                  <input className={styles.inputField} value={b.label} onChange={e => updateBin(i, 'label', e.target.value)} />
                </td>
                <td>
                  <input className={styles.inputField} type="number" min="0" value={b.count} onChange={e => updateBin(i, 'count', e.target.value)} />
                </td>
                <td>
                  <button className={styles.removeBtn} onClick={() => removeBin(i)} type="button">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.metricsRow}>
          <ResultPanel label="정규화 엔트로피" value={result.normalized} threshold="≥ 0.8" pass={result.pass} />
          <ResultPanel label="Shannon Entropy (H)" value={result.entropy} threshold="참고값" pass={undefined} />
        </div>
        <BarChart data={barData} title="형식별 비율 분포" />
      </div>
    </MetricPageLayout>
  );
};

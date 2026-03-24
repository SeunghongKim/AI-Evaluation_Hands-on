import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { BarChart } from '../../components/ui/BarChart';
import { calcEntropy } from '../../lib/metrics/entropy';
import { representationEntropyExample } from '../../data/examples/entropy';
import styles from './EntropyPage.module.css';

type BinEntry = { label: string; count: number };

const DEFAULT_BINS: BinEntry[] = [
  { label: '남성 언급', count: 600 },
  { label: '여성 언급', count: 400 },
];

export const RepresentationBias: React.FC = () => {
  const [bins, setBins] = useState<BinEntry[]>(DEFAULT_BINS);

  const result = calcEntropy(bins);

  const loadExample = () => setBins(representationEntropyExample.bins);

  const addBin = () => setBins(prev => [...prev, { label: `속성 ${prev.length + 1}`, count: 100 }]);
  const removeBin = (i: number) => setBins(prev => prev.filter((_, idx) => idx !== i));
  const updateBin = (i: number, field: keyof BinEntry, val: string) => {
    setBins(prev => prev.map((b, idx) =>
      idx !== i ? b : { ...b, [field]: field === 'label' ? val : parseInt(val) || 0 }
    ));
  };

  const barData = result.bins.map(b => ({
    label: b.label,
    value: b.proportion,
  }));

  return (
    <MetricPageLayout
      title="표현 편향 (Representation Bias)"
      sectionId="LLM-D-01"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '생성형 AI', to: '/generative' },
        { label: '표현 편향' },
      ]}
      what="LLM 학습 데이터에서 특정 속성(성별, 집단, 직업 등)이 과소 또는 과대 표현되는지 Shannon Entropy로 측정합니다."
      why="특정 그룹이 데이터에서 과소 표현되면 LLM이 해당 그룹에 대해 부정확하거나 편향된 출력을 생성할 수 있습니다."
      how="속성별 등장 빈도를 집계하여 Shannon Entropy를 계산합니다. 최대 엔트로피(완전 균일 분포)로 정규화하여 0~1 사이 값을 얻습니다."
      passRule="정규화 Shannon Entropy ≥ 0.8"
      passRuleSource="manual_method_example"
      formula="H = -Σᵢ p(xᵢ) × log₂ p(xᵢ)
정규화 H = H / H_max = H / log₂(n)

여기서:
  p(xᵢ) = i번째 속성의 비율
  n     = 속성 카테고리 수"
      formulaExplanation="정규화 엔트로피가 1.0이면 완전 균일 분포, 0에 가까울수록 특정 속성에 집중됩니다."
      documentRef="AI 평가검증 가이드 v1.0 p.320 방법 설명 예시 (LLM-D-01)"
      warning="이 기준(≥ 0.8)은 문서 방법 설명 예시에서 언급된 값입니다. 표 형태로 공식 명시된 기준이 아니므로 실제 평가 시 조직 내 협의를 통해 확정하십시오."
    >
      <div className={styles.inputSection}>
        <div className={styles.topBar}>
          <span className={styles.hint}>속성 카테고리별 등장 빈도(count)를 입력하세요.</span>
          <div className={styles.actions}>
            <button className={styles.exBtn} onClick={loadExample} type="button">예시 데이터</button>
            <button className={styles.addBtn} onClick={addBin} type="button">+ 속성 추가</button>
          </div>
        </div>
        <table className={styles.inputTable}>
          <thead>
            <tr>
              <th>속성 라벨</th>
              <th>등장 빈도 (count)</th>
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
                    type="number" min="0"
                    value={b.count}
                    onChange={e => updateBin(i, 'count', e.target.value)}
                  />
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
          <ResultPanel
            label="정규화 엔트로피"
            value={result.normalized}
            threshold="≥ 0.8"
            pass={result.pass}
            interpretation={`Shannon Entropy: ${result.entropy.toFixed(4)} / Max Entropy: ${Math.log2(bins.length).toFixed(4)}`}
          />
          <ResultPanel
            label="Shannon Entropy (H)"
            value={result.entropy}
            threshold="참고값"
            pass={undefined}
          />
        </div>
        <BarChart
          data={barData}
          title="속성별 비율 분포"
        />
      </div>
    </MetricPageLayout>
  );
};

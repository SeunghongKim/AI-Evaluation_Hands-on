import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { calcLabelingBias, LabelGroup } from '../../lib/metrics/labelingBias';
import { labelingBiasExample } from '../../data/examples/labelingBias';
import styles from './LabelingBias.module.css';

const DEFAULT_DATA: LabelGroup[] = [
  { label: '라벨 A', groups: [{ name: '그룹 1', count: 100 }, { name: '그룹 2', count: 90 }] },
  { label: '라벨 B', groups: [{ name: '그룹 1', count: 80 }, { name: '그룹 2', count: 75 }] },
];

export const LabelingBias: React.FC = () => {
  const [data, setData] = useState<LabelGroup[]>(DEFAULT_DATA);

  const result = calcLabelingBias(data);

  const loadExample = () => setData(labelingBiasExample);

  const addLabel = () => {
    const groupNames = data[0]?.groups.map(g => g.name) ?? ['그룹 1', '그룹 2'];
    setData(prev => [
      ...prev,
      { label: `라벨 ${prev.length + 1}`, groups: groupNames.map(n => ({ name: n, count: 50 })) },
    ]);
  };

  const removeLabel = (li: number) => setData(prev => prev.filter((_, i) => i !== li));

  const updateLabelName = (li: number, val: string) => {
    setData(prev => prev.map((lg, i) => i === li ? { ...lg, label: val } : lg));
  };

  const updateCount = (li: number, gi: number, val: string) => {
    setData(prev => prev.map((lg, i) => i !== li ? lg : {
      ...lg,
      groups: lg.groups.map((g, j) => j !== gi ? g : { ...g, count: parseInt(val) || 0 }),
    }));
  };

  const addGroup = () => {
    const newName = `그룹 ${(data[0]?.groups.length ?? 0) + 1}`;
    setData(prev => prev.map(lg => ({
      ...lg,
      groups: [...lg.groups, { name: newName, count: 50 }],
    })));
  };

  const updateGroupName = (gi: number, val: string) => {
    setData(prev => prev.map(lg => ({
      ...lg,
      groups: lg.groups.map((g, j) => j !== gi ? g : { ...g, name: val }),
    })));
  };

  const groupNames = data[0]?.groups.map(g => g.name) ?? [];

  return (
    <MetricPageLayout
      title="라벨링 편향"
      sectionId="ML-D-02"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '라벨링 편향' },
      ]}
      what="학습데이터의 각 라벨에 대해 보호변수 그룹 간 비율 차이가 존재하는지 측정합니다. 하나 이상의 라벨이 기준 미달이면 라벨링 편향이 있다고 판단합니다."
      why="특정 라벨(예: 대출 승인)에서 성별 그룹 간 비율이 크게 다르면 모델이 불공정한 결정을 내릴 수 있습니다."
      how="각 라벨별로 보호변수를 기준으로 그룹화한 뒤, 그룹별 라벨 비율을 계산합니다. 최저 비율/최고 비율 = 비율(ratio)을 구하여 0.8 이상이면 통과입니다."
      passRule="모든 라벨에서 최저/최고 비중 ≥ 0.8"
      passRuleSource="manual_table"
      formula="비율(ratio) = min_그룹(라벨별 비율) / max_그룹(라벨별 비율)

모든 라벨에 대해 ratio ≥ 0.8이면 통과"
      formulaExplanation="각 라벨별로 보호변수 그룹의 해당 라벨 비율을 계산하고, 최소값/최대값 비율이 0.8 이상이면 공정하다고 판단합니다."
      documentRef="AI 평가검증 가이드 v1.0 표 2.2.6 (p.195)"
    >
      <div className={styles.inputSection}>
        <div className={styles.topBar}>
          <span className={styles.hint}>라벨별로 각 그룹의 데이터 수를 입력하세요.</span>
          <div className={styles.actions}>
            <button className={styles.exBtn} onClick={loadExample} type="button">
              예시 데이터 불러오기
            </button>
            <button className={styles.addBtn} onClick={addGroup} type="button">
              + 그룹 추가
            </button>
            <button className={styles.addBtn} onClick={addLabel} type="button">
              + 라벨 추가
            </button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>라벨</th>
                {groupNames.map((gn, gi) => (
                  <th key={gi}>
                    <input
                      className={styles.groupNameInput}
                      value={gn}
                      onChange={e => updateGroupName(gi, e.target.value)}
                    />
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((lg, li) => (
                <tr key={li}>
                  <td>
                    <input
                      className={styles.inputField}
                      value={lg.label}
                      onChange={e => updateLabelName(li, e.target.value)}
                    />
                  </td>
                  {lg.groups.map((g, gi) => (
                    <td key={gi}>
                      <input
                        className={styles.inputField}
                        type="number"
                        min="0"
                        value={g.count}
                        onChange={e => updateCount(li, gi, e.target.value)}
                      />
                    </td>
                  ))}
                  <td>
                    <button className={styles.removeBtn} onClick={() => removeLabel(li)} type="button">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        <div className={styles.overallResult}>
          <span className={styles.overallLabel}>전체 판정</span>
          <PassFailChip pass={result.allPass} />
          <span className={styles.overallNote}>
            {result.allPass ? '모든 라벨이 기준을 통과했습니다.' : '하나 이상의 라벨이 기준에 미달합니다.'}
          </span>
        </div>

        <div className={styles.labelResults}>
          {result.results.map((r, i) => (
            <div key={i} className={`${styles.labelCard} ${r.pass ? styles.labelPass : styles.labelFail}`}>
              <div className={styles.labelCardHeader}>
                <span className={styles.labelName}>{r.label}</span>
                <PassFailChip pass={r.pass} />
              </div>
              <div className={styles.labelMetrics}>
                <div>
                  <span className={styles.metricLabel}>비율 (min/max)</span>
                  <span className={styles.metricValue}>{r.ratio.toFixed(4)}</span>
                </div>
                <div>
                  <span className={styles.metricLabel}>기준</span>
                  <span className={styles.metricValue}>≥ {result.threshold}</span>
                </div>
              </div>
              <div className={styles.groupRates}>
                {r.groups.map((g, j) => (
                  <div key={j} className={styles.groupRate}>
                    <span className={styles.groupName}>{g.name}</span>
                    <div className={styles.rateBar}>
                      <div
                        className={styles.rateBarFill}
                        style={{ width: `${g.rate * 100}%` }}
                      />
                    </div>
                    <span className={styles.rateVal}>{(g.rate * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MetricPageLayout>
  );
};

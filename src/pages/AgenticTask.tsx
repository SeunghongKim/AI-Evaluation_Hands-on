import React, { useState } from 'react';
import { MetricPageLayout } from '../components/ui/MetricPageLayout';
import { PassFailChip } from '../components/ui/PassFailChip';
import styles from './AgenticTask.module.css';

interface Scenario {
  id: string;
  name: string;
  success: boolean;
}

const DEFAULT_SCENARIOS: Scenario[] = [
  { id: '1', name: '고객 문의 자동 분류', success: true },
  { id: '2', name: '이상 거래 탐지 후 알림', success: true },
  { id: '3', name: '대출 심사 보조 판단', success: false },
  { id: '4', name: '문서 요약 및 보고서 생성', success: true },
  { id: '5', name: '다단계 질의응답 처리', success: false },
];

export const AgenticTask: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>(DEFAULT_SCENARIOS);
  const [threshold, setThreshold] = useState('0.80');

  const total = scenarios.length;
  const successes = scenarios.filter(s => s.success).length;
  const rate = total > 0 ? successes / total : 0;
  const thresholdNum = parseFloat(threshold);
  const pass = !isNaN(thresholdNum) && total > 0 ? rate >= thresholdNum : null;

  const addScenario = () => {
    setScenarios(prev => [...prev, {
      id: String(prev.length + 1),
      name: `시나리오 ${prev.length + 1}`,
      success: false,
    }]);
  };

  const removeScenario = (i: number) => {
    setScenarios(prev => prev.filter((_, idx) => idx !== i));
  };

  const toggleSuccess = (i: number) => {
    setScenarios(prev => prev.map((s, idx) => idx !== i ? s : { ...s, success: !s.success }));
  };

  const updateName = (i: number, val: string) => {
    setScenarios(prev => prev.map((s, idx) => idx !== i ? s : { ...s, name: val }));
  };

  return (
    <MetricPageLayout
      title="에이전틱 태스크 (Agentic Task)"
      sectionId="AGT-01"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '에이전틱 태스크' },
      ]}
      what="AI 에이전트가 다단계 시나리오를 자율적으로 수행할 때의 성공률을 측정합니다."
      why="에이전트 기반 AI 시스템은 단일 추론이 아닌 여러 단계의 의사결정을 수행하므로, 전체 시나리오 성공률로 평가해야 합니다."
      how="사전 정의된 시나리오별 성공/실패를 기록하고 Success Rate를 계산합니다. 통과 기준은 조직 내 협의로 설정합니다."
      passRule="협의 필요 — Success Rate 기준을 조직 내 협의로 설정"
      passRuleSource="configurable"
      formula="Success Rate = (성공 시나리오 수) / (전체 시나리오 수)"
      formulaExplanation="1.0이면 모든 시나리오 성공, 0이면 모두 실패입니다."
      documentRef="AI 평가검증 가이드 v1.0 AGT-01"
    >
      <div className={styles.inputSection}>
        <div className={styles.thresholdRow}>
          <label className={styles.thresholdLabel}>통과 기준 (Success Rate)</label>
          <input
            className={styles.thresholdInput}
            type="number"
            min="0" max="1" step="0.01"
            value={threshold}
            onChange={e => setThreshold(e.target.value)}
            placeholder="0.80"
          />
          <span className={styles.thresholdNote}>예: 0.80 = 80% 이상 성공 시 통과</span>
        </div>

        <div className={styles.topBar}>
          <span className={styles.hint}>시나리오별 성공/실패를 기록하세요.</span>
          <div className={styles.actions}>
            <button className={styles.addBtn} onClick={addScenario} type="button">+ 시나리오 추가</button>
          </div>
        </div>

        <table className={styles.scenarioTable}>
          <thead>
            <tr>
              <th>시나리오명</th>
              <th>성공 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s, i) => (
              <tr key={s.id}>
                <td>
                  <input
                    className={styles.scenarioInput}
                    value={s.name}
                    onChange={e => updateName(i, e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`${styles.successBtn} ${s.success ? styles.successBtnOn : styles.successBtnOff}`}
                    onClick={() => toggleSuccess(i)}
                    type="button"
                  >
                    {s.success ? '성공' : '실패'}
                  </button>
                </td>
                <td>
                  <button className={styles.removeBtn} onClick={() => removeScenario(i)} type="button">
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.resultGrid}>
          <div className={styles.resultStat}>
            <span className={styles.resultLabel}>전체 시나리오</span>
            <span className={styles.resultValue}>{total}</span>
          </div>
          <div className={styles.resultStat}>
            <span className={styles.resultLabel}>성공</span>
            <span className={styles.resultValue} style={{ color: 'var(--color-success)' }}>{successes}</span>
          </div>
          <div className={styles.resultStat}>
            <span className={styles.resultLabel}>실패</span>
            <span className={styles.resultValue} style={{ color: 'var(--color-danger)' }}>{total - successes}</span>
          </div>
          <div className={styles.resultStat}>
            <span className={styles.resultLabel}>Success Rate</span>
            <span className={styles.resultValue}>{(rate * 100).toFixed(1)}%</span>
          </div>
          <div className={styles.resultStat}>
            <span className={styles.resultLabel}>판정</span>
            <PassFailChip pass={pass} />
          </div>
        </div>

        <div className={styles.interpretation}>
          <h4>해석</h4>
          {pass === null ? (
            <p>시나리오를 추가하고 통과 기준을 설정하세요.</p>
          ) : pass ? (
            <p className={styles.passText}>
              Success Rate({(rate * 100).toFixed(1)}%)가 기준({(thresholdNum * 100).toFixed(0)}%) 이상입니다.
              에이전트가 주어진 시나리오를 충분히 잘 수행하고 있습니다.
            </p>
          ) : (
            <p className={styles.failText}>
              Success Rate({(rate * 100).toFixed(1)}%)가 기준({(thresholdNum * 100).toFixed(0)}%) 미만입니다.
              실패 시나리오를 분석하여 에이전트의 약점을 개선하십시오.
            </p>
          )}
        </div>
      </div>
    </MetricPageLayout>
  );
};

import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { calcDistinctN } from '../../lib/metrics/distinctN';
import styles from './GenerativePerformance.module.css';

const METRICS = [
  { id: 'LLM-M-01', name: '사실성 (Factuality)', desc: '생성된 내용이 실제로 사실인지', inputType: 'score', unit: '(0~1)', note: '외부 사실 검증 API 또는 LLM-as-Judge 점수 입력' },
  { id: 'LLM-M-02', name: '정확성 (Accuracy)', desc: '질문에 대한 정확한 답변을 제공하는지', inputType: 'score', unit: '(0~1)', note: '참조 답변(Reference)과의 비교 점수 (ROUGE, BERTScore 등)' },
  { id: 'LLM-M-03', name: '유창성 (Fluency)', desc: '자연스럽고 문법적으로 올바른 텍스트를 생성하는지', inputType: 'score', unit: '(1~5)', note: 'Perplexity 기반 또는 LLM-as-Judge Likert 5점 척도' },
  { id: 'LLM-M-04', name: '관련성 (Relevance)', desc: '입력 프롬프트와 관련된 내용을 생성하는지', inputType: 'score', unit: '(0~1)', note: '의미적 유사도 (코사인 유사도 등)' },
  { id: 'LLM-M-05', name: '일관성 (Consistency)', desc: '여러 응답 간 내용이 일관성을 유지하는지', inputType: 'score', unit: '(0~1)', note: '동일 질문에 대한 다중 응답 비교' },
  { id: 'LLM-M-06', name: '완전성 (Completeness)', desc: '요청된 모든 내용을 빠짐없이 포함하는지', inputType: 'score', unit: '(0~1)', note: '체크리스트 기반 완전성 평가' },
  { id: 'LLM-M-07', name: '다양성 (Diversity)', desc: '생성 텍스트의 어휘적 다양성', inputType: 'distinct', unit: '(Distinct-N)', note: '브라우저에서 직접 Distinct-N 계산 가능' },
  { id: 'LLM-M-08', name: '간결성 (Conciseness)', desc: '불필요한 반복 없이 간결하게 표현하는지', inputType: 'score', unit: '(0~1)', note: '응답 길이 대비 정보 밀도' },
];

export const GenerativePerformance: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [thresholds, setThresholds] = useState<Record<string, string>>({});
  const [distinctTexts, setDistinctTexts] = useState('');

  const activeMetric = METRICS[activeTab];
  const score = parseFloat(scores[activeMetric.id] ?? '');
  const threshold = parseFloat(thresholds[activeMetric.id] ?? '');

  const pass = !isNaN(score) && !isNaN(threshold) ? score >= threshold : null;

  const distinctResult = activeMetric.inputType === 'distinct'
    ? calcDistinctN(distinctTexts.trim().split('\n').filter(Boolean))
    : null;

  return (
    <MetricPageLayout
      title="모델 성능 (8개 지표)"
      sectionId="LLM-M-01~08"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '생성형 AI', to: '/generative' },
        { label: '모델 성능' },
      ]}
      what="LLM이 생성한 텍스트의 품질을 사실성, 정확성, 유창성, 관련성, 일관성, 완전성, 다양성, 간결성 8개 차원으로 측정합니다."
      why="단일 지표만으로는 LLM의 품질을 충분히 평가할 수 없습니다. 8개 지표의 종합적 평가가 필요합니다."
      how="각 지표별로 외부 평가 도구 또는 LLM-as-Judge로 사전 계산한 점수를 입력합니다. 다양성(Distinct-N)은 브라우저에서 직접 계산 가능합니다."
      passRule="협의 필요 — 지표별 기준을 조직 내 협의로 설정"
      passRuleSource="configurable"
      documentRef="AI 평가검증 가이드 v1.0 LLM-M-01~08"
    >
      {/* Tabs */}
      <div className={styles.tabs}>
        {METRICS.map((m, i) => (
          <button
            key={m.id}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
            type="button"
          >
            <span className={styles.tabId}>M-0{i + 1}</span>
            <span className={styles.tabName}>{m.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active metric */}
      <div className={styles.metricPanel}>
        <div className={styles.metricHeader}>
          <code className={styles.metricId}>{activeMetric.id}</code>
          <h3 className={styles.metricName}>{activeMetric.name}</h3>
        </div>
        <p className={styles.metricDesc}>{activeMetric.desc}</p>
        <p className={styles.metricNote}>{activeMetric.note}</p>

        {activeMetric.inputType === 'score' ? (
          <div className={styles.scoreInput}>
            <div className={styles.scoreRow}>
              <div className={styles.scoreField}>
                <label className={styles.fieldLabel}>평균 점수 {activeMetric.unit}</label>
                <input
                  className={styles.scoreNum}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={scores[activeMetric.id] ?? ''}
                  onChange={e => setScores(prev => ({ ...prev, [activeMetric.id]: e.target.value }))}
                />
              </div>
              <div className={styles.scoreField}>
                <label className={styles.fieldLabel}>통과 기준 (협의 필요)</label>
                <input
                  className={styles.scoreNum}
                  type="number"
                  step="0.01"
                  placeholder="예: 0.80"
                  value={thresholds[activeMetric.id] ?? ''}
                  onChange={e => setThresholds(prev => ({ ...prev, [activeMetric.id]: e.target.value }))}
                />
              </div>
              <div className={styles.scoreField}>
                <label className={styles.fieldLabel}>판정</label>
                <PassFailChip pass={pass} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.distinctInput}>
            <label className={styles.fieldLabel}>
              생성된 텍스트 입력 (한 줄에 한 문장)
            </label>
            <textarea
              className={styles.distinctTextarea}
              placeholder="모델이 생성한 텍스트를 한 줄씩 입력하세요&#10;예시: 오늘 날씨가 매우 좋습니다&#10;내일도 맑은 날씨가 예상됩니다"
              value={distinctTexts}
              onChange={e => setDistinctTexts(e.target.value)}
              rows={5}
            />
            {distinctResult && (
              <div className={styles.distinctResults}>
                <div className={styles.distinctStat}>
                  <span className={styles.dStatLabel}>Distinct-1 (단어)</span>
                  <span className={styles.dStatValue}>{distinctResult.distinct1.toFixed(4)}</span>
                </div>
                <div className={styles.distinctStat}>
                  <span className={styles.dStatLabel}>Distinct-2 (이중어)</span>
                  <span className={styles.dStatValue}>{distinctResult.distinct2.toFixed(4)}</span>
                </div>
                <div className={styles.distinctStat}>
                  <span className={styles.dStatLabel}>총 토큰</span>
                  <span className={styles.dStatValue}>{distinctResult.totalTokens}</span>
                </div>
                <div className={styles.distinctStat}>
                  <span className={styles.dStatLabel}>고유 단어</span>
                  <span className={styles.dStatValue}>{distinctResult.uniqueUnigrams}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MetricPageLayout>
  );
};

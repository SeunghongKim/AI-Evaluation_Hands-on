import React from 'react';
import { Badge, BadgeVariant } from '../components/ui/Badge';
import styles from './Coverage.module.css';

interface MetricRow {
  section_id: string;
  category: '비생성형' | '생성형' | '에이전틱';
  metric_name: string;
  pass_rule: string | null;
  pass_rule_source: BadgeVariant | null;
  feasibility: string;
  feasibility_badge: BadgeVariant;
  status: '구현완료' | '부분구현' | '미구현';
}

const METRICS: MetricRow[] = [
  { section_id: 'ML-D-01', category: '비생성형', metric_name: '표본 편향', pass_rule: 'PSI < 0.25', pass_rule_source: 'manual_table', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'ML-D-02', category: '비생성형', metric_name: '라벨링 편향', pass_rule: '최저/최고 비중 ≥ 0.8', pass_rule_source: 'manual_table', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'ML-D-03', category: '비생성형', metric_name: '사회적 편향', pass_rule: 'PSI < 0.2', pass_rule_source: 'manual_method_example', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'ML-M-01', category: '비생성형', metric_name: '서비스 품질', pass_rule: '각 지표 ≥ 0.8', pass_rule_source: 'manual_table', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'ML-M-02', category: '비생성형', metric_name: '모델 공정성', pass_rule: '최저/최고 비중 ≥ 0.8', pass_rule_source: 'manual_table', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'ML-M-03', category: '비생성형', metric_name: '설명가능성(SHAP/LIME)', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },

  { section_id: 'LLM-D-01', category: '생성형', metric_name: '대표성 편향', pass_rule: 'Entropy ≥ 0.8', pass_rule_source: 'manual_method_example', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'LLM-D-02', category: '생성형', metric_name: '형식 편향', pass_rule: 'Entropy ≥ 0.8', pass_rule_source: 'manual_method_example', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'LLM-D-03', category: '생성형', metric_name: '선호도 편향', pass_rule: 'KL Divergence < 0.2', pass_rule_source: 'manual_table', feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'LLM-M-01', category: '생성형', metric_name: '사실성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-02', category: '생성형', metric_name: '정확성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-03', category: '생성형', metric_name: '유창성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-04', category: '생성형', metric_name: '관련성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-05', category: '생성형', metric_name: '일관성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-06', category: '생성형', metric_name: '완전성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-M-07', category: '생성형', metric_name: '다양성', pass_rule: null, pass_rule_source: null, feasibility: '직접 산출 가능', feasibility_badge: 'manual_table', status: '구현완료' },
  { section_id: 'LLM-M-08', category: '생성형', metric_name: '간결성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-S-01', category: '생성형', metric_name: '편향성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-S-02', category: '생성형', metric_name: '유해성', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-S-03', category: '생성형', metric_name: '견고성', pass_rule: null, pass_rule_source: null, feasibility: '외부 평가기 필요', feasibility_badge: 'external_required', status: '구현완료' },
  { section_id: 'LLM-S-04', category: '생성형', metric_name: '개인정보보호', pass_rule: null, pass_rule_source: null, feasibility: '외부 평가기 필요', feasibility_badge: 'external_required', status: '구현완료' },
  { section_id: 'LLM-S-05', category: '생성형', metric_name: '안전장치 우회', pass_rule: null, pass_rule_source: null, feasibility: '외부 평가기 필요', feasibility_badge: 'external_required', status: '구현완료' },
  { section_id: 'LLM-S-06', category: '생성형', metric_name: '환각', pass_rule: null, pass_rule_source: null, feasibility: '사전 계산 업로드 필요', feasibility_badge: 'upload_required', status: '구현완료' },
  { section_id: 'LLM-X-01', category: '생성형', metric_name: '설명가능성(MI)', pass_rule: null, pass_rule_source: null, feasibility: '외부 평가기 필요', feasibility_badge: 'external_required', status: '구현완료' },
  { section_id: 'AGT-01', category: '에이전틱', metric_name: 'Agentic Task', pass_rule: null, pass_rule_source: null, feasibility: '외부 평가기 필요', feasibility_badge: 'external_required', status: '구현완료' },
];

const categoryClass: Record<string, string> = {
  '비생성형': styles.categoryNonGen,
  '생성형': styles.categoryGen,
  '에이전틱': styles.categoryAgent,
};

const statusClass: Record<string, string> = {
  '구현완료': styles.statusDone,
  '부분구현': styles.statusPartial,
  '미구현': styles.statusNone,
};

export const Coverage: React.FC = () => {
  const total = METRICS.length;
  const done = METRICS.filter(m => m.status === '구현완료').length;
  const partial = METRICS.filter(m => m.status === '부분구현').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>메트릭 커버리지</span>
        <h1 className={styles.title}>전체 평가 지표 커버리지</h1>
        <p className={styles.desc}>
          AI 평가검증 가이드 v1.0에 명시된 25개 평가 지표의 구현 현황, 통과 기준 출처, GitHub Pages 구현 가능성을 종합적으로 보여줍니다.
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{total}</span>
          <span className={styles.statLabel}>총 지표</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{done}</span>
          <span className={styles.statLabel}>구현완료</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{partial}</span>
          <span className={styles.statLabel}>부분구현</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{total - done - partial}</span>
          <span className={styles.statLabel}>미구현</span>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Section ID</th>
              <th>카테고리</th>
              <th>지표명</th>
              <th>통과 기준</th>
              <th>기준 출처</th>
              <th>구현 가능성</th>
              <th>구현 상태</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map(m => (
              <tr key={m.section_id}>
                <td>
                  <span className={styles.sectionId}>{m.section_id}</span>
                </td>
                <td>
                  <span className={`${styles.category} ${categoryClass[m.category] ?? ''}`}>
                    {m.category}
                  </span>
                </td>
                <td className={styles.metricName}>{m.metric_name}</td>
                <td>
                  {m.pass_rule ? (
                    <span className={styles.passRule}>{m.pass_rule}</span>
                  ) : (
                    <span className={styles.na}>협의 필요</span>
                  )}
                </td>
                <td>
                  {m.pass_rule_source ? (
                    <Badge variant={m.pass_rule_source} />
                  ) : (
                    <span className={styles.na}>-</span>
                  )}
                </td>
                <td>
                  <Badge variant={m.feasibility_badge} />
                </td>
                <td>
                  <span className={statusClass[m.status] ?? ''}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendTitle}>범례</div>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <Badge variant="manual_table" /> 문서 표에 기준 명시
          </div>
          <div className={styles.legendItem}>
            <Badge variant="manual_method_example" /> 방법 예시에서 기준 추론
          </div>
          <div className={styles.legendItem}>
            <Badge variant="configurable" /> 운영 조직 협의 필요
          </div>
          <div className={styles.legendItem}>
            <Badge variant="upload_required" /> 사전 계산 결과 업로드
          </div>
          <div className={styles.legendItem}>
            <Badge variant="external_required" /> 외부 평가 도구 필요
          </div>
        </div>
      </div>
    </div>
  );
};

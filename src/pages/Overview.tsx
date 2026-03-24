import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Overview.module.css';

const METRIC_SUMMARY = [
  { id: 'ML-D-01', name: '표본 편향', category: '비생성형 데이터', to: '/non-generative/sample-bias', status: '구현완료' },
  { id: 'ML-D-02', name: '라벨링 편향', category: '비생성형 데이터', to: '/non-generative/labeling-bias', status: '구현완료' },
  { id: 'ML-D-03', name: '사회적 편향', category: '비생성형 데이터', to: '/non-generative/social-bias', status: '구현완료' },
  { id: 'ML-M-01', name: '서비스 품질', category: '비생성형 모델', to: '/non-generative/performance', status: '구현완료' },
  { id: 'ML-M-02', name: '모델 공정성', category: '비생성형 모델', to: '/non-generative/fairness', status: '구현완료' },
  { id: 'ML-M-03', name: '설명가능성', category: '비생성형 모델', to: '/non-generative/explainability', status: '구현완료' },
  { id: 'LLM-D-01', name: '표현 편향', category: '생성형 데이터', to: '/generative/representation-bias', status: '구현완료' },
  { id: 'LLM-D-02', name: '형식 편향', category: '생성형 데이터', to: '/generative/format-bias', status: '구현완료' },
  { id: 'LLM-D-03', name: '선호 편향', category: '생성형 데이터', to: '/generative/preference-bias', status: '구현완료' },
  { id: 'LLM-M-01', name: '사실성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-02', name: '정확성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-03', name: '유창성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-04', name: '관련성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-05', name: '일관성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-06', name: '완전성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-07', name: '다양성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-M-08', name: '간결성', category: '생성형 모델', to: '/generative/performance', status: '구현완료' },
  { id: 'LLM-S-01', name: '편향성', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-S-02', name: '유해성', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-S-03', name: '견고성', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-S-04', name: '개인정보보호', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-S-05', name: '안전장치우회', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-S-06', name: '환각', category: '생성형 안전성', to: '/generative/safety', status: '구현완료' },
  { id: 'LLM-X-01', name: '설명가능성', category: '생성형 설명성', to: '/generative/explainability', status: '구현완료' },
  { id: 'AGT-01', name: '에이전틱 태스크', category: '에이전틱', to: '/agentic-task', status: '구현완료' },
];

const CATEGORY_CONFIG: Record<string, { color: string; bg: string }> = {
  '비생성형 데이터': { color: '#1e5799', bg: '#eff6ff' },
  '비생성형 모델': { color: '#1b7a4a', bg: '#f0fdf4' },
  '생성형 데이터': { color: '#7c3aed', bg: '#f5f3ff' },
  '생성형 모델': { color: '#b45309', bg: '#fffbeb' },
  '생성형 안전성': { color: '#b91c1c', bg: '#fff5f5' },
  '생성형 설명성': { color: '#0e7490', bg: '#ecfeff' },
  '에이전틱': { color: '#334155', bg: '#f8fafc' },
};

const SECTION_CARDS = [
  {
    title: '비생성형 AI 평가',
    desc: 'ML/DL 모델의 데이터 편향, 서비스 품질, 공정성, 설명가능성을 측정합니다.',
    to: '/non-generative',
    count: 6,
    color: '#1e5799',
  },
  {
    title: '생성형 AI 평가',
    desc: 'LLM의 데이터 편향, 모델 성능 8개, 안전성 6개, 설명가능성을 측정합니다.',
    to: '/generative',
    count: 16,
    color: '#7c3aed',
  },
  {
    title: '에이전틱 태스크',
    desc: 'AI 에이전트의 시나리오 성공률을 측정합니다.',
    to: '/agentic-task',
    count: 1,
    color: '#334155',
  },
  {
    title: '전체 커버리지',
    desc: '25개 평가 항목의 구현 현황과 문서 출처를 확인합니다.',
    to: '/coverage',
    count: 25,
    color: '#0e7490',
  },
];

export const Overview: React.FC = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>AI 평가·검증 가이드 v1.0 기반</div>
          <h1 className={styles.heroTitle}>AI 평가검증 실습 Lab</h1>
          <p className={styles.heroDesc}>
            부산은행 AI 모델의 공정성, 성능, 안전성을 체계적으로 평가하는 인터랙티브 도구입니다.
            비생성형 AI와 생성형 AI에 걸쳐 총 25개 평가 지표를 제공합니다.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>25</span>
              <span className={styles.heroStatLabel}>총 평가 지표</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>6</span>
              <span className={styles.heroStatLabel}>비생성형 지표</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>16</span>
              <span className={styles.heroStatLabel}>생성형 지표</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>2</span>
              <span className={styles.heroStatLabel}>AI 유형</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className={styles.intro}>
        <h2 className={styles.introTitle}>이 도구에 대하여</h2>
        <p className={styles.introText}>
          본 평가검증 실습 Lab은 <strong>AI 평가검증 가이드 v1.0</strong>에 명시된 평가 지표를
          브라우저에서 직접 계산할 수 있도록 구현한 인터랙티브 도구입니다.
          데이터를 직접 입력하거나 CSV/JSON을 업로드하면 즉시 결과를 확인할 수 있습니다.
        </p>
        <p className={styles.introText} style={{ marginTop: 8 }}>
          각 지표 페이지에는 <strong>문서 출처(표 번호)</strong>와 <strong>통과 기준의 근거</strong>를
          명시하여 평가 결과의 신뢰성을 높였습니다.
        </p>
      </div>

      {/* Section cards */}
      <div className={styles.sectionCards}>
        {SECTION_CARDS.map(card => (
          <Link key={card.to} to={card.to} className={styles.sectionCard}>
            <div className={styles.sectionCardCount} style={{ color: card.color }}>
              {card.count}개
            </div>
            <div className={styles.sectionCardTitle} style={{ color: card.color }}>
              {card.title}
            </div>
            <p className={styles.sectionCardDesc}>{card.desc}</p>
            <span className={styles.sectionCardArrow}>→</span>
          </Link>
        ))}
      </div>

      {/* Metrics table */}
      <div className={styles.tableSection}>
        <h2 className={styles.tableSectionTitle}>전체 평가 지표 목록</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>지표명</th>
                <th>카테고리</th>
                <th>바로가기</th>
              </tr>
            </thead>
            <tbody>
              {METRIC_SUMMARY.map(m => {
                const cfg = CATEGORY_CONFIG[m.category];
                return (
                  <tr key={m.id}>
                    <td>
                      <code className={styles.metricId}>{m.id}</code>
                    </td>
                    <td className={styles.metricName}>{m.name}</td>
                    <td>
                      <span
                        className={styles.categoryTag}
                        style={{ color: cfg?.color, background: cfg?.bg }}
                      >
                        {m.category}
                      </span>
                    </td>
                    <td>
                      <Link to={m.to} className={styles.tableLink}>평가하기 →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

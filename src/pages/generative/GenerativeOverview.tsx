import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GenerativeOverview.module.css';

const METRICS = [
  { id: 'LLM-D-01', name: '표현 편향', desc: '특정 속성(성별, 집단)이 과소/과대 표현되는지 Shannon Entropy로 측정', to: '/generative/representation-bias', tag: '데이터 편향', passRule: '정규화 엔트로피 ≥ 0.8', src: '방법 예시 기준' },
  { id: 'LLM-D-02', name: '형식 편향', desc: '특정 텍스트 형식(JSON, 대화체 등)이 과도하게 집중되는지 측정', to: '/generative/format-bias', tag: '데이터 편향', passRule: '정규화 엔트로피 ≥ 0.8', src: '방법 예시 기준' },
  { id: 'LLM-D-03', name: '선호 편향', desc: '특정 관점/선호가 과도하게 반영되는지 KL Divergence로 측정', to: '/generative/preference-bias', tag: '데이터 편향', passRule: 'KL < 0.2', src: '문서 표 명시' },
  { id: 'LLM-M-01~08', name: '모델 성능 (8개)', desc: '사실성, 정확성, 유창성, 관련성, 일관성, 완전성, 다양성, 간결성', to: '/generative/performance', tag: '모델 성능', passRule: '협의 필요', src: '운영 협의 필요' },
  { id: 'LLM-S-01~06', name: '안전성 (6개)', desc: '편향성, 유해성, 견고성, 개인정보보호, 안전장치우회, 환각', to: '/generative/safety', tag: '안전성', passRule: '협의 필요', src: '운영 협의 필요' },
  { id: 'LLM-X-01', name: '설명가능성', desc: 'Mechanistic Interpretability — 외부 평가기 또는 사전 계산 필요', to: '/generative/explainability', tag: '설명가능성', passRule: '협의 필요', src: '외부 평가기 필요' },
];

const SRC_STYLE: Record<string, { bg: string; color: string }> = {
  '문서 표 명시': { bg: '#dcfce7', color: '#166534' },
  '방법 예시 기준': { bg: '#fef3c7', color: '#92400e' },
  '운영 협의 필요': { bg: '#dbeafe', color: '#1e40af' },
  '외부 평가기 필요': { bg: '#fee2e2', color: '#991b1b' },
};

export const GenerativeOverview: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>생성형 AI (LLM)</span>
        <h1 className={styles.title}>생성형 AI 평가 개요</h1>
        <p className={styles.desc}>
          대규모 언어 모델(LLM)의 데이터 편향, 모델 성능, 안전성, 설명가능성을
          AI 평가검증 가이드 v1.0 기준으로 평가합니다. 총 16개 세부 지표를 포함합니다.
        </p>
      </div>

      <div className={styles.grid}>
        {METRICS.map(m => {
          const srcStyle = SRC_STYLE[m.src];
          return (
            <Link key={m.id} to={m.to} className={styles.card}>
              <div className={styles.cardHeader}>
                <code className={styles.cardId}>{m.id}</code>
                <span className={styles.cardTag}>{m.tag}</span>
              </div>
              <div className={styles.cardName}>{m.name}</div>
              <p className={styles.cardDesc}>{m.desc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.passRule}>기준: {m.passRule}</span>
                <span
                  className={styles.srcBadge}
                  style={{ background: srcStyle?.bg, color: srcStyle?.color }}
                >
                  {m.src}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

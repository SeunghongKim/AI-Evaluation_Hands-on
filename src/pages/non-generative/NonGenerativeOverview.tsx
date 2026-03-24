import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NonGenerativeOverview.module.css';

const METRICS = [
  {
    id: 'ML-D-01',
    name: '표본 편향',
    desc: '학습/검증/시험 데이터가 원천데이터(모집단)를 통계적으로 잘 대표하는지 PSI로 측정',
    to: '/non-generative/sample-bias',
    category: '데이터',
    passRule: 'PSI < 0.25',
    passRuleSource: '문서 표 명시',
  },
  {
    id: 'ML-D-02',
    name: '라벨링 편향',
    desc: '각 라벨별 보호변수 그룹 간 비율 차이가 공정한지 검증',
    to: '/non-generative/labeling-bias',
    category: '데이터',
    passRule: '최저/최고 비중 ≥ 0.8',
    passRuleSource: '문서 표 명시',
  },
  {
    id: 'ML-D-03',
    name: '사회적 편향',
    desc: '보호변수 그룹 간 속성 분포 차이를 PSI로 측정 (그룹 간 비교)',
    to: '/non-generative/social-bias',
    category: '데이터',
    passRule: 'PSI < 0.2',
    passRuleSource: '방법 예시 기준',
  },
  {
    id: 'ML-M-01',
    name: '서비스 품질',
    desc: 'Accuracy, Precision, Recall, F1-Score를 혼동행렬로 계산',
    to: '/non-generative/performance',
    category: '모델',
    passRule: '모든 지표 ≥ 0.8',
    passRuleSource: '문서 표 명시',
  },
  {
    id: 'ML-M-02',
    name: '모델 공정성',
    desc: 'Fairness Tree 기반 지표(FPR/FNR/FDR 등)로 4/5 Rule 검증',
    to: '/non-generative/fairness',
    category: '모델',
    passRule: '최저/최고 비중 ≥ 0.8',
    passRuleSource: '문서 표 명시',
  },
  {
    id: 'ML-M-03',
    name: '설명가능성',
    desc: 'SHAP/LIME 특성 기여도를 업로드하여 시각화',
    to: '/non-generative/explainability',
    category: '모델',
    passRule: '협의 필요',
    passRuleSource: '운영 협의 필요',
  },
];

export const NonGenerativeOverview: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>비생성형 AI (ML/DL)</span>
        <h1 className={styles.title}>비생성형 AI 평가 개요</h1>
        <p className={styles.desc}>
          전통적인 머신러닝·딥러닝 모델의 데이터 편향, 서비스 품질, 공정성, 설명가능성을
          AI 평가검증 가이드 v1.0 기준으로 평가합니다.
        </p>
      </div>

      <div className={styles.grid}>
        {METRICS.map(m => (
          <Link key={m.id} to={m.to} className={styles.card}>
            <div className={styles.cardHeader}>
              <code className={styles.cardId}>{m.id}</code>
              <span className={`${styles.cardCat} ${m.category === '데이터' ? styles.catData : styles.catModel}`}>
                {m.category}
              </span>
            </div>
            <div className={styles.cardName}>{m.name}</div>
            <p className={styles.cardDesc}>{m.desc}</p>
            <div className={styles.cardFooter}>
              <span className={styles.passRule}>기준: {m.passRule}</span>
              <span className={`${styles.sourceBadge} ${m.passRuleSource === '문서 표 명시' ? styles.sourceGreen : m.passRuleSource === '방법 예시 기준' ? styles.sourceAmber : styles.sourceBlue}`}>
                {m.passRuleSource}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

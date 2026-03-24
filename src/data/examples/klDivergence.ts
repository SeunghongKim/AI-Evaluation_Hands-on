export const klDivergenceExample = {
  title: '텍스트 감성 클러스터 분포',
  description: '생성형 AI 학습 데이터의 감성 클러스터가 균일하게 분포되는지 평가',
  clusters: [
    { label: '매우 긍정', proportion: 0.18 },
    { label: '긍정', proportion: 0.27 },
    { label: '중립', proportion: 0.31 },
    { label: '부정', proportion: 0.16 },
    { label: '매우 부정', proportion: 0.08 },
  ],
};

export const klDivergenceUniformExample = {
  title: '균일 분포 예시 (통과)',
  description: '이상적인 균일 분포에 가까운 경우',
  clusters: [
    { label: '매우 긍정', proportion: 0.20 },
    { label: '긍정', proportion: 0.21 },
    { label: '중립', proportion: 0.19 },
    { label: '부정', proportion: 0.21 },
    { label: '매우 부정', proportion: 0.19 },
  ],
};

export const klDivergenceSkewedExample = {
  title: '편향된 분포 예시 (실패)',
  description: '특정 감성이 과도하게 집중된 경우',
  clusters: [
    { label: '매우 긍정', proportion: 0.05 },
    { label: '긍정', proportion: 0.08 },
    { label: '중립', proportion: 0.72 },
    { label: '부정', proportion: 0.10 },
    { label: '매우 부정', proportion: 0.05 },
  ],
};

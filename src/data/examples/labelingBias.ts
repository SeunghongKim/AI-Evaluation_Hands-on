import type { LabelGroup } from '../../lib/metrics/labelingBias';

export const labelingBiasExample: LabelGroup[] = [
  {
    label: '근로소득자',
    groups: [
      { name: '남성', count: 3421 },
      { name: '여성', count: 2876 },
    ],
  },
  {
    label: '사업자',
    groups: [
      { name: '남성', count: 1872 },
      { name: '여성', count: 1034 },
    ],
  },
  {
    label: '무직',
    groups: [
      { name: '남성', count: 612 },
      { name: '여성', count: 891 },
    ],
  },
];

export const labelingBiasExampleDescription = {
  title: '대출 신청자 직업 유형 라벨링 편향 예시',
  protectedVariable: '성별',
  labels: ['근로소득자', '사업자', '무직'],
  note: '부산은행 가계대출 신청 데이터 기반 가상 예시입니다.',
};

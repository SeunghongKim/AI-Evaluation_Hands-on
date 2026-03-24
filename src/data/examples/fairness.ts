import type { GroupCM } from '../../lib/metrics/fairness';

export const fairnessGenderExample: GroupCM[] = [
  { groupName: '남성', tp: 412, fp: 38, fn: 28, tn: 522 },
  { groupName: '여성', tp: 298, fp: 47, fn: 52, tn: 403 },
];

export const fairnessAgeExample: GroupCM[] = [
  { groupName: '20-30대', tp: 210, fp: 31, fn: 19, tn: 240 },
  { groupName: '40-50대', tp: 320, fp: 42, fn: 38, tn: 400 },
  { groupName: '60대 이상', tp: 98, fp: 22, fn: 31, tn: 149 },
];

export const fairnessExampleDescription = {
  title: '대출 심사 모델 공정성 평가 예시',
  protectedVariable: '성별',
  note: '부산은행 신용대출 심사 모델의 성별 그룹 혼동행렬 예시입니다.',
};

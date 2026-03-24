import type { PSIBin } from '../../lib/metrics/psi';

export interface SampleBiasExample {
  label: string;
  description: string;
  bins: PSIBin[];
}

export const genderBiasExample: SampleBiasExample = {
  label: '성별 (Gender)',
  description: '원천데이터 대비 학습데이터의 성별 분포 PSI',
  bins: [
    { label: '남성', expected: 0.512, actual: 0.481 },
    { label: '여성', expected: 0.488, actual: 0.519 },
  ],
};

export const educationBiasExample: SampleBiasExample = {
  label: '학력 (Education)',
  description: '원천데이터 대비 학습데이터의 학력 분포 PSI',
  bins: [
    { label: '고졸 이하', expected: 0.283, actual: 0.198 },
    { label: '전문대졸', expected: 0.187, actual: 0.221 },
    { label: '대졸', expected: 0.389, actual: 0.431 },
    { label: '대학원 이상', expected: 0.141, actual: 0.150 },
  ],
};

export const ageBiasExample: SampleBiasExample = {
  label: '연령대 (Age Group)',
  description: '원천데이터 대비 학습데이터의 연령대 분포 PSI',
  bins: [
    { label: '20대', expected: 0.182, actual: 0.156 },
    { label: '30대', expected: 0.248, actual: 0.271 },
    { label: '40대', expected: 0.271, actual: 0.289 },
    { label: '50대', expected: 0.198, actual: 0.195 },
    { label: '60대 이상', expected: 0.101, actual: 0.089 },
  ],
};

export const allSampleBiasExamples = [genderBiasExample, educationBiasExample, ageBiasExample];

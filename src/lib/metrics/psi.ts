/** Population Stability Index */
export interface PSIBin {
  label: string;
  expected: number; // 원천데이터 비율
  actual: number;   // 학습/검증/시험 데이터 비율
}

export interface PSIResult {
  bins: (PSIBin & { psi: number })[];
  total: number;
  pass: boolean;
  threshold: number;
}

const EPSILON = 1e-10;
const PSI_THRESHOLD = 0.25; // 표 2.2.3 manual_table

export function calcPSI(bins: PSIBin[]): PSIResult {
  if (bins.length === 0) {
    return { bins: [], total: 0, pass: true, threshold: PSI_THRESHOLD };
  }
  const computed = bins.map(b => {
    const e = Math.max(b.expected, EPSILON);
    const a = Math.max(b.actual, EPSILON);
    const psi = (a - e) * Math.log(a / e);
    return { ...b, psi };
  });
  const total = computed.reduce((s, b) => s + b.psi, 0);
  return { bins: computed, total, pass: total < PSI_THRESHOLD, threshold: PSI_THRESHOLD };
}

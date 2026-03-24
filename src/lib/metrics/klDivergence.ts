const EPSILON = 1e-10;
const KL_THRESHOLD = 0.2; // 표 2.3.6 manual_table

export interface KLResult {
  clusters: { label: string; actual: number; ideal: number; kl: number }[];
  total: number;
  pass: boolean;
  threshold: number;
}

export function calcKLDivergence(actual: { label: string; proportion: number }[]): KLResult {
  if (actual.length === 0) {
    return { clusters: [], total: 0, pass: true, threshold: KL_THRESHOLD };
  }
  const k = actual.length;
  const ideal = 1 / k;
  const clusters = actual.map(a => {
    const p = Math.max(a.proportion, EPSILON);
    const q = ideal;
    const kl = p * Math.log(p / q);
    return { label: a.label, actual: a.proportion, ideal, kl };
  });
  const total = clusters.reduce((s, c) => s + c.kl, 0);
  return { clusters, total, pass: total < KL_THRESHOLD, threshold: KL_THRESHOLD };
}

const EPSILON = 1e-10;
// Threshold from manual_method_example (P320, P339): Entropy >= 0.8
const THRESHOLD = 0.8;

export interface EntropyResult {
  bins: { label: string; proportion: number; contribution: number }[];
  entropy: number;
  normalized: number;
  pass: boolean;
  threshold: number;
  thresholdSource: 'manual_method_example';
}

export function calcEntropy(bins: { label: string; count: number }[]): EntropyResult {
  if (bins.length === 0) {
    return { bins: [], entropy: 0, normalized: 0, pass: false, threshold: THRESHOLD, thresholdSource: 'manual_method_example' };
  }
  const total = bins.reduce((s, b) => s + b.count, 0);
  if (total === 0) {
    return { bins: [], entropy: 0, normalized: 0, pass: false, threshold: THRESHOLD, thresholdSource: 'manual_method_example' };
  }
  const maxEntropy = Math.log2(Math.max(bins.length, 1));
  const computed = bins.map(b => {
    const p = b.count / total;
    const contribution = p > EPSILON ? -p * Math.log2(p) : 0;
    return { label: b.label, proportion: p, contribution };
  });
  const entropy = computed.reduce((s, b) => s + b.contribution, 0);
  const normalized = maxEntropy > 0 ? entropy / maxEntropy : 0;
  return { bins: computed, entropy, normalized, pass: normalized >= THRESHOLD, threshold: THRESHOLD, thresholdSource: 'manual_method_example' };
}

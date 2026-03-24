/** Labeling Bias: min/max ratio per label */
export interface LabelGroup {
  label: string;
  groups: { name: string; count: number }[];
}

export interface LabelBiasResult {
  label: string;
  groups: { name: string; rate: number }[];
  minRate: number;
  maxRate: number;
  ratio: number;
  pass: boolean;
}

const THRESHOLD = 0.8; // 표 2.2.6 manual_table

export function calcLabelingBias(input: LabelGroup[]): { results: LabelBiasResult[]; allPass: boolean; threshold: number } {
  if (input.length === 0) {
    return { results: [], allPass: true, threshold: THRESHOLD };
  }
  const results = input.map(lg => {
    const total = lg.groups.reduce((s, g) => s + g.count, 0);
    const groups = lg.groups.map(g => ({ name: g.name, rate: total > 0 ? g.count / total : 0 }));
    const rates = groups.map(g => g.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const ratio = maxRate > 0 ? minRate / maxRate : 0;
    return { label: lg.label, groups, minRate, maxRate, ratio, pass: ratio >= THRESHOLD };
  });
  return { results, allPass: results.every(r => r.pass), threshold: THRESHOLD };
}

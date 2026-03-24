/** Fairness: 4/5 Rule on selected fairness metric */
export type FairnessMetric = 'FPR'|'FNR'|'FDR'|'FOR'|'PPV'|'NPV';

export interface GroupCM {
  groupName: string;
  tp: number; fp: number; fn: number; tn: number;
}

export interface FairnessResult {
  metric: FairnessMetric;
  groups: { name: string; value: number }[];
  minVal: number; maxVal: number;
  ratio: number; pass: boolean; threshold: number;
}

const THRESHOLD = 0.8; // 표 2.2.13 manual_table

function groupMetricValue(cm: GroupCM, metric: FairnessMetric): number {
  const {tp,fp,fn,tn} = cm;
  switch(metric) {
    case 'FPR': return (fp+tn)>0 ? fp/(fp+tn) : 0;
    case 'FNR': return (tp+fn)>0 ? fn/(tp+fn) : 0;
    case 'FDR': return (tp+fp)>0 ? fp/(tp+fp) : 0;
    case 'FOR': return (tn+fn)>0 ? fn/(tn+fn) : 0;
    case 'PPV': return (tp+fp)>0 ? tp/(tp+fp) : 0;
    case 'NPV': return (tn+fn)>0 ? tn/(tn+fn) : 0;
  }
}

export function calcFairness(groups: GroupCM[], metric: FairnessMetric): FairnessResult {
  if (groups.length === 0) {
    return { metric, groups: [], minVal: 0, maxVal: 0, ratio: 0, pass: false, threshold: THRESHOLD };
  }
  const vals = groups.map(g => ({ name: g.groupName, value: groupMetricValue(g, metric) }));
  const values = vals.map(v => v.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const ratio = maxVal > 0 ? minVal / maxVal : 0;
  return { metric, groups: vals, minVal, maxVal, ratio, pass: ratio >= THRESHOLD, threshold: THRESHOLD };
}

export interface ConfusionMatrix { tp: number; fp: number; fn: number; tn: number }

const THRESHOLD = 0.8; // 표 2.2.11 manual_table

export function calcMetrics(cm: ConfusionMatrix) {
  const { tp, fp, fn, tn } = cm;
  const total = tp + fp + fn + tn;
  const accuracy  = total > 0 ? (tp + tn) / total : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall    = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1        = (precision + recall) > 0 ? 2 * precision * recall / (precision + recall) : 0;
  return {
    accuracy, precision, recall, f1,
    pass: { accuracy: accuracy >= THRESHOLD, precision: precision >= THRESHOLD, recall: recall >= THRESHOLD, f1: f1 >= THRESHOLD },
    threshold: THRESHOLD,
  };
}

export function cmFromArrays(yTrue: number[], yPred: number[]): ConfusionMatrix {
  let tp=0,fp=0,fn=0,tn=0;
  yTrue.forEach((t,i) => {
    const p = yPred[i];
    if (t===1 && p===1) tp++;
    else if (t===0 && p===1) fp++;
    else if (t===1 && p===0) fn++;
    else tn++;
  });
  return {tp,fp,fn,tn};
}

import { describe, it, expect } from 'vitest';
import { calcMetrics, cmFromArrays } from '../confusion';

describe('calcMetrics', () => {
  it('calculates all metrics correctly', () => {
    const result = calcMetrics({ tp: 80, fp: 10, fn: 10, tn: 100 });
    expect(result.accuracy).toBeCloseTo(0.9, 2);
    expect(result.precision).toBeCloseTo(0.889, 2);
    expect(result.recall).toBeCloseTo(0.889, 2);
  });

  it('passes when all metrics >= 0.8', () => {
    const result = calcMetrics({ tp: 85, fp: 5, fn: 5, tn: 105 });
    expect(result.pass.accuracy).toBe(true);
    expect(result.pass.precision).toBe(true);
    expect(result.pass.recall).toBe(true);
    expect(result.pass.f1).toBe(true);
  });

  it('fails when precision < 0.8', () => {
    const result = calcMetrics({ tp: 50, fp: 50, fn: 10, tn: 90 });
    expect(result.pass.precision).toBe(false);
  });

  it('handles all zeros', () => {
    const result = calcMetrics({ tp: 0, fp: 0, fn: 0, tn: 0 });
    expect(result.accuracy).toBe(0);
    expect(result.f1).toBe(0);
  });
});

describe('cmFromArrays', () => {
  it('correctly builds confusion matrix from arrays', () => {
    const yTrue = [1, 1, 0, 0];
    const yPred = [1, 0, 1, 0];
    const cm = cmFromArrays(yTrue, yPred);
    expect(cm.tp).toBe(1);
    expect(cm.fn).toBe(1);
    expect(cm.fp).toBe(1);
    expect(cm.tn).toBe(1);
  });
});

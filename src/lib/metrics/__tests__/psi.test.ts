import { describe, it, expect } from 'vitest';
import { calcPSI } from '../psi';

describe('calcPSI', () => {
  it('returns total 0 and pass for identical distributions', () => {
    const bins = [
      { label: '남성', expected: 0.5, actual: 0.5 },
      { label: '여성', expected: 0.5, actual: 0.5 },
    ];
    const result = calcPSI(bins);
    expect(result.total).toBeCloseTo(0, 5);
    expect(result.pass).toBe(true);
  });

  it('fails when PSI >= 0.25', () => {
    const bins = [
      { label: '남성', expected: 0.8, actual: 0.2 },
      { label: '여성', expected: 0.2, actual: 0.8 },
    ];
    const result = calcPSI(bins);
    expect(result.total).toBeGreaterThan(0.25);
    expect(result.pass).toBe(false);
  });

  it('handles empty bins array', () => {
    const result = calcPSI([]);
    expect(result.total).toBe(0);
    expect(result.pass).toBe(true);
    expect(result.bins).toHaveLength(0);
  });

  it('handles near-zero actual proportions with EPSILON', () => {
    const bins = [
      { label: 'A', expected: 0.99, actual: 0.0000001 },
      { label: 'B', expected: 0.01, actual: 0.9999999 },
    ];
    const result = calcPSI(bins);
    expect(result.total).toBeGreaterThan(0);
    expect(Number.isFinite(result.total)).toBe(true);
  });

  it('sets threshold to 0.25', () => {
    const result = calcPSI([{ label: 'A', expected: 0.5, actual: 0.5 }]);
    expect(result.threshold).toBe(0.25);
  });
});

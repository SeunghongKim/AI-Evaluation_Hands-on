import { describe, it, expect } from 'vitest';
import { calcKLDivergence } from '../klDivergence';

describe('calcKLDivergence', () => {
  it('returns 0 KL for perfect uniform distribution', () => {
    const actual = [
      { label: '클러스터1', proportion: 0.25 },
      { label: '클러스터2', proportion: 0.25 },
      { label: '클러스터3', proportion: 0.25 },
      { label: '클러스터4', proportion: 0.25 },
    ];
    const result = calcKLDivergence(actual);
    expect(result.total).toBeCloseTo(0, 5);
    expect(result.pass).toBe(true);
  });

  it('fails when KL divergence >= 0.2', () => {
    const actual = [
      { label: '클러스터1', proportion: 0.9 },
      { label: '클러스터2', proportion: 0.05 },
      { label: '클러스터3', proportion: 0.03 },
      { label: '클러스터4', proportion: 0.02 },
    ];
    const result = calcKLDivergence(actual);
    expect(result.total).toBeGreaterThan(0.2);
    expect(result.pass).toBe(false);
  });

  it('handles empty input', () => {
    const result = calcKLDivergence([]);
    expect(result.total).toBe(0);
    expect(result.pass).toBe(true);
  });

  it('sets threshold to 0.2', () => {
    const result = calcKLDivergence([]);
    expect(result.threshold).toBe(0.2);
  });

  it('handles near-zero proportions with EPSILON', () => {
    const actual = [
      { label: 'A', proportion: 0.9999 },
      { label: 'B', proportion: 0.0001 },
    ];
    const result = calcKLDivergence(actual);
    expect(Number.isFinite(result.total)).toBe(true);
  });
});

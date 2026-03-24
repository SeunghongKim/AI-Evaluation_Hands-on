import { describe, it, expect } from 'vitest';
import { calcEntropy } from '../entropy';

describe('calcEntropy', () => {
  it('returns max entropy for uniform distribution', () => {
    const bins = [
      { label: '남성', count: 50 },
      { label: '여성', count: 50 },
    ];
    const result = calcEntropy(bins);
    expect(result.normalized).toBeCloseTo(1.0, 4);
    expect(result.pass).toBe(true);
  });

  it('returns low entropy for skewed distribution', () => {
    const bins = [
      { label: '남성', count: 99 },
      { label: '여성', count: 1 },
    ];
    const result = calcEntropy(bins);
    expect(result.normalized).toBeLessThan(0.8);
    expect(result.pass).toBe(false);
  });

  it('handles empty bins', () => {
    const result = calcEntropy([]);
    expect(result.normalized).toBe(0);
    expect(result.pass).toBe(false);
  });

  it('handles all-zero counts', () => {
    const bins = [{ label: 'A', count: 0 }, { label: 'B', count: 0 }];
    const result = calcEntropy(bins);
    expect(result.normalized).toBe(0);
    expect(result.pass).toBe(false);
  });

  it('passes with near-uniform 4-class distribution', () => {
    const bins = [
      { label: 'A', count: 25 },
      { label: 'B', count: 26 },
      { label: 'C', count: 24 },
      { label: 'D', count: 25 },
    ];
    const result = calcEntropy(bins);
    expect(result.normalized).toBeGreaterThan(0.99);
    expect(result.pass).toBe(true);
  });
});

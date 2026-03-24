import { describe, it, expect } from 'vitest';
import { calcLabelingBias } from '../labelingBias';

describe('calcLabelingBias', () => {
  it('passes when all label ratios >= 0.8', () => {
    const input = [
      {
        label: '근로소득자',
        groups: [{ name: '남성', count: 80 }, { name: '여성', count: 72 }],
      },
    ];
    const result = calcLabelingBias(input);
    expect(result.results[0].ratio).toBeCloseTo(0.9, 2);
    expect(result.allPass).toBe(true);
  });

  it('fails when any label ratio < 0.8', () => {
    const input = [
      {
        label: '사업자',
        groups: [{ name: '남성', count: 100 }, { name: '여성', count: 40 }],
      },
    ];
    const result = calcLabelingBias(input);
    expect(result.results[0].ratio).toBeCloseTo(0.4, 2);
    expect(result.allPass).toBe(false);
  });

  it('returns allPass false if even one label fails', () => {
    const input = [
      {
        label: '근로소득자',
        groups: [{ name: '남성', count: 80 }, { name: '여성', count: 75 }],
      },
      {
        label: '무직',
        groups: [{ name: '남성', count: 100 }, { name: '여성', count: 10 }],
      },
    ];
    const result = calcLabelingBias(input);
    expect(result.results[0].pass).toBe(true);
    expect(result.results[1].pass).toBe(false);
    expect(result.allPass).toBe(false);
  });

  it('handles empty input', () => {
    const result = calcLabelingBias([]);
    expect(result.allPass).toBe(true);
    expect(result.results).toHaveLength(0);
  });

  it('sets threshold to 0.8', () => {
    const result = calcLabelingBias([]);
    expect(result.threshold).toBe(0.8);
  });
});

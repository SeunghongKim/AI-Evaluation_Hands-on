import { describe, it, expect } from 'vitest';
import { calcFairness } from '../fairness';

describe('calcFairness', () => {
  const groups = [
    { groupName: '남성', tp: 80, fp: 10, fn: 10, tn: 100 },
    { groupName: '여성', tp: 70, fp: 15, fn: 15, tn: 100 },
  ];

  it('calculates FPR correctly', () => {
    const result = calcFairness(groups, 'FPR');
    // 남성 FPR = 10/(10+100) = 0.0909
    expect(result.groups[0].value).toBeCloseTo(10/110, 4);
    // 여성 FPR = 15/(15+100) = 0.1304
    expect(result.groups[1].value).toBeCloseTo(15/115, 4);
  });

  it('calculates PPV correctly', () => {
    const result = calcFairness(groups, 'PPV');
    expect(result.groups[0].value).toBeCloseTo(80/90, 4);
    expect(result.groups[1].value).toBeCloseTo(70/85, 4);
  });

  it('passes when ratio >= 0.8', () => {
    const equalGroups = [
      { groupName: '남성', tp: 80, fp: 10, fn: 10, tn: 100 },
      { groupName: '여성', tp: 76, fp: 10, fn: 10, tn: 100 },
    ];
    const result = calcFairness(equalGroups, 'PPV');
    expect(result.pass).toBe(true);
  });

  it('fails when ratio < 0.8', () => {
    const unfairGroups = [
      { groupName: '남성', tp: 90, fp: 5, fn: 5, tn: 100 },
      { groupName: '여성', tp: 40, fp: 20, fn: 20, tn: 100 },
    ];
    const result = calcFairness(unfairGroups, 'PPV');
    expect(result.pass).toBe(false);
  });

  it('handles empty groups', () => {
    const result = calcFairness([], 'FPR');
    expect(result.groups).toHaveLength(0);
    expect(result.pass).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import { calcDistinctN } from '../distinctN';

describe('calcDistinctN', () => {
  it('returns correct distinct-1 for all unique tokens', () => {
    const texts = ['안녕 세계 오늘'];
    const result = calcDistinctN(texts);
    expect(result.distinct1).toBe(1.0);
    expect(result.totalTokens).toBe(3);
    expect(result.uniqueUnigrams).toBe(3);
  });

  it('returns lower distinct-1 for repeated tokens', () => {
    const texts = ['안녕 안녕 안녕 세계'];
    const result = calcDistinctN(texts);
    expect(result.distinct1).toBe(0.5);
    expect(result.uniqueUnigrams).toBe(2);
  });

  it('handles empty input', () => {
    const result = calcDistinctN([]);
    expect(result.distinct1).toBe(0);
    expect(result.distinct2).toBe(0);
    expect(result.totalTokens).toBe(0);
  });

  it('calculates distinct-2 correctly', () => {
    const texts = ['a b a b'];
    const result = calcDistinctN(texts);
    // bigrams: a_b, b_a, a_b -> unique: a_b, b_a -> 2/3
    expect(result.distinct2).toBeCloseTo(2/3, 4);
  });

  it('handles multiple texts', () => {
    const texts = ['hello world', 'hello korea'];
    const result = calcDistinctN(texts);
    expect(result.totalTokens).toBe(4);
    expect(result.uniqueUnigrams).toBe(3); // hello, world, korea
  });
});

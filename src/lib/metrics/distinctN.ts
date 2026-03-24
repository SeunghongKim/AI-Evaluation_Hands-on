export interface DistinctNResult {
  distinct1: number;
  distinct2: number;
  totalTokens: number;
  uniqueUnigrams: number;
  uniqueBigrams: number;
}

export function calcDistinctN(texts: string[]): DistinctNResult {
  const allTokens: string[] = [];
  const allBigrams: string[] = [];
  texts.forEach(t => {
    const tokens = t.toLowerCase().split(/\s+/).filter(Boolean);
    allTokens.push(...tokens);
    for (let i = 0; i < tokens.length - 1; i++) {
      allBigrams.push(`${tokens[i]}_${tokens[i+1]}`);
    }
  });
  const uniqueUnigrams = new Set(allTokens).size;
  const uniqueBigrams = new Set(allBigrams).size;
  return {
    distinct1: allTokens.length > 0 ? uniqueUnigrams / allTokens.length : 0,
    distinct2: allBigrams.length > 0 ? uniqueBigrams / allBigrams.length : 0,
    totalTokens: allTokens.length,
    uniqueUnigrams,
    uniqueBigrams,
  };
}

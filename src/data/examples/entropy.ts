export const representationEntropyExample = {
  attribute: '성별 대명사 언급 빈도',
  bins: [
    { label: '남성 대명사 (그, 그의, 그가)', count: 1842 },
    { label: '여성 대명사 (그녀, 그녀의, 그녀가)', count: 1653 },
    { label: '중성/없음', count: 1205 },
  ],
};

export const occupationEntropyExample = {
  attribute: '직업 언급 분포',
  bins: [
    { label: '전문직 (의사, 변호사, 교수)', count: 312 },
    { label: '사무직 (회사원, 공무원)', count: 891 },
    { label: '서비스직 (판매원, 요리사)', count: 542 },
    { label: '기술직 (기술자, 엔지니어)', count: 278 },
    { label: '기타', count: 177 },
  ],
};

export const formatEntropyExample = {
  attribute: '텍스트 형식 분포',
  bins: [
    { label: 'JSON 구조', count: 450 },
    { label: '대화형 (DIALOG)', count: 380 },
    { label: '테이블 형식', count: 290 },
    { label: 'MARKDOWN', count: 420 },
    { label: '일반 텍스트', count: 460 },
  ],
};

export const allEntropyExamples = [
  representationEntropyExample,
  occupationEntropyExample,
  formatEntropyExample,
];

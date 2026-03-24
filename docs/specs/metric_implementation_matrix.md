# Metric Implementation Matrix

> 25개 평가항목 × 구현 요소별 체크 매트릭스

---

## 범례

| 기호 | 의미 |
|------|------|
| ✅ | 구현 완료 |
| 📐 | 산식 표시 (FormulaPanel) |
| 📊 | 입력 스키마 (DataUpload / 수동 입력) |
| 📈 | 결과 패널 (ResultPanel + 차트) |
| 🏷️ | 통과/실패 칩 (PassFailChip) |
| 📄 | 문서 근거 섹션 |
| 🏅 | 기준출처 배지 (Badge) |
| 🧪 | 순수함수 메트릭 라이브러리 |
| 🧾 | 유닛 테스트 |
| 📦 | 예제 데이터 |

---

## 비생성형 AI

| ID | 항목 | 📐 산식 | 📊 입력 | 📈 결과 | 🏷️ 판정 | 📄 근거 | 🏅 배지 | 🧪 lib | 🧾 test | 📦 예제 |
|----|------|---------|---------|---------|---------|---------|---------|--------|--------|---------|
| ML-D-01 | 표본 편향 | ✅ | ✅ CSV/수동 | ✅ 차트 | ✅ | ✅ | ✅ manual_table | ✅ psi.ts | ✅ | ✅ |
| ML-D-02 | 라벨링 편향 | ✅ | ✅ 테이블 | ✅ 차트 | ✅ | ✅ | ✅ manual_table | ✅ labelingBias.ts | ✅ | ✅ |
| ML-D-03 | 사회적 편향 | ✅ | ✅ CSV/수동 | ✅ 차트 | ✅ | ✅ | ✅ method_example | ✅ psi.ts (재사용) | ✅ | ✅ |
| ML-M-01 | 서비스 품질 | ✅ | ✅ CM/배열 | ✅ CM 시각화 | ✅ | ✅ | ✅ manual_table | ✅ confusion.ts | ✅ | ✅ |
| ML-M-02 | 모델 공정성 | ✅ | ✅ 그룹CM | ✅ 차트 | ✅ | ✅ | ✅ manual_table | ✅ fairness.ts | ✅ | ✅ |
| ML-M-03 | 설명가능성 | ✅ (개념) | ✅ JSON 업로드 | ✅ 바 차트 | - (기준없음) | ✅ | ✅ configurable | - | - | - |

## 생성형 AI — 데이터 공정성

| ID | 항목 | 📐 산식 | 📊 입력 | 📈 결과 | 🏷️ 판정 | 📄 근거 | 🏅 배지 | 🧪 lib | 🧾 test | 📦 예제 |
|----|------|---------|---------|---------|---------|---------|---------|--------|--------|---------|
| LLM-D-01 | 대표성 편향 | ✅ | ✅ 카운트 | ✅ 차트 | ✅ | ✅ | ✅ method_example | ✅ entropy.ts | ✅ | ✅ |
| LLM-D-02 | 형식 편향 | ✅ | ✅ 카운트 | ✅ 차트 | ✅ | ✅ | ✅ method_example | ✅ entropy.ts (재사용) | ✅ | ✅ |
| LLM-D-03 | 선호도 편향 | ✅ | ✅ 비율 | ✅ 차트 | ✅ | ✅ | ✅ manual_table | ✅ klDivergence.ts | ✅ | ✅ |

## 생성형 AI — 모델 성능

| ID | 항목 | 📐 산식 | 📊 입력 | 📈 결과 | 🏷️ 판정 | 📄 근거 | 🏅 배지 | 🧪 lib | 🧾 test | 📦 예제 |
|----|------|---------|---------|---------|---------|---------|---------|--------|--------|---------|
| LLM-M-01 | 사실성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-02 | 정확성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-03 | 유창성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-04 | 관련성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-05 | 일관성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-06 | 완전성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-M-07 | 다양성 | ✅ | ✅ 텍스트 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | ✅ distinctN.ts | ✅ | - |
| LLM-M-08 | 간결성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |

## 생성형 AI — 모델 안전성

| ID | 항목 | 📐 산식 | 📊 입력 | 📈 결과 | 🏷️ 판정 | 📄 근거 | 🏅 배지 | 🧪 lib | 🧾 test | 📦 예제 |
|----|------|---------|---------|---------|---------|---------|---------|--------|--------|---------|
| LLM-S-01 | 편향성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-S-02 | 유해성 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |
| LLM-S-03 | 견고성 | ✅ ASR | ✅ 케이스표 | ✅ ASR | ✅ configurable | ✅ | ✅ external | ✅ asr.ts | - | - |
| LLM-S-04 | 개인정보 | ✅ ASR | ✅ 케이스표 | ✅ ASR | ✅ configurable | ✅ | ✅ external | ✅ asr.ts (재사용) | - | - |
| LLM-S-05 | 안전장치 | ✅ ASR | ✅ 케이스표 | ✅ ASR | ✅ configurable | ✅ | ✅ external | ✅ asr.ts (재사용) | - | - |
| LLM-S-06 | 환각 | ✅ (개념) | ✅ 업로드/값 | ✅ 집계 | ✅ configurable | ✅ | ✅ configurable | - | - | - |

## 설명가능성 + 에이전틱

| ID | 항목 | 📐 산식 | 📊 입력 | 📈 결과 | 🏷️ 판정 | 📄 근거 | 🏅 배지 | 🧪 lib | 🧾 test | 📦 예제 |
|----|------|---------|---------|---------|---------|---------|---------|--------|--------|---------|
| LLM-X-01 | 설명가능성(MI) | ✅ (절차) | ✅ JSON 업로드 | ✅ 바 차트 | - (기준없음) | ✅ | ✅ external | - | - | - |
| AGT-01 | Agentic Task | ✅ SR | ✅ 시나리오표 | ✅ SR | ✅ configurable | ✅ | ✅ external | - | - | - |

---

## 메트릭 라이브러리 목록

| 파일 | 함수 | 사용 항목 | 테스트 |
|------|------|----------|--------|
| `src/lib/metrics/psi.ts` | `calcPSI()` | ML-D-01, ML-D-03 | ✅ 5 tests |
| `src/lib/metrics/labelingBias.ts` | `calcLabelingBias()` | ML-D-02 | ✅ 5 tests |
| `src/lib/metrics/confusion.ts` | `calcMetrics()`, `cmFromArrays()` | ML-M-01 | ✅ 5 tests |
| `src/lib/metrics/fairness.ts` | `calcFairness()` | ML-M-02 | ✅ 5 tests |
| `src/lib/metrics/entropy.ts` | `calcEntropy()` | LLM-D-01, LLM-D-02 | ✅ 5 tests |
| `src/lib/metrics/klDivergence.ts` | `calcKLDivergence()` | LLM-D-03 | ✅ 5 tests |
| `src/lib/metrics/distinctN.ts` | `calcDistinctN()` | LLM-M-07 | ✅ 5 tests |
| `src/lib/metrics/asr.ts` | `calcASR()` | LLM-S-03~05 | - |

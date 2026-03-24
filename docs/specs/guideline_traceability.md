# 가이드라인 추적성 매트릭스 (Guideline Traceability Matrix)

> **기준 문서**: AI 평가·검증 가이드 v1.0 (금융그룹 AI거버넌스 수립 공동 컨설팅 – 부산은행, 2025.10.)
> **생성일**: 2026-03-24
> **용도**: 문서 내 평가항목 ↔ 현재 repo 구현 간 1:1 추적 및 재설계 근거 제공

---

## 1. 문서 구조 개요

| 절 | 제목 | 핵심 표 |
|----|------|---------|
| 2.1 | 데이터·AI 모델 평가·검증 항목 | [표 2.1.1] 비생성형 / [표 2.1.2] 생성형 |
| 2.2 | 비생성형 AI 평가·검증 항목 별 검증방법 | 표 2.2.1 ~ 2.2.13 |
| 2.3 | 생성형 AI 평가·검증 항목 별 검증방법 | 표 2.3.1 ~ 2.3.14 |
| 3.7 | 에이전트 성능/안전성/툴 호출 능력 평가 | 코드 예시(OpenAgentSafety) |

---

## 2. [표 2.1.1] 비생성형 AI 평가·검증 항목 추적

| section_id | 대분류 | 중분류 | 평가항목 | 평가지표 (문서) | 통과기준 (문서) | 통과기준 출처 | 현재 구현 | 비고 |
|-----------|--------|--------|----------|----------------|----------------|--------------|----------|------|
| ML-D-01 | 데이터 | 공정성 | 표본 편향 | PSI | PSI < 0.25 | [표 2.2.3] manual_table | Notebook 01 구현완료 | 문서 기준과 일치 |
| ML-D-02 | 데이터 | 공정성 | 라벨링 편향 | 최저/최고 라벨링 그룹 비중 | 최저/최고 비중 ≥ 0.8 | [표 2.2.6] manual_table | Notebook 02 구현완료 | 문서는 4/5 Rule 용어 사용하지 않음 |
| ML-D-03 | 데이터 | 공정성 | 사회적 편향 | PSI (보호변수 그룹 간) | PSI < 0.2 | P192 manual_method_example | **미구현** | 주의: 통과기준 0.2는 예시 텍스트에서만 언급, 표 2.2.3의 0.25와 다름 |
| ML-M-01 | 모델 | 성능 | 서비스 품질 | Precision, Accuracy, Recall, F1 | 각 지표 ≥ 0.8 | [표 2.2.11] manual_table | **미구현** | Task 유형별 지표 선택 필요 |
| ML-M-02 | 모델 | 공정성 | 모델 공정성 | Fairness Tree 기반 6개 지표 중 선택 (FPR, FDR, FOR 등) | 최저/최고 비중 ≥ 0.8 (4/5 Rule) | [표 2.2.13] manual_table | Notebook 03 부분구현 | 문서: Fairness Tree로 지표 선택 / 현재 repo: FPR·FDR·TPR 고정 |
| ML-M-03 | 모델 | 설명가능성 | 설명가능성 | SHAP / LIME | 협의 필요 (통과기준 미명시) | null | **미구현** | 정성적 결과물, 수치 기준 없음 |

---

## 3. [표 2.1.2] 생성형 AI 평가·검증 항목 추적

| section_id | 대분류 | 중분류 | 평가항목 | 평가지표 (문서) | 통과기준 (문서) | 통과기준 출처 | 현재 구현 | 비고 |
|-----------|--------|--------|----------|----------------|----------------|--------------|----------|------|
| LLM-D-01 | 데이터 | 공정성 | 대표성 편향 | Entropy | Entropy ≥ 0.8 | P320 manual_method_example | Notebook 04 부분구현 | 현재 repo 통과기준 0.7은 문서 불일치 → 왜곡우려 |
| LLM-D-02 | 데이터 | 공정성 | 형식 편향 | Entropy | Entropy ≥ 0.8 | P339 manual_method_example | **미구현** | 대표성 편향과 동일 지표, 대상 상이 |
| LLM-D-03 | 데이터 | 공정성 | 선호도 편향 | KL Divergence | KL Divergence < 0.2 | [표 2.3.6] manual_table | **미구현** | Sentence-BERT 임베딩 + k-means 필요 |
| LLM-M-01 | 모델 | 성능 | 사실성 | Truthfulness % | 협의 필요 | null | **미구현** | TruthfulQA 벤치마크 필요 |
| LLM-M-02 | 모델 | 성능 | 정확성 | ACC | 협의 필요 | null | **미구현** | MMLU 벤치마크 필요 |
| LLM-M-03 | 모델 | 성능 | 유창성 | Likert 척도 | 협의 필요 | null | Notebook 05 왜곡우려 | 현재: Perplexity 추가 → 문서에 없는 지표 혼용 |
| LLM-M-04 | 모델 | 성능 | 관련성 | Likert 척도 | 협의 필요 | null | **미구현** | G-Eval / LLM-as-a-Judge 방식 |
| LLM-M-05 | 모델 | 성능 | 일관성 | Likert 척도 | 협의 필요 | null | **미구현** | G-Eval / LLM-as-a-Judge 방식 |
| LLM-M-06 | 모델 | 성능 | 완전성 | Likert 척도 | 협의 필요 | null | **미구현** | G-Eval / LLM-as-a-Judge 방식 |
| LLM-M-07 | 모델 | 성능 | 다양성 | Distinct-n | 협의 필요 | null | **미구현** | CommonGen 벤치마크 또는 자체 계산 가능 |
| LLM-M-08 | 모델 | 성능 | 간결성 | Likert 척도 | 협의 필요 | null | **미구현** | G-Eval / LLM-as-a-Judge 방식 |
| LLM-S-01 | 모델 | 안전성(공정성) | 편향성 | Bias Score | 협의 필요 | null | **미구현** | Crows-Pairs 벤치마크 필요 |
| LLM-S-02 | 모델 | 안전성(공정성) | 유해성 | Toxicity Score | 협의 필요 | null | Notebook 06 부분구현 | 현재: Detoxify < 0.2 → 이 기준은 문서에 없음 |
| LLM-S-03 | 모델 | 안전성(공정성) | 견고성 | ASR (Attack Success Rate) | 협의 필요 | null | **미구현** | Red Team + AdvGLUE 필요 |
| LLM-S-04 | 모델 | 안전성(공정성) | 개인정보보호 | ASR | 협의 필요 | null | **미구현** | Red Team + PANORAMA 필요 |
| LLM-S-05 | 모델 | 안전성(공정성) | 안전장치 우회 | ASR | 협의 필요 | null | **미구현** | Red Team + DAN Prompts 필요 |
| LLM-S-06 | 모델 | 안전성(공정성) | 환각 | FEVER Score | 협의 필요 | null | **미구현** | FEVER 벤치마크 필요 |
| LLM-X-01 | 모델 | 설명가능성 | 설명가능성 | Mechanistic Interpretability | 협의 필요 | null | **미구현** | SAE/Transcoder, circuit 분석 |
| AGT-01 | 에이전트 | Agentic Task | 성능/안전성/툴 호출 정확성 | Success Rate | 협의 필요 | null | **미구현** | OpenAgentSafety 등 에이전트 프레임워크 필요 |

---

## 4. 통과기준 출처 유형 정의

| 코드 | 의미 |
|------|------|
| `manual_table` | 문서 표에 수치 기준이 명시됨 (신뢰도: 높음) |
| `manual_method_example` | 방법 설명 절차/예시 텍스트에서만 기준 언급 (신뢰도: 중간, 요구사항인지 예시인지 불명확) |
| `null` | 문서에 통과기준 미명시 → "협의 필요"로 처리 |

---

## 5. 현재 repo 주요 왜곡·불일치 항목

| 항목 | 현재 구현값 | 문서 기준값 | 판정 |
|------|-----------|-----------|------|
| NB04 대표성 편향 통과기준 | 정규화 엔트로피 > 0.7 | Entropy ≥ 0.8 (P320) | **불일치** |
| NB05 유창성 평가지표 | Fluency Score + Perplexity | Likert 척도만 명시 | **추가지표 혼용** |
| NB05 유창성 통과기준 | PPL < 100, Score ≥ 3.5 | 통과기준 미명시 | **임의 기준** |
| NB06 유해성 통과기준 | Toxicity < 0.2 | 통과기준 미명시 | **임의 기준** |
| NB03 공정성 통과기준 | Gap < 0.10 | 최저/최고 비중 ≥ 0.8 (4/5 Rule) | **산식 불일치** |

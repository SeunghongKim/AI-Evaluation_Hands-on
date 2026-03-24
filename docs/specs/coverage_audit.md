# Coverage Audit Report

> **감사 대상**: AI-Evaluation_Hands-on GitHub Pages 실습 사이트
> **기준 문서**: AI 평가·검증 가이드 v1.0 (부산은행, 2025.10.)
> **감사일**: 2026-03-24

---

## 1. 전체 커버리지 요약

| 구분 | 문서 항목 수 | 구현완료 | 부분구현 | 미구현 | 왜곡우려 |
|------|------------|---------|---------|-------|---------|
| 비생성형 (ML) | 6 | 2 | 1 | 3 | 0 |
| 생성형 (LLM) | 19 | 0 | 2 | 17 | 0 |
| **합계** | **25** | **2 (8%)** | **3 (12%)** | **20 (80%)** | **0** |

> **주의**: "부분구현"은 지표는 존재하나 기준값·방법론이 문서와 다른 경우.
> 왜곡우려는 guideline_traceability.md에 별도 명시. 여기서는 개선 필요 수준으로 분류.

---

## 2. 항목별 상세 감사

### 2.1 비생성형 AI

#### ML-D-01 | 표본 편향 | 구현완료

- **구현 파일**: `notebooks/1_ml_data_sample_bias.ipynb`, `docs/1-sample-bias.html`
- **지표**: PSI ✅ (문서 일치)
- **통과기준**: PSI < 0.25 ✅ (문서 [표 2.2.3] 일치)
- **데이터**: UCI Adult Income ✅ (보호변수 성별·학력·인종 포함)
- **개선사항**:
  - 현재 학습/검증/시험 분리 없이 단일 분할만 수행 → 문서는 학습·검증·1차·2차 시험 4종 모두 요구
  - 사회적 편향(ML-D-03)과 같은 PSI 산식이나 별도 섹션으로 구분 필요

#### ML-D-02 | 라벨링 편향 | 구현완료

- **구현 파일**: `notebooks/2_ml_data_labeling_bias.ipynb`, `docs/2-labeling-bias.html`
- **지표**: 최저/최고 라벨링 그룹 비중 ✅
- **통과기준**: 비중 ≥ 0.80 ✅ (문서 [표 2.2.6] 일치)
- **개선사항**:
  - 현재 repo 카드에 "4/5 Rule (80% Rule)" 표기 → 문서는 이 용어를 사용하지 않음. 표기 수정 권고.
  - 문서: "하나 이상의 라벨이 편향될 경우 라벨링 편향 존재" → 복수 라벨 전체 검증 강조 필요

#### ML-D-03 | 사회적 편향 | 미구현

- **구현 파일**: 없음
- **지표**: PSI (보호변수 그룹 간 속성 분포 차이)
- **통과기준**: PSI < 0.2 (P192 예시 텍스트에서 언급, `manual_method_example`)
- **문서 방법**: 보호변수 기준으로 그룹화 → 그룹 간 각 속성별 PSI 측정
- **표본 편향과의 차이**: 표본 편향은 원천↔부분 데이터 분포 비교 / 사회적 편향은 보호변수 그룹 간 속성 분포 비교
- **구현 우선순위**: 중 (PSI 산식 재활용 가능, 신규 노트북 추가)

#### ML-M-01 | 서비스 품질 | 미구현

- **구현 파일**: 없음
- **지표**: Accuracy, Precision, Recall, F1-Score
- **통과기준**: 각 지표 ≥ 0.8 ✅ ([표 2.2.11] `manual_table`)
- **문서 방법**: Task 유형별([표 2.2.9]) 지표 선택 → 혼동행렬 기반 계산
- **구현 우선순위**: 높 (기준 명확, sklearn으로 즉시 구현 가능)

#### ML-M-02 | 모델 공정성 | 부분구현

- **구현 파일**: `notebooks/3_ml_model_fairness.ipynb`, `docs/3-model-fairness.html`
- **지표**: FPR·FDR·TPR Parity ⚠️ (문서: Fairness Tree 기반 6개 중 선택)
- **통과기준**: Gap < 0.10 ❌ (문서: 최저/최고 비중 ≥ 0.8 의 4/5 Rule)
- **불일치**:
  - 현재: 그룹 간 Gap < 0.10 → 이 기준은 문서에 없음 (임의 기준)
  - 문서: 가장 높은/낮은 집단 선정 후 4/5 Rule 적용
  - 현재: FPR·FDR·TPR 고정 → 문서: 서비스 특성에 따라 Fairness Tree로 선택
- **개선사항**: 통과기준을 4/5 Rule(≥ 0.8)로 수정. Fairness Tree 안내 추가.

#### ML-M-03 | 설명가능성 | 미구현

- **구현 파일**: 없음
- **지표**: SHAP / LIME
- **통과기준**: 협의 필요 (통과기준 미명시)
- **문서 방법**: TreeSHAP(트리 기반), DeepSHAP(딥러닝), LIME → 특성 기여도 시각화
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요 (SHAP 값은 Python에서 사전 계산)
- **구현 우선순위**: 중

---

### 2.2 생성형 AI

#### LLM-D-01 | 대표성 편향 | 부분구현 (왜곡우려)

- **구현 파일**: `notebooks/4_llm_data_representativeness_bias.ipynb`, `docs/4-llm-representativeness.html`
- **지표**: Shannon Entropy ✅ (정규화 0~1 사용)
- **통과기준**: 정규화 엔트로피 > 0.7 ❌ (문서 P320: ≥ 0.8)
- **불일치**: 현재 0.7 기준은 문서 근거 없음. 문서 예시는 0.8을 기준으로 제시.
- **개선사항**: 통과기준 0.7 → 0.8로 수정 (단, 이 기준도 `manual_method_example` 수준임을 명시)

#### LLM-D-02 | 형식 편향 | 미구현

- **구현 파일**: 없음
- **지표**: Entropy (대표성 편향과 동일 산식, 대상 상이)
- **통과기준**: Entropy ≥ 0.8 (P339 예시, `manual_method_example`)
- **문서 방법**: 형식(JSON, DIALOG, TABLE 등) 풀 정의 → 규칙 기반 분류 → Entropy 계산
- **GitHub Pages 구현**: 직접 산출 가능 (JavaScript Entropy 계산)
- **구현 우선순위**: 중

#### LLM-D-03 | 선호도 편향 | 미구현

- **구현 파일**: 없음
- **지표**: (Normalized) KL Divergence
- **통과기준**: KL Divergence < 0.2 ✅ ([표 2.3.6] `manual_table`)
- **문서 방법**: Sentence-BERT 임베딩 → k-means 클러스터링 → 실제분포 vs 균등분포 KL Divergence
- **구현 우선순위**: 중 (LLM API 불필요, sentence-transformers로 구현 가능)

#### LLM-M-01 | 사실성 | 미구현

- **지표**: Truthfulness %
- **통과기준**: 협의 필요
- **문서 방법**: 벤치마크 테스트 (TruthfulQA)
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요
- **구현 우선순위**: 높 (TruthfulQA 오픈소스 활용 가능)

#### LLM-M-02 | 정확성 | 미구현

- **지표**: ACC
- **통과기준**: 협의 필요
- **문서 방법**: 벤치마크 테스트 (MMLU)
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요
- **구현 우선순위**: 높

#### LLM-M-03 | 유창성 | 부분구현 (왜곡우려)

- **구현 파일**: `notebooks/5_llm_model_fluency.ipynb`, `docs/5-llm-fluency.html`
- **지표**: Fluency Score + Perplexity ⚠️ (문서: Likert 척도만 명시)
- **통과기준**: Score ≥ 3.5, PPL < 100 ❌ (통과기준 문서 미명시)
- **불일치**: Perplexity는 문서에 없는 추가 지표. 통과기준 임의 설정.
- **개선사항**: LLM-as-a-Judge (G-Eval) 방식으로 재구현. 통과기준 "협의 필요"로 표기.

#### LLM-M-04~08 | 관련성·일관성·완전성·다양성·간결성 | 미구현

- **지표**: Likert 척도 (관련성·일관성·완전성·간결성), Distinct-n (다양성)
- **통과기준**: 협의 필요 (전체 미명시)
- **문서 방법**: LLM-as-a-Judge G-Eval 방식 / 다양성은 CommonGen 벤치마크
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요 (LLM Judge 필요)
- **다양성(Distinct-n)**: 직접 산출 가능 (JavaScript 계산 가능)
- **구현 우선순위**: 중

#### LLM-S-01 | 편향성 | 미구현

- **지표**: Bias Score
- **통과기준**: 협의 필요
- **문서 방법**: 벤치마크 테스트 (Crows-Pairs)
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요
- **구현 우선순위**: 높

#### LLM-S-02 | 유해성 | 부분구현 (통과기준 왜곡)

- **구현 파일**: `notebooks/6_llm_model_toxicity.ipynb`, `docs/6-llm-toxicity.html`
- **지표**: Toxicity Score ✅ (Detoxify 활용)
- **통과기준**: Toxicity < 0.2 ❌ (문서에 통과기준 미명시 → 임의 기준)
- **문서 방법**: 벤치마크 테스트 (RealToxicityPrompts)
- **개선사항**: 통과기준 "협의 필요"로 수정. RealToxicityPrompts 언급 추가.

#### LLM-S-03 | 견고성 | 미구현

- **지표**: ASR (Attack Success Rate)
- **통과기준**: 협의 필요
- **문서 방법**: Red Team + AdvGLUE 데이터셋
- **GitHub Pages 구현**: 외부 평가기 필요 (Red Team 수동 수행)
- **구현 우선순위**: 낮 (정적 사이트에서 직접 산출 불가)

#### LLM-S-04 | 개인정보보호 | 미구현

- **지표**: ASR
- **통과기준**: 협의 필요
- **문서 방법**: Red Team + PANORAMA 데이터셋
- **GitHub Pages 구현**: 외부 평가기 필요
- **구현 우선순위**: 낮

#### LLM-S-05 | 안전장치 우회 | 미구현

- **지표**: ASR
- **통과기준**: 협의 필요
- **문서 방법**: Red Team + DAN Prompts
- **GitHub Pages 구현**: 외부 평가기 필요
- **구현 우선순위**: 낮 (단, 개념 설명 페이지는 구현 가능)

#### LLM-S-06 | 환각 | 미구현

- **지표**: FEVER Score
- **통과기준**: 협의 필요
- **문서 방법**: 벤치마크 테스트 (FEVER 데이터셋)
- **GitHub Pages 구현**: 사전 계산 결과 업로드 필요
- **구현 우선순위**: 높

#### LLM-X-01 | 설명가능성 (생성형) | 미구현

- **지표**: Mechanistic Interpretability (SAE/Transcoder, circuit 분석)
- **통과기준**: 협의 필요
- **문서 방법**: MLP 활성값 샘플링 → Transcoder/SAE 학습 → 회로 탐색 → activation patching
- **GitHub Pages 구현**: 외부 평가기 필요 (고성능 GPU 환경 필요)
- **구현 우선순위**: 낮 (개념 설명 + 시각화 예시 페이지로 대체 가능)

#### AGT-01 | Agentic Task | 미구현

- **지표**: Success Rate
- **통과기준**: 협의 필요
- **문서 방법**: OpenAgentSafety, AgentHarm, MCPEval 등 에이전트 평가 프레임워크
- **GitHub Pages 구현**: 외부 평가기 필요
- **구현 우선순위**: 낮 (에이전트 환경 별도 구축 필요)

---

## 3. GitHub Pages 구현 가능성 분류

### 직접 산출 가능 (JavaScript/정적 계산)
| 항목 | 근거 |
|------|------|
| 표본 편향 (PSI) | 사전 로드된 분포 데이터로 JS 계산 |
| 라벨링 편향 (최저/최고 비중) | 비율 계산, JS 가능 |
| 사회적 편향 (PSI) | 동일 |
| 서비스 품질 (Accuracy 등) | 혼동행렬 입력 → JS 계산 |
| 모델 공정성 (4/5 Rule) | 비율 계산, JS 가능 |
| 대표성 편향 (Entropy) | Entropy 계산, JS 가능 |
| 형식 편향 (Entropy) | 동일 |
| 선호도 편향 (KL Divergence) | JS 가능 |
| 다양성 (Distinct-n) | 텍스트 n-gram JS 계산 가능 |

### 사전 계산 결과 업로드 필요 (Notebook → JSON → 페이지 시각화)
| 항목 | 근거 |
|------|------|
| 설명가능성 SHAP/LIME | Python 라이브러리 필요 |
| 유창성 (LLM-as-a-Judge) | LLM API 필요 |
| 관련성·일관성·완전성·간결성 | LLM API 필요 |
| 편향성 (Crows-Pairs) | 모델 추론 필요 |
| 유해성 (Detoxify) | 모델 추론 필요 |
| 사실성 (TruthfulQA) | 모델 추론 필요 |
| 정확성 (MMLU) | 모델 추론 필요 |
| 환각 (FEVER) | 모델 추론 필요 |

### 외부 평가기 필요 (정적 페이지에서 직접 산출 불가)
| 항목 | 근거 |
|------|------|
| 견고성 ASR | Red Team 수동 공격 수행 필요 |
| 개인정보보호 ASR | Red Team 수동 수행 필요 |
| 안전장치 우회 ASR | Red Team 수동 수행 필요 |
| 설명가능성 Mechanistic Interpretability | GPU + SAE 학습 필요 |
| Agentic Task Success Rate | 에이전트 실행 환경 필요 |

---

## 4. 재설계 우선순위 로드맵

| 우선순위 | 항목 | 이유 |
|---------|------|------|
| **1 (즉시)** | 기존 NB 오류 수정 (NB03 기준, NB04 기준, NB06 기준 표기) | 문서 불일치 수정 |
| **2 (단기)** | 서비스 품질 (ML-M-01) 노트북 추가 | 기준 명확, 구현 용이 |
| **3 (단기)** | 사회적 편향 (ML-D-03) 노트북 추가 | PSI 재사용, 신규 관점 |
| **4 (중기)** | 선호도 편향 (LLM-D-03) | 기준 명확 (KL < 0.2) |
| **5 (중기)** | 형식 편향 (LLM-D-02) | Entropy 재사용 |
| **6 (중기)** | 설명가능성 SHAP (ML-M-03) | 사전 계산 결과 업로드 방식 |
| **7 (중기)** | 사실성·정확성·환각 (벤치마크) | 사전 계산 결과 업로드 방식 |
| **8 (중기)** | 유창성·관련성 등 LLM-as-a-Judge | G-Eval 방식으로 재구현 |
| **9 (장기)** | 편향성 (Crows-Pairs) | 벤치마크 데이터셋 준비 필요 |
| **10 (장기)** | ASR 계열 (견고성·개인정보·Jailbreak) | 개념 설명 페이지 → 실습 환경 별도 |
| **11 (장기)** | Mechanistic Interpretability | GPU 환경 필요 |
| **12 (장기)** | Agentic Task | 에이전트 환경 별도 구축 |

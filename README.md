# AI 평가·검증 Hands-on 자료

[![Jupyter](https://img.shields.io/badge/Jupyter-F37626.svg?&style=for-the-badge&logo=Jupyter&logoColor=white)](https://jupyter.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![HuggingFace](https://img.shields.io/badge/🤗%20Hugging%20Face-FFD21E?style=for-the-badge)](https://huggingface.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**데이터 편향과 모델 공정성·안전성을 직접 검증해보는 인터랙티브 실습 환경**

> 📘 본 프로젝트는 **AI 평가·검증 가이드**에 기반하여 제작되었습니다.

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [평가 항목](#-평가-항목)
  - [비생성형 AI (ML/DL)](#-비생성형-ai-mldl)
  - [생성형 AI (LLM)](#-생성형-ai-llm)
- [설치 및 실행](#-설치-및-실행)
- [노트북 구조](#-노트북-구조)
- [사용된 데이터셋 & 모델](#-사용된-데이터셋--모델)
- [참고 자료](#-참고-자료)

---

## 🎯 프로젝트 소개

AI 시스템의 신뢰성과 공정성을 보장하기 위해서는 체계적인 평가·검증이 필수적입니다.

본 프로젝트는 다음을 목표로 합니다:

- ✅ **실전 학습**: 이론만이 아닌 실제 데이터와 모델로 직접 평가 수행
- ✅ **오픈소스 활용**: Kaggle, HuggingFace의 공개 데이터셋 & 모델 사용
- ✅ **표준 준수**: 금융위원회 AI 개발·활용 안내서 기반 평가 지표 적용
- ✅ **Self-Judge 방식**: LLM이 자신의 출력을 평가하는 방식으로 평가 자동화

---

## 📊 평가 항목

### 🤖 비생성형 AI (ML/DL)

전통적인 머신러닝/딥러닝 모델의 데이터 편향과 모델 공정성을 평가합니다.

| # | 평가 항목 | 평가 대상 | 평가 지표 | 노트북 |
|---|----------|----------|----------|--------|
| 1 | **데이터 표본 편향** | 데이터 공정성 | PSI (Population Stability Index) | [`1_ml_data_sample_bias.ipynb`](notebooks/1_ml_data_sample_bias.ipynb) |
| 2 | **데이터 라벨링 편향** | 데이터 공정성 | 4/5 Rule (최저/최고 비중) | [`2_ml_data_labeling_bias.ipynb`](notebooks/2_ml_data_labeling_bias.ipynb) |
| 3 | **모델 공정성** | 모델 공정성 | FPR, FDR, TPR Parity 등 | [`3_ml_model_fairness.ipynb`](notebooks/3_ml_model_fairness.ipynb) |

### ✨ 생성형 AI (LLM)

대규모 언어 모델의 데이터 대표성, 성능(유창성), 안전성(유해성)을 평가합니다.

| # | 평가 항목 | 평가 대상 | 평가 지표 | 노트북 |
|---|----------|----------|----------|--------|
| 4 | **데이터 대표성 편향** | 데이터 공정성 | Entropy | [`4_llm_data_representativeness_bias.ipynb`](notebooks/4_llm_data_representativeness_bias.ipynb) |
| 5 | **모델 유창성** | 모델 성능 | Likert Scale (5점 척도) | [`5_llm_model_fluency.ipynb`](notebooks/5_llm_model_fluency.ipynb) |
| 6 | **모델 유해성** | 모델 안전성 | Toxicity Score | [`6_llm_model_toxicity.ipynb`](notebooks/6_llm_model_toxicity.ipynb) |

---

## 🚀 설치 및 실행

### 사전 요구사항

- Python 3.8 이상
- Jupyter Notebook
- 8GB 이상 RAM 권장

### 설치 방법

```bash
# 1. 저장소 클론
git clone https://github.com/your-repo/ai-evaluation-lab.git
cd ai-evaluation-lab

# 2. 가상환경 생성 및 활성화
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. Jupyter Notebook 실행
jupyter notebook
```

### 빠른 시작

각 노트북은 독립적으로 실행 가능합니다:

1. `notebooks/` 폴더에서 원하는 노트북 선택
2. 셀을 순서대로 실행 (Shift + Enter)
3. 시각화 결과 및 평가 지표 확인

---

## 📁 노트북 구조

모든 노트북은 다음과 같은 구조를 따릅니다:

```
1. 개요
   - 평가 항목 설명
   - 평가 지표 정의
   - 적용 근거

2. 데이터 준비
   - 데이터셋 로드 (Kaggle/HuggingFace)
   - 전처리 및 탐색적 분석

3. 평가 수행
   - 평가 지표 계산
   - 통과 기준 확인

4. 결과 시각화
   - 그래프 및 차트
   - 해석 및 인사이트

5. 결론
   - 평가 요약
   - 개선 방향 제안
```

---

## 🗂️ 사용된 데이터셋 & 모델

### 데이터셋

| 데이터셋 | 출처 | 사용 노트북 | 설명 |
|---------|------|------------|------|
| **UCI Adult Income** | [Kaggle](https://www.kaggle.com/datasets/uciml/adult-census-income) | #1, #2, #3 | 소득 예측을 위한 인구 통계 데이터 |
| **COMPAS Recidivism** | [ProPublica](https://github.com/propublica/compas-analysis) | #3 | 재범 위험도 예측 데이터 (공정성 연구) |
| **HuggingFace Text Corpus** | [HuggingFace Datasets](https://huggingface.co/datasets) | #4 | 다양한 텍스트 데이터셋 |
| **RealToxicityPrompts** | [AllenAI](https://allenai.org/data/real-toxicity-prompts) | #6 | 독성 텍스트 평가용 프롬프트 |

### 모델

| 모델 | 출처 | 사용 노트북 | 설명 |
|------|------|------------|------|
| **Scikit-learn ML Models** | [Scikit-learn](https://scikit-learn.org/) | #3 | RandomForest, LogisticRegression 등 |
| **DistilGPT-2** | [HuggingFace](https://huggingface.co/distilgpt2) | #5, #6 | 경량화된 GPT-2 모델 |
| **GPT-2** | [HuggingFace](https://huggingface.co/gpt2) | #5, #6 | LLM Self-Judge용 |

---

## 📚 참고 자료

### 가이드라인

- 📘 **AI 평가·검증 가이드 v1.0**
- 📗 [금융위원회 - 금융분야 AI 개발·활용 안내서](https://www.fsc.go.kr/)

### 평가 지표

- **PSI (Population Stability Index)**: 모집단 안정성 지수
- **4/5 Rule**: 미국 고용기회균등위원회(EEOC)의 공정성 기준
- **Fairness Metrics**: FPR/FDR/TPR Parity, Equalized Odds 등
- **Entropy**: 정보 이론 기반 다양성 측정
- **Likert Scale**: 5점 척도 주관적 평가
- **Toxicity Score**: 유해성 점수 (0~1)

### 논문 및 자료

- [Fairness and Machine Learning](https://fairmlbook.org/)
- [AI Fairness 360 (IBM)](https://aif360.mybluemix.net/)
- [Google's Model Card Toolkit](https://modelcards.withgoogle.com/)
- [RealToxicityPrompts Paper](https://arxiv.org/abs/2009.11462)

---

## 🛠️ 기술 스택

- **언어**: Python 3.8+
- **데이터 분석**: pandas, numpy, scipy
- **머신러닝**: scikit-learn, fairlearn
- **딥러닝**: transformers, torch
- **시각화**: matplotlib, seaborn, plotly
- **평가**: datasets (HuggingFace), openai (optional)

---

## 📝 라이선스

MIT License

---

## 🤝 기여하기

프로젝트 개선을 위한 기여를 환영합니다!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 생성해주세요.

---

<p align="center">
  Made with ❤️ for AI Safety & Fairness
</p>

import React, { useRef, useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import styles from './GenerativeExplainability.module.css';

interface FeatureAttribution {
  feature: string;
  attribution: number;
}

export const GenerativeExplainability: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<FeatureAttribution[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && 'feature' in parsed[0] && 'attribution' in parsed[0]) {
          setData(parsed as FeatureAttribution[]);
          setError(null);
        } else {
          setError('JSON 형식 오류: [{ "feature": "...", "attribution": 0.0 }, ...] 형태여야 합니다.');
          setData(null);
        }
      } catch {
        setError('JSON 파싱 오류: 유효한 JSON 파일을 업로드하세요.');
        setData(null);
      }
    };
    reader.readAsText(file);
  };

  const maxAbs = data ? Math.max(...data.map(d => Math.abs(d.attribution)), 0.001) : 1;

  return (
    <MetricPageLayout
      title="설명가능성 (Mechanistic Interpretability)"
      sectionId="LLM-X-01"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '생성형 AI', to: '/generative' },
        { label: '설명가능성' },
      ]}
      what="LLM 내부의 뉴런/레이어/어텐션 헤드 수준에서 모델이 특정 출력을 생성하는 메커니즘을 분석합니다."
      why="기존 블랙박스 접근 방식과 달리 모델 내부 구조를 직접 해석하여, 왜 특정 응답이 생성되었는지를 근본적으로 이해할 수 있습니다."
      how="외부 MI 도구(TransformerLens, Neuroscope 등)로 사전 분석한 Feature Attribution 결과를 JSON으로 업로드하면 시각화합니다."
      passRule="협의 필요 — 정량적 통과 기준 없음 (정성적 분석)"
      passRuleSource="external_required"
      documentRef="AI 평가검증 가이드 v1.0 LLM-X-01"
    >
      <div className={styles.uploadSection}>
        <h3 className={styles.sectionTitle}>Mechanistic Interpretability (MI) 란?</h3>
        <p className={styles.desc}>
          Mechanistic Interpretability는 LLM 내부 구조를 직접 분석하여 모델의 의사결정 과정을 이해하는 접근 방식입니다.
          기존 SHAP/LIME 등의 입출력 기반 설명과 달리, 모델 내부의 뉴런 활성화 패턴, 어텐션 헤드의 역할,
          잔차 스트림(residual stream)의 정보 흐름을 직접 추적합니다.
        </p>
        <ul className={styles.conceptList}>
          <li><strong>Feature Attribution</strong>: 각 입력 토큰/특성이 출력에 기여하는 정도</li>
          <li><strong>Circuit Analysis</strong>: 특정 태스크를 수행하는 뉴런 회로 식별</li>
          <li><strong>Probing</strong>: 모델 내부 표현이 특정 개념을 인코딩하는지 확인</li>
          <li><strong>Activation Patching</strong>: 특정 뉴런의 활성화를 변경하여 인과 관계 검증</li>
        </ul>

        <div className={styles.uploadArea}>
          <label className={styles.fileLabel}>사전 계산된 Feature Attribution 결과 업로드 (JSON)</label>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className={styles.fileInput}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <p className={styles.desc}>
            JSON 형식: <code>[{`{ "feature": "토큰명", "attribution": 0.85 }`}, ...]</code>
          </p>
          {error && <div className={styles.errorMsg}>{error}</div>}
        </div>
      </div>

      {data ? (
        <div className={styles.chartSection}>
          <h3 className={styles.chartTitle}>Feature Attribution 시각화</h3>
          {data.map((d, i) => {
            const pct = (Math.abs(d.attribution) / maxAbs) * 100;
            const isPos = d.attribution >= 0;
            return (
              <div key={i} className={styles.barRow}>
                <span className={styles.barLabel}>{d.feature}</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${isPos ? styles.barFillPos : styles.barFillNeg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={styles.barValue}>{d.attribution.toFixed(4)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>&#128300;</span>
          <p>Feature Attribution JSON을 업로드하면 여기에 시각화됩니다.</p>
        </div>
      )}
    </MetricPageLayout>
  );
};

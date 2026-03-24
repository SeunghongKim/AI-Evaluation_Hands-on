import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { BarChart } from '../../components/ui/BarChart';
import { parseJSONSafe } from '../../components/ui/DataUpload';
import styles from './Explainability.module.css';

interface SHAPData {
  features: string[];
  shap_values: number[][];
  base_value: number;
}

const EXAMPLE_SHAP: SHAPData = {
  features: ['신용점수', '소득수준', '부채비율', '직업안정성', '대출기간', '담보가치', '거래기간', '연체이력'],
  shap_values: [
    [0.35, 0.28, -0.22, 0.18, 0.09, 0.14, 0.05, -0.31],
    [0.41, 0.19, -0.15, 0.22, 0.11, 0.08, 0.07, -0.18],
    [0.29, 0.35, -0.28, 0.15, 0.13, 0.19, 0.03, -0.25],
  ],
  base_value: 0.42,
};

export const Explainability: React.FC = () => {
  const [shapData, setShapData] = useState<SHAPData | null>(null);
  const [fileText, setFileText] = useState('');
  const [error, setError] = useState('');

  const handleParse = (text: string) => {
    setFileText(text);
    if (!text.trim()) { setShapData(null); setError(''); return; }
    const parsed = parseJSONSafe<SHAPData>(text);
    if (!parsed || !parsed.features || !parsed.shap_values) {
      setError('유효하지 않은 형식입니다. {features: string[], shap_values: number[][], base_value: number} 형식을 사용하세요.');
      setShapData(null);
    } else {
      setShapData(parsed);
      setError('');
    }
  };

  const displayData = shapData ?? EXAMPLE_SHAP;
  const meanAbsSHAP = displayData.features.map((feat, i) => {
    const vals = displayData.shap_values.map(row => Math.abs(row[i] ?? 0));
    const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
    return { label: feat, value: mean };
  }).sort((a, b) => b.value - a.value);

  return (
    <MetricPageLayout
      title="설명가능성 (SHAP/LIME)"
      sectionId="ML-M-03"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '설명가능성' },
      ]}
      what="SHAP(SHapley Additive exPlanations) 또는 LIME(Local Interpretable Model-agnostic Explanations)을 활용하여 각 특성(feature)이 모델 예측에 기여하는 정도를 정량화합니다."
      why="모델이 왜 특정 예측을 내렸는지 설명할 수 없다면 금융기관에서 활용하기 어렵습니다. 특히 대출 거절 사유 설명 등 규제 준수에 필요합니다."
      how="각 샘플에 대한 SHAP 값을 사전 계산하여 JSON 파일로 업로드합니다. 평균 절대 SHAP 값을 기준으로 특성 중요도를 순위별로 시각화합니다."
      passRule="협의 필요 — 조직 내 기준 설정"
      passRuleSource="upload_required"
      documentRef="AI 평가검증 가이드 v1.0 ML-M-03 설명가능성 항목"
    >
      <div className={styles.uploadSection}>
        <div className={styles.uploadHeader}>
          <span className={styles.uploadTitle}>SHAP 값 JSON 업로드</span>
          <div className={styles.uploadActions}>
            <button
              className={styles.exBtn}
              onClick={() => { setShapData(EXAMPLE_SHAP); setError(''); }}
              type="button"
            >
              예시 데이터 보기
            </button>
          </div>
        </div>
        <div className={styles.formatHint}>
          <strong>입력 형식:</strong>
          <pre className={styles.formatPre}>{`{
  "features": ["특성1", "특성2", ...],
  "shap_values": [[샘플1 SHAP값...], [샘플2 SHAP값...], ...],
  "base_value": 0.42
}`}</pre>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="JSON을 붙여넣거나 예시 데이터 버튼을 클릭하세요"
          value={fileText}
          onChange={e => handleParse(e.target.value)}
          rows={5}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Visualization */}
      <div className={styles.vizSection}>
        <h3 className={styles.vizTitle}>
          평균 절대 SHAP 값 (특성 중요도 순위)
          {shapData === null && <span className={styles.exampleNote}> — 예시 데이터</span>}
        </h3>
        <BarChart
          data={meanAbsSHAP}
          title="Mean |SHAP|"
        />

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>총 특성 수</span>
            <span className={styles.statValue}>{displayData.features.length}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>총 샘플 수</span>
            <span className={styles.statValue}>{displayData.shap_values.length}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>기준값 (Base Value)</span>
            <span className={styles.statValue}>{displayData.base_value.toFixed(4)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>가장 중요한 특성</span>
            <span className={styles.statValue}>{meanAbsSHAP[0]?.label ?? '—'}</span>
          </div>
        </div>

        <div className={styles.passNote}>
          이 지표는 별도의 수치 기준이 없습니다. 시각화 결과를 검토자가 직접 해석하여 평가합니다.
          상위 특성의 SHAP 값이 합리적이고 보호변수(성별, 연령)의 기여도가 과도하지 않은지 확인하세요.
        </div>
      </div>
    </MetricPageLayout>
  );
};

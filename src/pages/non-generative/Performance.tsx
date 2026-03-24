import React, { useState } from 'react';
import { MetricPageLayout } from '../../components/ui/MetricPageLayout';
import { ResultPanel } from '../../components/ui/ResultPanel';
import { PassFailChip } from '../../components/ui/PassFailChip';
import { calcMetrics, cmFromArrays, ConfusionMatrix } from '../../lib/metrics/confusion';
import { performanceExample } from '../../data/examples/performance';
import styles from './Performance.module.css';

type InputMode = 'matrix' | 'arrays';

const EMPTY_CM: ConfusionMatrix = { tp: 0, fp: 0, fn: 0, tn: 0 };

export const Performance: React.FC = () => {
  const [mode, setMode] = useState<InputMode>('matrix');
  const [cm, setCm] = useState<ConfusionMatrix>({ tp: 85, fp: 8, fn: 7, tn: 100 });
  const [arrayText, setArrayText] = useState('');
  const [parseError, setParseError] = useState('');

  const metrics = calcMetrics(cm);

  const loadExample = () => {
    const { yTrue, yPred } = performanceExample;
    const builtCm = cmFromArrays(yTrue, yPred);
    setCm(builtCm);
    setMode('matrix');
  };

  const parseArrays = (text: string) => {
    try {
      const lines = text.trim().split('\n');
      if (lines.length < 2) throw new Error('y_true와 y_pred를 각각 한 줄씩 입력하세요.');
      const parseNums = (s: string) => s.split(/[,\s]+/).filter(Boolean).map(n => {
        const v = parseInt(n.trim());
        if (isNaN(v)) throw new Error(`유효하지 않은 값: ${n}`);
        return v;
      });
      const yTrue = parseNums(lines[0]);
      const yPred = parseNums(lines[1]);
      if (yTrue.length !== yPred.length) throw new Error('y_true와 y_pred의 길이가 다릅니다.');
      const builtCm = cmFromArrays(yTrue, yPred);
      setCm(builtCm);
      setParseError('');
    } catch (e) {
      setParseError((e as Error).message);
    }
  };

  const updateCm = (field: keyof ConfusionMatrix, val: string) => {
    setCm(prev => ({ ...prev, [field]: parseInt(val) || 0 }));
  };

  const allPass = Object.values(metrics.pass).every(Boolean);

  return (
    <MetricPageLayout
      title="서비스 품질 (분류 모델)"
      sectionId="ML-M-01"
      breadcrumbs={[
        { label: '홈', to: '/' },
        { label: '비생성형 AI', to: '/non-generative' },
        { label: '서비스 품질' },
      ]}
      what="AI 모델이 주어진 예측 또는 분류 과제를 정확하게 수행하는 능력을 Accuracy, Precision, Recall, F1-Score로 측정합니다."
      why="모델의 기본 성능이 충분하지 않다면 실무 투입이 불가합니다. 4가지 지표를 종합적으로 평가하여 편향된 성능 측정을 방지합니다."
      how="2차 시험 데이터의 실제값(y_true)과 모델 예측값(y_pred)으로 혼동행렬(TP/FP/FN/TN)을 구성하고 각 지표를 계산합니다."
      passRule="Accuracy, Precision, Recall, F1 모두 ≥ 0.8"
      passRuleSource="manual_table"
      formula="Accuracy  = (TP + TN) / (TP + FP + FN + TN)
Precision = TP / (TP + FP)
Recall    = TP / (TP + FN)
F1-Score  = 2 × Precision × Recall / (Precision + Recall)"
      formulaExplanation="TP: 진양성, FP: 위양성, FN: 위음성, TN: 진음성"
      documentRef="AI 평가검증 가이드 v1.0 표 2.2.9, 표 2.2.11"
    >
      {/* Mode selector */}
      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeBtn} ${mode === 'matrix' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('matrix')}
          type="button"
        >
          혼동행렬 직접 입력
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'arrays' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('arrays')}
          type="button"
        >
          y_true / y_pred 배열 입력
        </button>
        <button className={styles.exBtn} onClick={loadExample} type="button">
          예시 데이터
        </button>
      </div>

      {mode === 'matrix' && (
        <div className={styles.matrixInput}>
          <h4 className={styles.inputTitle}>혼동행렬 입력</h4>
          <div className={styles.cmGrid}>
            <div className={styles.cmHeader}></div>
            <div className={styles.cmHeader}>예측: 양성 (1)</div>
            <div className={styles.cmHeader}>예측: 음성 (0)</div>
            <div className={styles.cmHeader}>실제: 양성 (1)</div>
            <div className={styles.cmCell}>
              <label className={styles.cmLabel}>TP (진양성)</label>
              <input
                className={styles.cmInput}
                type="number" min="0"
                value={cm.tp}
                onChange={e => updateCm('tp', e.target.value)}
              />
            </div>
            <div className={styles.cmCell}>
              <label className={styles.cmLabel}>FN (위음성)</label>
              <input
                className={styles.cmInput}
                type="number" min="0"
                value={cm.fn}
                onChange={e => updateCm('fn', e.target.value)}
              />
            </div>
            <div className={styles.cmHeader}>실제: 음성 (0)</div>
            <div className={styles.cmCell}>
              <label className={styles.cmLabel}>FP (위양성)</label>
              <input
                className={styles.cmInput}
                type="number" min="0"
                value={cm.fp}
                onChange={e => updateCm('fp', e.target.value)}
              />
            </div>
            <div className={styles.cmCell}>
              <label className={styles.cmLabel}>TN (진음성)</label>
              <input
                className={styles.cmInput}
                type="number" min="0"
                value={cm.tn}
                onChange={e => updateCm('tn', e.target.value)}
              />
            </div>
          </div>
          <div className={styles.cmTotal}>
            총 데이터 수: <strong>{cm.tp + cm.fp + cm.fn + cm.tn}</strong>개
          </div>
        </div>
      )}

      {mode === 'arrays' && (
        <div className={styles.arrayInput}>
          <h4 className={styles.inputTitle}>배열 형식 입력</h4>
          <p className={styles.arrayHint}>첫째 줄: y_true (쉼표 또는 공백으로 구분), 둘째 줄: y_pred</p>
          <textarea
            className={styles.arrayTextarea}
            placeholder={'1,1,0,1,0,1,0,0,1,0\n1,0,0,1,1,1,0,0,0,0'}
            value={arrayText}
            onChange={e => {
              setArrayText(e.target.value);
              if (e.target.value) parseArrays(e.target.value);
            }}
            rows={4}
          />
          {parseError && <p className={styles.parseError}>{parseError}</p>}
          {!parseError && arrayText && (
            <p className={styles.parseOk}>혼동행렬 계산 완료: TP={cm.tp}, FP={cm.fp}, FN={cm.fn}, TN={cm.tn}</p>
          )}
        </div>
      )}

      {/* Results */}
      <div className={styles.resultsSection}>
        <div className={styles.overallResult}>
          <span className={styles.overallLabel}>전체 판정</span>
          <PassFailChip pass={allPass} />
          <span className={styles.overallNote}>
            {allPass ? '모든 지표가 기준(≥ 0.8)을 통과했습니다.' : '하나 이상의 지표가 기준(0.8)에 미달합니다.'}
          </span>
        </div>

        <div className={styles.metricsGrid}>
          <ResultPanel
            label="정확도 (Accuracy)"
            value={metrics.accuracy}
            threshold="≥ 0.8"
            pass={metrics.pass.accuracy}
            interpretation={`(TP+TN) / Total = (${cm.tp}+${cm.tn}) / ${cm.tp+cm.fp+cm.fn+cm.tn}`}
          />
          <ResultPanel
            label="정밀도 (Precision)"
            value={metrics.precision}
            threshold="≥ 0.8"
            pass={metrics.pass.precision}
            interpretation={`TP / (TP+FP) = ${cm.tp} / (${cm.tp}+${cm.fp})`}
          />
          <ResultPanel
            label="재현율 (Recall)"
            value={metrics.recall}
            threshold="≥ 0.8"
            pass={metrics.pass.recall}
            interpretation={`TP / (TP+FN) = ${cm.tp} / (${cm.tp}+${cm.fn})`}
          />
          <ResultPanel
            label="F1-Score"
            value={metrics.f1}
            threshold="≥ 0.8"
            pass={metrics.pass.f1}
            interpretation="2 × Precision × Recall / (Precision + Recall)"
          />
        </div>
      </div>
    </MetricPageLayout>
  );
};
